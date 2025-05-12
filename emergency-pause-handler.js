// emergency-pause-handler.js - Last resort for pause functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Emergency pause handler initializing...');
    
    // Wait for other scripts to initialize
    setTimeout(setupEmergencyPauseHandler, 2000);
    
    function setupEmergencyPauseHandler() {
        const playButton = document.getElementById('play-music-button');
        if (!playButton) {
            console.warn('Emergency pause: Play button not found');
            return;
        }
        
        // Use a robust technique to detect if the button is in play or pause state
        function isInPauseState() {
            // Check text content
            if (playButton.textContent.toLowerCase().includes('pause')) {
                return true;
            }
            
            // Check class
            if (playButton.classList.contains('active')) {
                return true;
            }
            
            // Default to false
            return false;
        }
        
        // Add a click handler for emergency pause handling
        playButton.addEventListener('dblclick', function(e) {
            console.log('Emergency pause: Double-clicked detected');
            
            // Only act if button appears to be in pause state (meaning music should be playing)
            if (isInPauseState()) {
                e.preventDefault();
                e.stopPropagation();
                
                // This is a nuclear option - reload the page but with a flag to start paused
                console.log('Emergency pause: Performing emergency pause via page handling');
                
                // Save current state but force paused state
                const audioElement = document.getElementById('background-music');
                if (audioElement) {
                    // Save time position for restoration
                    localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                    localStorage.setItem('musicVolume', audioElement.volume);
                }
                
                // Force the paused state
                localStorage.setItem('musicIsPlaying', 'false');
                localStorage.setItem('emergencyPause', 'true');
                localStorage.setItem('musicStateTimestamp', Date.now());
                
                // Reload the current page
                window.location.reload();
                return false;
            }
        });
        
        // Check if we're loading after an emergency pause
        if (localStorage.getItem('emergencyPause') === 'true') {
            console.log('Emergency pause: Page loaded after emergency pause');
            
            // Clear the emergency flag
            localStorage.removeItem('emergencyPause');
                  // Force the play button to show "Play" state
            playButton.textContent = 'Play Music';
            playButton.classList.remove('active');
        }
        
        // Make emergency pause function available globally
        window.emergencyPause = function() {
            console.log('Emergency pause function called');
            
            // Save current state but force paused state
            const audioElement = document.getElementById('background-music');
            if (audioElement) {
                // Save time position for restoration
                localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                localStorage.setItem('musicVolume', audioElement.volume);
            }
            
            // Force the paused state
            localStorage.setItem('musicIsPlaying', 'false');
            localStorage.setItem('emergencyPause', 'true');
            localStorage.setItem('musicStateTimestamp', Date.now());
            
            // Update play button if it exists
            const playBtn = document.getElementById('play-music-button');
            if (playBtn) {
                playBtn.textContent = 'Play Music';
                playBtn.classList.remove('active');
            }
        };
            
            // Find and force pause all audio elements
            const allAudio = document.querySelectorAll('audio');
            allAudio.forEach(audio => {
                try {
                    audio.pause();
                } catch (e) {
                    console.warn('Could not pause audio element:', e);
                }
            });
            
            // Extra check - create a nuclear fallback that replaces any audio elements
            setTimeout(function() {
                const audioElement = document.getElementById('background-music');
                if (audioElement && !audioElement.paused) {
                    console.log('Emergency pause: Audio still playing, replacing element');
                    
                    // Store current position
                    const currentTime = audioElement.currentTime;
                    const volume = audioElement.volume;
                    
                    // Create replacement element
                    const newAudio = document.createElement('audio');
                    newAudio.id = 'background-music';
                    newAudio.loop = true;
                    newAudio.preload = 'auto';
                    
                    // Add source
                    const source = document.createElement('source');
                    source.src = 'audio/moms-song.mp3';
                    source.type = 'audio/mpeg';
                    newAudio.appendChild(source);
                    
                    // Replace existing element
                    audioElement.parentNode.replaceChild(newAudio, audioElement);
                    
                    // Set properties on new element
                    newAudio.volume = volume;
                    
                    // Wait for loadedmetadata to set currentTime
                    newAudio.addEventListener('loadedmetadata', function() {
                        newAudio.currentTime = currentTime;
                    });
                }
            }, 500);
        }
        
        console.log('Emergency pause handler initialized');
    }
});
