// Direct Audio Player - Ensures audio plays in any browser
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Wait a short while to let other scripts initialize
        enableDirectAudio();
    }, 1000);
});

function enableDirectAudio() {
    console.log('Direct Audio Player: Initializing');
    
    // Check if our audio element exists
    const existingAudio = document.getElementById('background-music');
    if (!existingAudio) {
        console.log('Direct Audio Player: No audio element found');
        return;
    }
    
    // Add a new click event on the entire document to handle autoplay restrictions
    const setupAudio = function() {
        console.log('Direct Audio Player: Setup triggered');
        
        // Try to play using direct browser methods
        try {
            if (existingAudio.paused) {
                console.log('Direct Audio Player: Attempting to play audio');
                
                // Force load the audio
                existingAudio.load();
                
                // Create a promise to play
                const playPromise = existingAudio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Direct Audio Player: Audio playback started successfully');
                            
                            // Update UI if needed
                            const playPauseBtn = document.querySelector('#play-pause-button');
                            if (playPauseBtn) {
                                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            }
                            
                            const nowPlaying = document.querySelector('.now-playing');
                            if (nowPlaying) {
                                nowPlaying.style.display = 'block';
                            }
                        })
                        .catch(error => {
                            console.error('Direct Audio Player: Playback failed:', error);
                            
                            // Try an alternative approach - create a completely new audio element
                            fallbackAudioPlay();
                        });
                } else {
                    console.log('Direct Audio Player: Play promise is undefined, using fallback');
                    fallbackAudioPlay();
                }
            }
        } catch (error) {
            console.error('Direct Audio Player: Error playing audio:', error);
            fallbackAudioPlay();
        }
        
        // We only need this to happen once
        document.removeEventListener('click', setupAudio);
        document.removeEventListener('touchstart', setupAudio);
    };
    
    // Add event listeners for user interaction
    document.addEventListener('click', setupAudio);
    document.addEventListener('touchstart', setupAudio);
    
    // Create a fallback audio player as a last resort
    function fallbackAudioPlay() {
        console.log('Direct Audio Player: Using fallback approach');
        
        try {            // Create a completely new audio element
            const newAudio = new Audio();
            newAudio.src = 'audio/moms-song.mp3';
            newAudio.volume = 0.7;
            newAudio.loop = true;
            newAudio.preload = 'auto';
            
            // Add it to the DOM but hide it
            newAudio.style.display = 'none';
            document.body.appendChild(newAudio);
            
            // Try to play it
            newAudio.play()
                .then(() => {
                    console.log('Direct Audio Player: Fallback audio playing successfully');
                })
                .catch(err => {
                    console.error('Direct Audio Player: Even fallback failed:', err);
                });
        } catch (error) {
            console.error('Direct Audio Player: Fallback creation failed:', error);
        }
    }
}
