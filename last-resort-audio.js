
document.addEventListener('DOMContentLoaded', function() {
    console.log('Last resort audio player initializing...');
    
    
    setTimeout(initializeLastResortAudio, 1500);
    
    function initializeLastResortAudio() {
        
        const playButton = document.getElementById('play-music-button');
        const existingAudio = document.getElementById('background-music');
        
        if (!playButton) {
            console.error('Last resort audio: Play button not found');
            return;
        }
          
        let emergencyAudio = null;
        
        
        playButton.addEventListener('click', function() {
            console.log('Last resort audio: Play button clicked');
            
            try {
                
                if (existingAudio && !existingAudio.error) {
                    
                    return;
                }
                
                
                if (emergencyAudio) {
                    
                    if (!emergencyAudio.paused) {
                        console.log('Last resort audio: Pausing existing emergency audio');
                        emergencyAudio.pause();
                        playButton.textContent = 'Play Music';
                        playButton.classList.remove('active');
                        return;
                    }
                    
                    
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
                
                
                console.log('Last resort audio: Creating new audio element');
                emergencyAudio = new Audio('audio/moms-song.mp3');
                emergencyAudio.id = 'emergency-audio';
                emergencyAudio.loop = true;
                emergencyAudio.volume = 0.7;
                
                
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
