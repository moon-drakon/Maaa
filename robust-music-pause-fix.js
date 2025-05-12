document.addEventListener('DOMContentLoaded', function() {
    setTimeout(applyPauseFix, 1000);
    
    function applyPauseFix() {
        const audioElement = document.getElementById('background-music');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !playButton) {
            return;
        }
        
        function robustPause() {
            try {
                audioElement.pause();

                if (!audioElement.paused) {
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
                    }
                }
            } catch (error) {}
            
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
    }
});
