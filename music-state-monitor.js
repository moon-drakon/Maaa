// music-state-monitor.js - Monitors the audio element and music controls for changes
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music state monitor initializing...');
    
    // Wait a short while for other scripts to initialize
    setTimeout(setupMusicStateMonitor, 1000);
    
    function setupMusicStateMonitor() {
        let audioElement = document.getElementById('background-music');
        if (!audioElement) {
            console.warn('Music state monitor: Audio element not found');
            return;
        }
        
        // Create a MutationObserver to watch for changes to the audio element
        const bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Check if a new audio element was added
                    const newAudioElements = Array.from(mutation.addedNodes)
                        .filter(node => node.nodeName === 'AUDIO');
                    
                    if (newAudioElements.length > 0) {
                        console.log('Music state monitor: New audio element detected');
                        
                        // Wait a short while then update our reference
                        setTimeout(function() {
                            const updatedAudioElement = document.getElementById('background-music');
                            if (updatedAudioElement && updatedAudioElement !== audioElement) {
                                console.log('Music state monitor: Updating audio element reference');
                                audioElement = updatedAudioElement;
                                
                                // Re-dispatch the musicPlayerCreated event to trigger state restoration
                                document.dispatchEvent(new Event('musicPlayerCreated'));
                            }
                        }, 500);
                    }
                }
            });
        });
        
        // Start observing the body for changes
        bodyObserver.observe(document.body, { childList: true, subtree: true });
        
        // Also monitor the play button's clicks to save state
        const playButton = document.getElementById('play-music-button');
        if (playButton) {
            playButton.addEventListener('click', function() {
                // Save music state after a short delay to ensure paused state is correct
                setTimeout(function() {
                    if (typeof saveMusicState === 'function') {
                        saveMusicState(
                            !audioElement.paused,
                            audioElement.currentTime,
                            audioElement.volume
                        );
                        console.log('Music state saved after button click');
                    }
                }, 100);
            });
        }
        
        console.log('Music state monitor initialized');
    }
});
