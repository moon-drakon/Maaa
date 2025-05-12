// last-resort-audio.js - The simplest possible audio implementation for fallback
document.addEventListener('DOMContentLoaded', function() {
    console.log('Last resort audio player initializing...');
    
    // Wait a short while for other scripts to initialize
    setTimeout(initializeLastResortAudio, 1500);
    
    function initializeLastResortAudio() {
        // Get the play button and the existing audio element
        const playButton = document.getElementById('play-music-button');
        const existingAudio = document.getElementById('background-music');
        
        if (!playButton) {
            console.error('Last resort audio: Play button not found');
            return;
        }
          // Store a reference to our emergency audio element
        let emergencyAudio = null;
        
        // Add a click handler directly to the play button that uses the most basic audio API
        playButton.addEventListener('click', function() {
            console.log('Last resort audio: Play button clicked');
            
            try {
                // If the existing audio element is working, let it handle playback
                if (existingAudio && !existingAudio.error) {
                    // Other handlers should take care of this
                    return;
                }
                
                // Check if we already have an emergency audio element
                if (emergencyAudio) {
                    // If it's playing, pause it
                    if (!emergencyAudio.paused) {
                        console.log('Last resort audio: Pausing existing emergency audio');
                        emergencyAudio.pause();
                        playButton.textContent = 'Play Music';
                        playButton.classList.remove('active');
                        return;
                    }
                    
                    // If it's paused, try to resume from where it left off
                    console.log('Last resort audio: Resuming existing emergency audio');
                    const savedTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
                    if (!isNaN(savedTime)) {
                        try {
                            emergencyAudio.currentTime = savedTime;
                        } catch (e) {
                            console.warn('Could not set emergency audio position:', e);
                        }
                    }
                    
                    emergencyAudio.play()
                        .then(() => {
                            console.log('Last resort audio: Resume successful!');
                            playButton.textContent = 'Pause Music';
                            playButton.classList.add('active');
                        })
                        .catch(error => {
                            console.error('Last resort audio: Resume failed:', error);
                        });
                    return;
                }
                
                // Create a completely new audio element for maximum compatibility
                console.log('Last resort audio: Creating new audio element');
                emergencyAudio = new Audio('audio/moms-song.mp3');
                emergencyAudio.id = 'emergency-audio';
                emergencyAudio.loop = true;
                emergencyAudio.volume = 0.7;
                
                // Set position from saved state if available
                const savedTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
                if (!isNaN(savedTime)) {
                    emergencyAudio.addEventListener('canplay', function() {
                        try {
                            emergencyAudio.currentTime = savedTime;
                            console.log('Last resort audio: Set position to', savedTime);
                        } catch (e) {
                            console.warn('Could not set emergency audio position:', e);
                        }
                    }, {once: true});
                }
                
                // Try to play it
                const playPromise = emergencyAudio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Last resort audio: Playback started!');
                            playButton.textContent = 'Pause Music';
                            playButton.classList.add('active');
                        })
                        .catch(error => {
                            console.error('Last resort audio: Playback failed:', error);
                        });
                }
            } catch (error) {
                console.error('Last resort audio: Error:', error);
            }
        });
        
        console.log('Last resort audio player ready');
    }
});
