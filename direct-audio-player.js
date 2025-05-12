
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        
        enableDirectAudio();
    }, 1000);
});

function enableDirectAudio() {
    console.log('Direct Audio Player: Initializing');
    
    
    const existingAudio = document.getElementById('background-music');
    if (!existingAudio) {
        console.log('Direct Audio Player: No audio element found');
        return;
    }
    
    
    const setupAudio = function() {
        console.log('Direct Audio Player: Setup triggered');
        
        
        try {
            if (existingAudio.paused) {
                console.log('Direct Audio Player: Attempting to play audio');
                
                
                existingAudio.load();
                
                
                const playPromise = existingAudio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Direct Audio Player: Audio playback started successfully');
                            
                            
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
        
        
        document.removeEventListener('click', setupAudio);
        document.removeEventListener('touchstart', setupAudio);
    };
    
    
    document.addEventListener('click', setupAudio);
    document.addEventListener('touchstart', setupAudio);
    
    
    function fallbackAudioPlay() {
        console.log('Direct Audio Player: Using fallback approach');
        
        try {            
            const newAudio = new Audio();
            newAudio.src = 'audio/moms-song.mp3';
            newAudio.volume = 0.7;
            newAudio.loop = true;
            newAudio.preload = 'auto';
            
            
            newAudio.style.display = 'none';
            document.body.appendChild(newAudio);
            
            
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
