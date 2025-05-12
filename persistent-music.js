function saveMusicState(isPlaying, currentTime, volume) {
    try {
        localStorage.setItem('musicIsPlaying', isPlaying);
        localStorage.setItem('musicCurrentTime', currentTime);
        localStorage.setItem('musicVolume', volume);
        localStorage.setItem('musicStateTimestamp', Date.now());
    } catch (error) {
        console.warn('Could not save music state to localStorage:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    window.addEventListener('beforeunload', function() {
        const audioElement = document.getElementById('background-music');
        if (audioElement) {
            console.log('Saving music state before navigation - Time:', audioElement.currentTime);
            
            const isPlaying = !audioElement.paused;
            const currentTime = audioElement.currentTime;
            const volume = audioElement.volume;
            
            
            if (isNaN(currentTime) || currentTime < 0) {
                console.warn('Invalid currentTime detected:', currentTime);
                
                setTimeout(() => {
                    if (!isNaN(audioElement.currentTime) && audioElement.currentTime >= 0) {
                        saveMusicState(isPlaying, audioElement.currentTime, volume);
                    }
                }, 10);
            } else {
                saveMusicState(isPlaying, currentTime, volume);
            }
        }
    });
      
    setInterval(function() {
        const audioElement = document.getElementById('background-music');
        if (audioElement) {
            
            if (!isNaN(audioElement.currentTime) && audioElement.currentTime > 0) {
                localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                localStorage.setItem('musicIsPlaying', !audioElement.paused);
                localStorage.setItem('musicStateTimestamp', Date.now());
            }
        }
    }, 300);
    
    
    document.addEventListener('musicPlayerCreated', function() {
        setTimeout(restoreMusicState, 100); 
    });
});

function restoreMusicState() {
    const audioElement = document.getElementById('background-music');
    const playButton = document.getElementById('play-music-button');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (!audioElement || !playButton) {
        console.warn('Cannot restore music state - elements not found');
        return;
    }
    
    const wasPlaying = localStorage.getItem('musicIsPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
    const savedVolume = parseFloat(localStorage.getItem('musicVolume') || '0.7');
    const timestamp = parseInt(localStorage.getItem('musicStateTimestamp') || '0');
    
    
    const stateIsRecent = (Date.now() - timestamp) < 300000;
    
    console.log('Restoring music state:', { 
        wasPlaying, 
        savedTime, 
        savedVolume,
        stateIsRecent 
    });
    
    
    if (!isNaN(savedVolume) && volumeSlider) {
        audioElement.volume = savedVolume;
        volumeSlider.value = savedVolume;
    }
    
    
    if (!isNaN(savedTime)) {
        
        try {
            audioElement.currentTime = savedTime;
            console.log('Set audio position to:', savedTime);
        } catch (e) {
            console.error('Failed to set audio position:', e);
            
            
            setTimeout(() => {
                try {
                    audioElement.currentTime = savedTime;
                    console.log('Set audio position on second attempt:', savedTime);
                } catch (err) {
                    console.error('Failed to set audio position on second attempt:', err);
                }
            }, 1000);
        }
    }
      
    
    if (wasPlaying && stateIsRecent) {
        
        setTimeout(() => {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Music restored from previous state at position:', audioElement.currentTime);
                    
                    
                    playButton.textContent = 'Pause Music';
                    playButton.classList.add('active');
                    
                    
                    const musicActivity = document.querySelector('.music-activity');
                    if (musicActivity) musicActivity.classList.add('visible');
                    
                }).catch(error => {
                    console.error('Music restoration failed:', error);
                    
                });
            }
        }, 200);
    }
}
