document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('background-music');
    const playButton = document.getElementById('play-music-button');
    const volumeSlider = document.getElementById('volume-slider');
    const musicControls = document.getElementById('music-controls');

    if (!audioPlayer || !playButton || !volumeSlider || !musicControls) {
        console.warn('Music player elements not found. Skipping music player initialization.');
        return;
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `music-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        const controlsRect = musicControls.getBoundingClientRect();
        notification.style.bottom = (controlsRect.height + 20) + 'px';
        notification.style.left = '10px';
        
        setTimeout(() => {
            notification.classList.add('visible');
            
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }, 10);
    }
    
    if (!audioPlayer.src || !audioPlayer.src.includes('/audio/')) {
        const defaultSong = 'audio/moms-song.mp3';
        audioPlayer.src = defaultSong;
        console.info('Set default audio source:', defaultSong);
    }

    const savedVolume = localStorage.getItem('musicVolume');
    const savedTime = localStorage.getItem('musicTime');
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';

    if (savedVolume !== null) {
        audioPlayer.volume = parseFloat(savedVolume);
        volumeSlider.value = parseFloat(savedVolume);
    }

    if (savedTime !== null) {
        audioPlayer.currentTime = parseFloat(savedTime);
    }
    
    function updatePlayButton() {
        if (audioPlayer.paused) {
            playButton.textContent = 'Play Music';
            playButton.classList.remove('pulsing');
        } else {
            playButton.textContent = 'Pause Music';
            playButton.classList.add('pulsing');
        }
    }
    
    function showControls() {
        musicControls.style.opacity = '1';
        musicControls.style.visibility = 'visible';
    }

    function hideControls() {
        musicControls.style.opacity = '0';
        musicControls.style.visibility = 'hidden';
    }
    
    musicControls.addEventListener('mouseenter', () => {
        showControls();
    });
    
    const createHoverDetection = () => {
        const hoverDetect = document.createElement('div');
        hoverDetect.id = 'music-hover-detect';
        hoverDetect.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 80px;
            z-index: 999;
            pointer-events: none;
        `;
        document.body.appendChild(hoverDetect);
        
        document.addEventListener('mousemove', (e) => {
            const cornerThreshold = 80;
            if (e.clientX <= cornerThreshold && e.clientY >= window.innerHeight - cornerThreshold) {
                showControls();
                clearTimeout(window.hideControlsTimeout);
                window.hideControlsTimeout = setTimeout(() => {
                    if (!audioPlayer.paused && !musicControls.matches(':hover')) {
                        hideControls();
                    }
                }, 2000);
            }
        });
    };
    createHoverDetection();
    
    musicControls.addEventListener('mouseleave', () => {
        if (!audioPlayer.paused) {
            setTimeout(() => {
                hideControls();
            }, 1500);
        }
    });
    
    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                localStorage.setItem('musicPlaying', 'true');
                updatePlayButton();
                hideControls();
                showNotification('Music started ♫', 'success');
            }).catch(error => {
                console.error("Error playing audio:", error);
                showNotification('Could not play music. Please try again.', 'error');
            });
        } else {
            audioPlayer.pause();
            localStorage.setItem('musicPlaying', 'false');
            updatePlayButton();
            showControls();
            showNotification('Music paused', 'info');
        }
    });
    
    let volumeNotificationTimeout;
    
    volumeSlider.addEventListener('input', () => {
        const newVolume = parseFloat(volumeSlider.value);
        audioPlayer.volume = newVolume;
        localStorage.setItem('musicVolume', newVolume.toString());
        
        clearTimeout(volumeNotificationTimeout);
        
        volumeNotificationTimeout = setTimeout(() => {
            const volumePercent = Math.round(newVolume * 100);
            const volumeEmoji = volumePercent > 70 ? '🔊' : volumePercent > 30 ? '🔉' : volumePercent > 0 ? '🔈' : '🔇';
            showNotification(`Volume: ${volumePercent}% ${volumeEmoji}`, 'info');
        }, 500);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        localStorage.setItem('musicTime', audioPlayer.currentTime.toString());
    });
    audioPlayer.addEventListener('ended', () => {
        localStorage.setItem('musicPlaying', 'false');
        updatePlayButton();
        showControls();
    });

    updatePlayButton();
    showControls();
    
    if (isPlaying) {
        showControls();
        audioPlayer.play().then(() => {
            updatePlayButton();
            hideControls();
        }).catch(error => {
            console.warn("Autoplay prevented:", error);
            localStorage.setItem('musicPlaying', 'false');
            updatePlayButton();
            showControls();
            
            setTimeout(() => {
                showNotification('Click the Play button to continue music ♫', 'info');
            }, 2000);
        });
    }
    
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicTime', audioPlayer.currentTime.toString());
        localStorage.setItem('musicVolume', audioPlayer.volume.toString());
        localStorage.setItem('musicPlaying', (!audioPlayer.paused).toString());
    });
});
