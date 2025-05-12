// ensure-music-continuity.js - Ensures music continues seamlessly between pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music continuity manager initializing...');
    
    // Wait a moment for other music scripts to initialize
    setTimeout(setupMusicContinuity, 500);
    
    function setupMusicContinuity() {
        const audioElement = document.getElementById('background-music');
        if (!audioElement) {
            console.warn('Music continuity: Audio element not found');
            return;
        }
        
        // Add loaded metadata event to ensure we can set the time as soon as possible
        audioElement.addEventListener('loadedmetadata', function() {
            console.log('Audio metadata loaded, ready for time setting');
            restoreAudioPosition();
        });
        
        // Try to restore position immediately
        restoreAudioPosition();
        
        // And also after a delay (belt and suspenders approach)
        setTimeout(restoreAudioPosition, 1000);
        setTimeout(restoreAudioPosition, 2000);
          function restoreAudioPosition() {
            const savedTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
            if (!isNaN(savedTime) && savedTime > 0) {
                try {
                    if (Math.abs(audioElement.currentTime - savedTime) > 0.5) {
                        // Only set time if it's significantly different from current position
                        console.log(`Setting audio time to ${savedTime} (was ${audioElement.currentTime})`);
                        audioElement.currentTime = savedTime;
                        
                        // Verify that it worked and retry if needed
                        setTimeout(() => {
                            if (Math.abs(audioElement.currentTime - savedTime) > 1) {
                                console.log('First attempt to set position failed, trying again');
                                audioElement.currentTime = savedTime;
                            }
                        }, 100);
                    }
                } catch (e) {
                    console.warn('Could not set audio position:', e);
                    
                    // Try again after a delay
                    setTimeout(() => {
                        try {
                            audioElement.currentTime = savedTime;
                        } catch (err) {
                            console.error('Failed to set position even after delay:', err);
                        }
                    }, 500);
                }
            }
        }
        
        // Add navigation event listeners with a more aggressive approach to saving state
        document.querySelectorAll('a').forEach(function(link) {
            // Only handle internal navigation
            if (link.href && link.href.indexOf(window.location.origin) === 0) {
                link.addEventListener('click', function(e) {
                    // Don't interfere with normal navigation
                    if (audioElement) {
                        console.log('Saving music state before link navigation');
                        localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                        localStorage.setItem('musicIsPlaying', !audioElement.paused);
                        localStorage.setItem('musicVolume', audioElement.volume);
                        localStorage.setItem('musicStateTimestamp', Date.now());
                    }
                });
            }
        });
        
        console.log('Music continuity manager initialized');
    }
});
