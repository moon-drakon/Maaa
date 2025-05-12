// robust-music-pause-fix.js - Fixes the pause functionality for the music player
document.addEventListener('DOMContentLoaded', function() {
    console.log('Robust music pause fix initializing...');
    
    // Wait a short while for other scripts to initialize
    setTimeout(applyPauseFix, 1000);
    
    function applyPauseFix() {
        // Get the required elements
        const audioElement = document.getElementById('background-music');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !playButton) {
            console.warn('Pause fix: Required elements not found');
            return;
        }
          console.log('Applying robust pause functionality');
        
        // Create a reliable pause function that ensures the pause actually happens        
        function robustPause() {
            console.log('Robust pause called');
            
            try {
                // First try the standard pause
                audioElement.pause();
                
                // Double-check that pause worked
                if (!audioElement.paused) {
                    console.warn('Standard pause failed, trying fallback method');
                    
                    // Make multiple pause attempts with slight delays
                    setTimeout(() => audioElement.pause(), 10);
                    setTimeout(() => audioElement.pause(), 50);
                    setTimeout(() => audioElement.pause(), 100);
                    
                    // Fallback method 1: Force pause by setting currentTime
                    const currentPosition = audioElement.currentTime;
                    audioElement.currentTime = currentPosition;
                    audioElement.pause();
                    
                    // Try a few more times with delay
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => audioElement.pause(), i * 50);
                    }
                    
                    // Fallback method 2: If all else fails, create a clone with paused state
                    if (!audioElement.paused) {
                        console.warn('Fallback pause also failed, trying extreme measures');
                        
                        // Store current state
                        const volume = audioElement.volume;
                        const currentTime = audioElement.currentTime;
                        const muted = audioElement.muted;
                        
                        // Remove and recreate
                        const parent = audioElement.parentNode;
                        const newAudio = document.createElement('audio');
                        newAudio.id = 'background-music';
                        newAudio.loop = audioElement.loop;
                        newAudio.preload = 'auto';
                        newAudio.muted = muted;
                        newAudio.volume = volume;
                        
                        // Add source
                        const source = document.createElement('source');
                        source.src = 'audio/moms-song.mp3';
                        source.type = 'audio/mpeg';
                        newAudio.appendChild(source);
                        
                        // Replace old with new
                        parent.replaceChild(newAudio, audioElement);
                        newAudio.currentTime = currentTime;
                        
                        console.log('Audio element replaced to force pause');
                    }
                }
            } catch (error) {
                console.error('Error during robust pause:', error);
            }
            
            // Update UI regardless of what happened
            if (playButton) {
                playButton.textContent = 'Play Music';
                playButton.classList.remove('active');
            }
            
            // Update music activity indicator if it exists
            const musicActivity = document.querySelector('.music-activity');
            if (musicActivity) {
                musicActivity.classList.remove('visible');
            }
        }        // Make robust pause function available globally - ensure it's accessible to other scripts
        window.robustAudioPause = robustPause;
        
        // Also add it as a property of the audioElement for easy access
        audioElement.robustPause = robustPause;
        
        // Replace the click handler on the play button
        playButton.addEventListener('click', function(e) {
            // Prevent the original event from propagating
            e.stopPropagation();
            
            console.log('Enhanced play button clicked, current paused state:', audioElement.paused);
            
            if (audioElement.paused) {
                // Play logic remains the same, use the existing handler
                // We don't interfere with play functionality
                return;
            } else {
                // This is where we intercept and use our robust pause
                e.preventDefault(); // Stop the default handler
                robustPause();
                
                // Make sure we update the global state
                if (window.musicPlayerState) {
                    window.musicPlayerState.isPlaying = false;
                }
                
                // Save to localStorage for persistence
                localStorage.setItem('musicIsPlaying', 'false');
                localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                
                // Show notification
                if (typeof showNotification === 'function') {
                    showNotification('Music paused');
                }
            }
        }, true); // Use capture phase to intercept before the original handler
        
        // Add a direct method for other scripts to call
        window.robustAudioPause = robustPause;
        
        console.log('Robust music pause fix applied');
    }
});
