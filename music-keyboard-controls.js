// music-keyboard-controls.js - Adds keyboard shortcuts for music playback
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music keyboard controls initializing...');
    
    // Setup keyboard controls
    document.addEventListener('keydown', function(event) {
        // Skip if user is typing in an input field or textarea
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }        // Space bar - Play/Pause music (only when not scrolling)
        if (event.code === 'Space' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
            const playButton = document.getElementById('play-music-button');
            const audioElement = document.getElementById('background-music');
            
            if (playButton && audioElement) {
                // Prevent the default spacebar behavior (page scrolling)
                event.preventDefault();
                event.stopPropagation();
                
                console.log('Spacebar pressed - toggling music playback');

                // Direct audio control approach instead of click simulation
                if (audioElement.paused) {
                    // Play the audio
                    const playPromise = audioElement.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            console.log('Spacebar - Audio played successfully');
                            // Update button state
                            playButton.textContent = 'Pause Music';
                            playButton.classList.add('active');
                            // Save state
                            localStorage.setItem('musicIsPlaying', 'true');
                        }).catch(err => {
                            console.error('Spacebar play error:', err);
                            // Fallback to button click
                            playButton.click();
                        });
                    }
                } else {
                    // Pause the audio
                    audioElement.pause();
                    console.log('Spacebar - Audio paused successfully');
                    // Update button state
                    playButton.textContent = 'Play Music';
                    playButton.classList.remove('active');
                    // Save state
                    localStorage.setItem('musicIsPlaying', 'false');
                    
                    // If the standard pause didn't work, use robust pause
                    if (!audioElement.paused && window.robustAudioPause) {
                        window.robustAudioPause();
                    }
                }
            }
        }
        
        // M key - Mute/Unmute
        if (event.code === 'KeyM' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
            const audioElement = document.getElementById('background-music');
            const volumeSlider = document.getElementById('volume-slider');
            
            if (audioElement && volumeSlider) {
                if (audioElement.volume > 0) {
                    // Store current volume before muting
                    audioElement.dataset.previousVolume = audioElement.volume;
                    audioElement.volume = 0;
                    volumeSlider.value = 0;
                    
                    // Show notification
                    showVolumeNotification('Muted');
                } else {
                    // Restore previous volume or default to 0.7
                    const prevVolume = parseFloat(audioElement.dataset.previousVolume || 0.7);
                    audioElement.volume = prevVolume;
                    volumeSlider.value = prevVolume;
                    
                    // Show notification
                    showVolumeNotification(`Volume: ${Math.round(prevVolume * 100)}%`);
                }
            }
        }
        
        // Up/Down arrows - Volume control
        if ((event.code === 'ArrowUp' || event.code === 'ArrowDown') && 
            event.ctrlKey && !event.altKey && !event.shiftKey) {
            
            const audioElement = document.getElementById('background-music');
            const volumeSlider = document.getElementById('volume-slider');
            
            if (audioElement && volumeSlider) {
                let newVolume = audioElement.volume;
                
                if (event.code === 'ArrowUp') {
                    newVolume = Math.min(1, newVolume + 0.1);
                } else {
                    newVolume = Math.max(0, newVolume - 0.1);
                }
                
                // Round to 1 decimal place for cleaner values
                newVolume = Math.round(newVolume * 10) / 10;
                
                audioElement.volume = newVolume;
                volumeSlider.value = newVolume;
                
                // Show notification
                showVolumeNotification(`Volume: ${Math.round(newVolume * 100)}%`);
                
                event.preventDefault(); // Prevent page scrolling
            }
        }
    });
    
    // Helper function for volume notifications
    function showVolumeNotification(message) {
        // Check if notification function exists from other scripts
        if (typeof showNotification === 'function') {
            showNotification(message);
            return;
        }
        
        // Create a simple notification if the main one doesn't exist
        const notification = document.createElement('div');
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
        notification.style.borderLeft = '3px solid #4CAF50';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
    
    console.log('Music keyboard controls initialized');
});
