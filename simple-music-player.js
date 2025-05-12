// simple-music-player.js - A simplified and robust music player implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music player initializing...');
    
    // Core elements
    const audioElement = document.getElementById('background-music');
    const playButton = document.getElementById('play-music-button');
    const volumeControl = document.getElementById('volume-slider');
    const musicControls = document.getElementById('music-controls');
    
    // Create a global object to track music state even if audio element is replaced
    window.musicPlayerState = {
        isPlaying: false,
        currentTime: 0,
        volume: 0.7,
        muted: false,
        updateFromAudio: function(audio) {
            if (!audio) return;
            this.isPlaying = !audio.paused;
            this.currentTime = audio.currentTime;
            this.volume = audio.volume;
            this.muted = audio.muted;
        }
    };
      // Make sure all required elements exist
    let audioElementRef = audioElement;
    if (!audioElementRef) {
        console.error('Audio element not found!');
        // Create a new audio element if one doesn't exist
        const newAudio = document.createElement('audio');
        newAudio.id = 'background-music';
        newAudio.loop = true;
        newAudio.preload = 'auto';
        
        // Add a source element
        const source = document.createElement('source');
        source.src = 'audio/moms-song.mp3';
        source.type = 'audio/mpeg';
        
        newAudio.appendChild(source);
        document.body.appendChild(newAudio);
        
        console.log('Created new audio element');
        // Use the new audio element
        audioElementRef = newAudio;
    }
    
    if (!playButton || !volumeControl || !musicControls) {
        console.error('Music controls not found!');
        return;
    }
    
    console.log('Music elements found, initializing player...');
      // Directly set the audio source to ensure it's correct
    const audioSource = 'audio/moms-song.mp3';
    
    // Check if src is directly accessible or needs to be set via source element
    if (audioElementRef.querySelector('source')) {
        audioElementRef.querySelector('source').src = audioSource;
    } else {
        audioElementRef.src = audioSource;
    }
    
    audioElementRef.load(); // Force reload the audio
    
    // Debug check if file exists
    fetch(audioSource)
        .then(response => {
            if (response.ok) {
                console.log('Audio file exists and is accessible');
            } else {
                console.error('Audio file not found or inaccessible!', response.status);
            }
        })
        .catch(error => {
            console.error('Error checking audio file:', error);
        });
    
    // Basic controls visibility functions
    function showMusicControls() {
        musicControls.style.opacity = '1';
        musicControls.style.visibility = 'visible';
    }
      function hideMusicControls() {
        if (!audioElementRef.paused) {
            musicControls.style.opacity = '0.2';
        }
    }
    
    // Show controls on hover
    musicControls.addEventListener('mouseenter', function() {
        showMusicControls();
    });
    
    // Hide controls when mouse leaves if music is playing
    musicControls.addEventListener('mouseleave', function() {
        if (!audioElementRef.paused) {
            hideMusicControls();
        }
    });
    
    // Update button appearance based on audio state
    function updatePlayButtonState() {
        if (audioElementRef.paused) {
            playButton.textContent = 'Play Music';
            playButton.classList.remove('active');
        } else {
            playButton.textContent = 'Pause Music';
            playButton.classList.add('active');
        }
    }    // Play/Pause functionality
    playButton.addEventListener('click', function() {
        console.log('Play button clicked, current paused state:', audioElementRef.paused);
        
        if (audioElementRef.paused) {
            // Play music
            const playPromise = audioElementRef.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Audio playback started successfully');
                        updatePlayButtonState();
                        hideMusicControls();
                        
                        // Show notification
                        showNotification('♫ Music playing');
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                        showNotification('⚠️ Could not play audio. Click again.', 'error');
                        
                        // Try alternative approach using direct-audio-player
                        if (typeof enableDirectAudio === 'function') {
                            console.log('Trying direct audio player as fallback');
                            setTimeout(enableDirectAudio, 100);
                        }
                    });
            }
        } else {            // Pause music with enhanced reliability
            console.log('Attempting to pause audio');            try {
                // Store state before pause attempt
                const currentTime = audioElementRef.currentTime;
                
                // Update our global state first
                window.musicPlayerState.updateFromAudio(audioElementRef);
                window.musicPlayerState.isPlaying = false;
                
                // Try multiple pause methods in sequence
                audioElementRef.pause();
                console.log('Audio paused successfully');
                
                // If somehow pause didn't work (rare browser quirk), try to force it
                if (!audioElementRef.paused) {
                    console.warn('Pause didn\'t work, trying alternative methods');
                    
                    // Try a few more times with delay
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => audioElementRef.pause(), i * 50);
                    }
                    
                    // Method 1: Reset src attribute temporarily
                    if (!audioElementRef.paused) {
                        const originalSrc = audioElementRef.src;
                        audioElementRef.src = '';
                        setTimeout(() => {
                            audioElementRef.src = originalSrc;
                            audioElementRef.currentTime = currentTime;
                        }, 10);
                    }
                }
                
                // Always save state to localStorage regardless of pause success
                localStorage.setItem('musicIsPlaying', 'false');
                localStorage.setItem('musicCurrentTime', currentTime);
            } catch (error) {
                console.error('Error pausing audio:', error);
                
                // Try to use our global robust pause if available
                if (window.robustAudioPause) {
                    window.robustAudioPause();
                } else if (window.emergencyPause) {
                    window.emergencyPause();
                }
            }
            
            updatePlayButtonState();
            showMusicControls();
            showNotification('Music paused');
        }
    });
      // Volume control
    volumeControl.addEventListener('input', function() {
        const volume = parseFloat(this.value);
        audioElementRef.volume = volume;
        localStorage.setItem('music-volume', volume);
        
        // Optional: Show volume level
        const volumePercent = Math.round(volume * 100);
        showNotification(`Volume: ${volumePercent}%`);
    });
    
    // Load volume from localStorage if available
    const savedVolume = localStorage.getItem('music-volume');
    if (savedVolume !== null) {
        const volume = parseFloat(savedVolume);
        audioElementRef.volume = volume;
        volumeControl.value = volume;
    } else {
        // Default volume if not set
        audioElementRef.volume = 0.7;
        volumeControl.value = 0.7;
    }
      // Save current time on timeupdate events
    audioElementRef.addEventListener('timeupdate', function() {
        // We don't need to save on every timeupdate (too frequent)
        // Instead, save periodically using a throttle pattern
        if (!audioElementRef._lastSaveTime || Date.now() - audioElementRef._lastSaveTime > 1000) {
            localStorage.setItem('musicCurrentTime', audioElementRef.currentTime);
            audioElementRef._lastSaveTime = Date.now();
        }
    });
    
    // Handle audio errors
    audioElementRef.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        showNotification('⚠️ Audio error occurred', 'error');
    });
    
    // Simple notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `music-notification ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '60px';
        notification.style.left = '10px';
        notification.style.background = 'rgba(255, 255, 255, 0.9)';
        notification.style.padding = '8px 15px';
        notification.style.borderRadius = '20px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'opacity 0.3s ease';
        
        if (type === 'error') {
            notification.style.borderLeft = '3px solid #ff5252';
        } else {
            notification.style.borderLeft = '3px solid #4CAF50';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }    // Initial setup
    updatePlayButtonState();
    showMusicControls();
    
    // Dispatch event to notify that music player is ready
    document.dispatchEvent(new Event('musicPlayerCreated'));
    
    // Add extra click handler to document to help with autoplay restrictions
    document.addEventListener('click', function documentClickHandler() {
        if (audioElementRef.paused) {
            // Try to play on user interaction
            audioElementRef.play()
                .then(() => {
                    console.log('Audio started playing from document click');
                    updatePlayButtonState();
                    // Remove this handler after successful play
                    document.removeEventListener('click', documentClickHandler);
                })
                .catch(e => {
                    console.log('Still could not play audio, user may need to click play button directly');
                });
        }
    }, { once: true }); // Only trigger once
    
    console.log('Music player initialized successfully');
});
