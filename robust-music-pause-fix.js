
document.addEventListener('DOMContentLoaded', function() {
    console.log('Robust music pause fix initializing...');
    
    
    setTimeout(applyPauseFix, 1000);
    
    function applyPauseFix() {
        
        const audioElement = document.getElementById('background-music');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !playButton) {
            console.warn('Pause fix: Required elements not found');
            return;
        }
          console.log('Applying robust pause functionality');
        
        
        function robustPause() {
            console.log('Robust pause called');
            
            try {
                
                audioElement.pause();
                
                
                if (!audioElement.paused) {
                    console.warn('Standard pause failed, trying fallback method');
                    
                    
                    setTimeout(() => audioElement.pause(), 10);
                    setTimeout(() => audioElement.pause(), 50);
                    setTimeout(() => audioElement.pause(), 100);
                    
                    
                    const currentPosition = audioElement.currentTime;
                    audioElement.currentTime = currentPosition;
                    audioElement.pause();
                    
                    
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => audioElement.pause(), i * 50);
                    }
                    
                    
                    if (!audioElement.paused) {
                        console.warn('Fallback pause also failed, trying extreme measures');
                        
                        
                        const volume = audioElement.volume;
                        const currentTime = audioElement.currentTime;
                        const muted = audioElement.muted;
                        
                        
                        const parent = audioElement.parentNode;
                        const newAudio = document.createElement('audio');
                        newAudio.id = 'background-music';
                        newAudio.loop = audioElement.loop;
                        newAudio.preload = 'auto';
                        newAudio.muted = muted;
                        newAudio.volume = volume;
                        
                        
                        const source = document.createElement('source');
                        source.src = 'audio/moms-song.mp3';
                        source.type = 'audio/mpeg';
                        newAudio.appendChild(source);
                        
                        
                        parent.replaceChild(newAudio, audioElement);
                        newAudio.currentTime = currentTime;
                        
                        console.log('Audio element replaced to force pause');
                    }
                }
            } catch (error) {
                console.error('Error during robust pause:', error);
            }
            
            
            if (playButton) {
                playButton.textContent = 'Play Music';
                playButton.classList.remove('active');
            }
            
            
            const musicActivity = document.querySelector('.music-activity');
            if (musicActivity) {
                musicActivity.classList.remove('visible');
            }
        }        
        window.robustAudioPause = robustPause;
        
        
        audioElement.robustPause = robustPause;
        
        
        playButton.addEventListener('click', function(e) {
            
            e.stopPropagation();
            
            console.log('Enhanced play button clicked, current paused state:', audioElement.paused);
            
            if (audioElement.paused) {
                
                
                return;
            } else {
                
                e.preventDefault(); 
                robustPause();
                
                
                if (window.musicPlayerState) {
                    window.musicPlayerState.isPlaying = false;
                }
                
                
                localStorage.setItem('musicIsPlaying', 'false');
                localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                
                
                if (typeof showNotification === 'function') {
                    showNotification('Music paused');
                }
            }
        }, true); 
        
        
        window.robustAudioPause = robustPause;
        
        console.log('Robust music pause fix applied');
    }
});
