document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('background-music');
    const playButton = document.getElementById('play-music-button');
    const volumeSlider = document.getElementById('volume-slider');
    const musicControls = document.getElementById('music-controls');

    if (!audioPlayer || !playButton || !volumeSlider || !musicControls) {
        console.warn('Music player elements not found. Skipping music player initialization.');
        return;
    }
    
    // Function to show small notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `music-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Position near music controls
        const controlsRect = musicControls.getBoundingClientRect();
        notification.style.bottom = (controlsRect.height + 20) + 'px';
        notification.style.left = '10px';
        
        // Add to DOM and animate in
        setTimeout(() => {
            notification.classList.add('visible');
            
            // Remove after delay
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }, 10);
    }
    
    // Ensure the audio source is from the audio folder
    if (!audioPlayer.src || !audioPlayer.src.includes('/audio/')) {
        const defaultSong = 'audio/moms-song.mp3';
        audioPlayer.src = defaultSong;
        console.info('Set default audio source:', defaultSong);
    }

    // Load saved state from localStorage
    const savedVolume = localStorage.getItem('musicVolume');
    const savedTime = localStorage.getItem('musicTime');
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';

    if (savedVolume !== null) {
        audioPlayer.volume = parseFloat(savedVolume);
        volumeSlider.value = parseFloat(savedVolume);
    }

    if (savedTime !== null) {
        audioPlayer.currentTime = parseFloat(savedTime);
    }    function updatePlayButton() {
        if (audioPlayer.paused) {
            playButton.textContent = 'Play Music';
            playButton.classList.remove('pulsing');
        } else {
            playButton.textContent = 'Pause Music';
            playButton.classList.add('pulsing');
        }
    }function showControls() {
        musicControls.style.opacity = '1';
        musicControls.style.visibility = 'visible';
    }

    function hideControls() {
        musicControls.style.opacity = '0';
        musicControls.style.visibility = 'hidden';
    }
      // Show controls on hover or when moving cursor near the region
    musicControls.addEventListener('mouseenter', () => {
        showControls();
    });
    
    // Create a hover detection area that's larger than the controls
    const createHoverDetection = () => {
        const hoverDetect = document.createElement('div');
        hoverDetect.id = 'music-hover-detect';
        hoverDetect.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 80px;
            z-index: 999;
            pointer-events: none;
        `;
        document.body.appendChild(hoverDetect);
        
        // Track mouse position and show controls when near corner
        document.addEventListener('mousemove', (e) => {
            const cornerThreshold = 80;
            if (e.clientX <= cornerThreshold && e.clientY >= window.innerHeight - cornerThreshold) {
                showControls();
                clearTimeout(window.hideControlsTimeout);
                window.hideControlsTimeout = setTimeout(() => {
                    if (!audioPlayer.paused && !musicControls.matches(':hover')) {
                        hideControls();
                    }
                }, 2000);
            }
        });
    };
    createHoverDetection();
    
    // Auto-hide controls when mouse leaves (only if music is playing)
    musicControls.addEventListener('mouseleave', () => {
        if (!audioPlayer.paused) {
            window.hideControlsTimeout = setTimeout(() => {
                hideControls();
            }, 1500); // Small delay to prevent flickering if user moves in and out
        }
    });    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                localStorage.setItem('musicPlaying', 'true');
                updatePlayButton();
                hideControls(); // Hide controls when music starts playing
                showNotification('Music started ♫', 'success');
            }).catch(error => {
                console.error("Error playing audio:", error);
                showNotification('Could not play music. Please try again.', 'error');
            });
        } else {
            audioPlayer.pause();
            localStorage.setItem('musicPlaying', 'false');
            updatePlayButton();
            showControls(); // Show controls when music is paused by user
            showNotification('Music paused', 'info');
        }
    });    // Debounce timer for volume change notifications
    let volumeNotificationTimeout;
    
    volumeSlider.addEventListener('input', () => {
        const newVolume = parseFloat(volumeSlider.value);
        audioPlayer.volume = newVolume;
        localStorage.setItem('musicVolume', newVolume.toString());
        
        // Clear previous timeout
        clearTimeout(volumeNotificationTimeout);
        
        // Set new timeout for the notification
        volumeNotificationTimeout = setTimeout(() => {
            const volumePercent = Math.round(newVolume * 100);
            const volumeEmoji = volumePercent > 70 ? '🔊' : volumePercent > 30 ? '🔉' : volumePercent > 0 ? '🔈' : '🔇';
            showNotification(`Volume: ${volumePercent}% ${volumeEmoji}`, 'info');
        }, 500); // Show notification after 500ms of no input change
    });

    audioPlayer.addEventListener('timeupdate', () => {
        localStorage.setItem('musicTime', audioPlayer.currentTime.toString());
    });

    audioPlayer.addEventListener('ended', () => {
        // Optional: Loop music or stop and show controls
        audioPlayer.currentTime = 0;
        audioPlayer.play().catch(error => console.error("Error restarting audio:", error));
        // Or:
    updatePlayButton();
    showControls(); // Controls are visible on load
    
    if (isPlaying) {
        // showControls();
    });

    // Initial state
    updatePlayButton();
    showControls(); // Controls are visible on load    if (isPlaying) {
        // Attempt to autoplay if it was playing before
        audioPlayer.play().then(() => {
            updatePlayButton();
            hideControls();
            // No notification here to avoid distracting user on page load
        }).catch(error => {
            // Autoplay was prevented, show controls so user can manually play
            console.warn("Autoplay prevented:", error);
            localStorage.setItem('musicPlaying', 'false');
            updatePlayButton();
            showControls();
            
            // Show a friendly message after a short delay to let the page load first
            setTimeout(() => {
                showNotification('Click the Play button to continue music ♫', 'info');
            }, 2000);
        });
    }

    // Save state before unloading the page
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicTime', audioPlayer.currentTime.toString());
        localStorage.setItem('musicVolume', audioPlayer.volume.toString());
        localStorage.setItem('musicPlaying', (!audioPlayer.paused).toString());
    });
});
