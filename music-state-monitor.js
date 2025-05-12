
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music state monitor initializing...');
    
    
    setTimeout(setupMusicStateMonitor, 1000);
    
    function setupMusicStateMonitor() {
        let audioElement = document.getElementById('background-music');
        if (!audioElement) {
            console.warn('Music state monitor: Audio element not found');
            return;
        }
        
        
        const bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    
                    const newAudioElements = Array.from(mutation.addedNodes)
                        .filter(node => node.nodeName === 'AUDIO');
                    
                    if (newAudioElements.length > 0) {
                        console.log('Music state monitor: New audio element detected');
                        
                        
                        setTimeout(function() {
                            const updatedAudioElement = document.getElementById('background-music');
                            if (updatedAudioElement && updatedAudioElement !== audioElement) {
                                console.log('Music state monitor: Updating audio element reference');
                                audioElement = updatedAudioElement;
                                
                                
                                document.dispatchEvent(new Event('musicPlayerCreated'));
                            }
                        }, 500);
                    }
                }
            });
        });
        
        
        bodyObserver.observe(document.body, { childList: true, subtree: true });
        
        
        const playButton = document.getElementById('play-music-button');
        if (playButton) {
            playButton.addEventListener('click', function() {
                
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
