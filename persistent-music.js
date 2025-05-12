function saveMusicState(isPlaying, currentTime, volume) {
    try {
        localStorage.setItem('musicIsPlaying', isPlaying);
        localStorage.setItem('musicCurrentTime', currentTime);
        localStorage.setItem('musicVolume', volume);
        localStorage.setItem('musicStateTimestamp', Date.now());
    } catch (error) {
        console.warn('Could not save music state to localStorage:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Save state before page unload - CRITICAL for page transitions
    window.addEventListener('beforeunload', function() {
        const audioElement = document.getElementById('background-music');
        if (audioElement) {
            console.log('Saving music state before navigation - Time:', audioElement.currentTime);
            // Ensure we capture the exact time and state
            const isPlaying = !audioElement.paused;
            const currentTime = audioElement.currentTime;
            const volume = audioElement.volume;
            
            // Check if this is a real time value
            if (isNaN(currentTime) || currentTime < 0) {
                console.warn('Invalid currentTime detected:', currentTime);
                // Try to get a better value
                setTimeout(() => {
                    if (!isNaN(audioElement.currentTime) && audioElement.currentTime >= 0) {
                        saveMusicState(isPlaying, audioElement.currentTime, volume);
                    }
                }, 10);
            } else {
                saveMusicState(isPlaying, currentTime, volume);
            }
        }
    });
      // Save state MORE frequently (every 300ms) for better position tracking
    setInterval(function() {
        const audioElement = document.getElementById('background-music');
        if (audioElement) {
            // Always save current time whether playing or not
            if (!isNaN(audioElement.currentTime) && audioElement.currentTime > 0) {
                localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                localStorage.setItem('musicIsPlaying', !audioElement.paused);
                localStorage.setItem('musicStateTimestamp', Date.now());
            }
        }
    }, 300);
    
    // Restore when player is ready
    document.addEventListener('musicPlayerCreated', function() {
        setTimeout(restoreMusicState, 100); // Short delay to ensure everything is ready
    });
});

function restoreMusicState() {
    const audioElement = document.getElementById('background-music');
    const playButton = document.getElementById('play-music-button');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (!audioElement || !playButton) {
        console.warn('Cannot restore music state - elements not found');
        return;
    }
    
    const wasPlaying = localStorage.getItem('musicIsPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
    const savedVolume = parseFloat(localStorage.getItem('musicVolume') || '0.7');
    const timestamp = parseInt(localStorage.getItem('musicStateTimestamp') || '0');
    
    // Only restore state if it's less than 5 minutes old (300000ms)
    const stateIsRecent = (Date.now() - timestamp) < 300000;
    
    console.log('Restoring music state:', { 
        wasPlaying, 
        savedTime, 
        savedVolume,
        stateIsRecent 
    });
    
    // Always restore volume regardless of playback state
    if (!isNaN(savedVolume) && volumeSlider) {
        audioElement.volume = savedVolume;
        volumeSlider.value = savedVolume;
    }
    
    // Always set the current time, even if not playing
    if (!isNaN(savedTime)) {
        // Use a try-catch as setting currentTime can sometimes fail
        try {
            audioElement.currentTime = savedTime;
            console.log('Set audio position to:', savedTime);
        } catch (e) {
            console.error('Failed to set audio position:', e);
            
            // Try again after a delay (media might not be loaded yet)
            setTimeout(() => {
                try {
                    audioElement.currentTime = savedTime;
                    console.log('Set audio position on second attempt:', savedTime);
                } catch (err) {
                    console.error('Failed to set audio position on second attempt:', err);
                }
            }, 1000);
        }
    }
      
    // Only auto-play if it was playing before
    if (wasPlaying && stateIsRecent) {
        // Add a slight delay before playing to ensure time was set correctly
        setTimeout(() => {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Music restored from previous state at position:', audioElement.currentTime);
                    
                    // Update play button appearance
                    playButton.textContent = 'Pause Music';
                    playButton.classList.add('active');
                    
                    // Show music activity indicator if it exists
                    const musicActivity = document.querySelector('.music-activity');
                    if (musicActivity) musicActivity.classList.add('visible');
                    
                }).catch(error => {
                    console.error('Music restoration failed:', error);
                    // Don't try to auto-play again, user will need to click the button
                });
            }
        }, 200);
    }
}
}
