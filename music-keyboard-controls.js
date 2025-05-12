
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music keyboard controls initializing...');
    
    
    document.addEventListener('keydown', function(event) {
        
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }        
        if (event.code === 'Space' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
            const playButton = document.getElementById('play-music-button');
            const audioElement = document.getElementById('background-music');
            
            if (playButton && audioElement) {
                
                event.preventDefault();
                event.stopPropagation();
                
                console.log('Spacebar pressed - toggling music playback');

                
                if (audioElement.paused) {
                    
                    const playPromise = audioElement.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            console.log('Spacebar - Audio played successfully');
                            
                            playButton.textContent = 'Pause Music';
                            playButton.classList.add('active');
                            
                            localStorage.setItem('musicIsPlaying', 'true');
                        }).catch(err => {
                            console.error('Spacebar play error:', err);
                            
                            playButton.click();
                        });
                    }
                } else {
                    
                    audioElement.pause();
                    console.log('Spacebar - Audio paused successfully');
                    
                    playButton.textContent = 'Play Music';
                    playButton.classList.remove('active');
                    
                    localStorage.setItem('musicIsPlaying', 'false');
                    
                    
                    if (!audioElement.paused && window.robustAudioPause) {
                        window.robustAudioPause();
                    }
                }
            }
        }
        
        
        if (event.code === 'KeyM' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
            const audioElement = document.getElementById('background-music');
            const volumeSlider = document.getElementById('volume-slider');
            
            if (audioElement && volumeSlider) {
                if (audioElement.volume > 0) {
                    
                    audioElement.dataset.previousVolume = audioElement.volume;
                    audioElement.volume = 0;
                    volumeSlider.value = 0;
                    
                    
                    showVolumeNotification('Muted');
                } else {
                    
                    const prevVolume = parseFloat(audioElement.dataset.previousVolume || 0.7);
                    audioElement.volume = prevVolume;
                    volumeSlider.value = prevVolume;
                    
                    
                    showVolumeNotification(`Volume: ${Math.round(prevVolume * 100)}%`);
                }
            }
        }
        
        
        if ((event.code === 'ArrowUp' || event.code === 'ArrowDown') && 
            event.ctrlKey && !event.altKey && !event.shiftKey) {
            
            const audioElement = document.getElementById('background-music');
            const volumeSlider = document.getElementById('volume-slider');
            
            if (audioElement && volumeSlider) {
                let newVolume = audioElement.volume;
                
                if (event.code === 'ArrowUp') {
                    newVolume = Math.min(1, newVolume + 0.1);
                } else {
                    newVolume = Math.max(0, newVolume - 0.1);
                }
                
                
                newVolume = Math.round(newVolume * 10) / 10;
                
                audioElement.volume = newVolume;
                volumeSlider.value = newVolume;
                
                
                showVolumeNotification(`Volume: ${Math.round(newVolume * 100)}%`);
                
                event.preventDefault(); 
            }
        }
    });
    
    
    function showVolumeNotification(message) {
        
        if (typeof showNotification === 'function') {
            showNotification(message);
            return;
        }
        
        
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '60px';
        notification.style.left = '10px';
        notification.style.background = 'rgba(255, 255, 255, 0.9)';
        notification.style.padding = '8px 15px';
        notification.style.borderRadius = '20px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'opacity 0.3s ease';
        notification.style.borderLeft = '3px solid #4CAF50';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
    
    console.log('Music keyboard controls initialized');
});
