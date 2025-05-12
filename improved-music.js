document.addEventListener('DOMContentLoaded', function() {
    createImprovedMusicPlayer();
    initImprovedMusicPlayer();
    
    document.addEventListener('audioPreloaded', function(e) {
        console.log('Audio preloaded event received:', e.detail.source);
        const audioElement = document.getElementById('background-music');
        if (audioElement) {
            audioElement.src = e.detail.source;
            audioElement.load();
            console.log('Audio source updated with preloaded source');
        }
    });
});

function createImprovedMusicPlayer() {
    const playerContainer = document.createElement('div');
    playerContainer.className = 'improved-music-player';
    
    playerContainer.addEventListener('click', function(e) {
        if (this.classList.contains('minimized') && e.target === this) {
            this.classList.remove('minimized');
            
            const music = document.getElementById('background-music');
            if (music && !music.paused) {
                setTimeout(() => {
                    if (!music.paused) {
                        this.classList.add('minimized');
                    }
                }, 5000);
            }
        }
    });
    
    // Header with title
    const playerHeader = document.createElement('div');
    playerHeader.className = 'player-header';
    playerHeader.innerHTML = '<i class="fas fa-music"></i> Mom\'s Special Song';
    
    // Main controls section
    const playerControls = document.createElement('div');
    playerControls.className = 'improved-player-controls';
    
    // Play/Pause button
    const playPauseBtn = document.createElement('button');
    playPauseBtn.id = 'play-pause-button';
    playPauseBtn.className = 'play-pause-btn';
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    
    // Volume controls with icon
    const volumeControl = document.createElement('div');
    volumeControl.className = 'improved-volume-control';
    
    const volumeIcon = document.createElement('div');
    volumeIcon.className = 'volume-icon';
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '100';
    volumeSlider.value = '70';
    volumeSlider.id = 'volume-slider';
    volumeSlider.className = 'improved-volume-slider';
    
    // Now playing indicator with animation
    const nowPlaying = document.createElement('div');
    nowPlaying.className = 'now-playing';
    nowPlaying.innerHTML = '<div class="playing-animation"><span></span><span></span><span></span><span></span><span></span></div>';
    nowPlaying.style.display = 'none';
      // Audio element
    const audioElement = document.createElement('audio');
    audioElement.id = 'background-music';
    audioElement.loop = true;
    audioElement.preload = 'auto';
    
    // Add multiple sources for better compatibility
    const musicSources = [        // Local file first - this will work even without internet
        { src: 'audio/moms-song.mp3', type: 'audio/mp3' },
        // Remote fallbacks
        { src: 'https://www.chosic.com/wp-content/uploads/2021/04/Beautiful-Piano-Meditation.mp3', type: 'audio/mp3' },
        { src: 'https://www.bensound.com/bensound-music/bensound-memories.mp3', type: 'audio/mp3' },
        { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', type: 'audio/mp3' }
    ];
    
    // Add sources to audio element
    musicSources.forEach(source => {
        const sourceElement = document.createElement('source');
        sourceElement.src = source.src;
        sourceElement.type = source.type;
        audioElement.appendChild(sourceElement);
    });
    
    // Error handling for audio
    audioElement.addEventListener('error', function(e) {
        console.error('Error loading audio:', e);
        alert('Sorry, there was an error loading the music. Please try refreshing the page.');
    });
    
    // Assemble volume control
    volumeControl.appendChild(volumeIcon);
    volumeControl.appendChild(volumeSlider);
    
    // Assemble player controls
    playerControls.appendChild(playPauseBtn);
    playerControls.appendChild(nowPlaying);
    playerControls.appendChild(volumeControl);
    
    // Assemble the player
    playerContainer.appendChild(playerHeader);
    playerContainer.appendChild(playerControls);
    playerContainer.appendChild(audioElement);
      // Add to body
    document.body.appendChild(playerContainer);
    
    // Make sure audio loads properly
    audioElement.load();
    
    // Dispatch event that player has been created
    const event = new CustomEvent('musicPlayerCreated');
    document.dispatchEvent(event);
}

function initImprovedMusicPlayer() {
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-button');
    const volumeSlider = document.getElementById('volume-slider');
    const nowPlaying = document.querySelector('.now-playing');
    const volumeIcon = document.querySelector('.volume-icon');
    const playerContainer = document.querySelector('.improved-music-player');
    
    // Function to keep player visible during interaction
    function keepPlayerVisible() {
        if (playerContainer.classList.contains('minimized')) {
            playerContainer.classList.remove('minimized');
            
            // Set up auto-hide again
            if (!music.paused) {
                clearTimeout(window.playerHideTimeout);
                window.playerHideTimeout = setTimeout(() => {
                    if (!music.paused) {
                        playerContainer.classList.add('minimized');
                    }
                }, 5000);
            }
        }
    }
    
    // Set initial volume
    music.volume = volumeSlider.value / 100;
    
    // Auto-play check and handling
    const attemptAutoPlay = function() {
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started successfully
                updatePlayPauseButton(true);
            }).catch(error => {
                // Auto-play was prevented, show play button
                updatePlayPauseButton(false);
                console.log('Autoplay prevented. Please click to play.');
            });
        }
    };
    
    // Attempt autoplay when document is clicked
    document.addEventListener('click', function() {
        if (music.paused) {
            attemptAutoPlay();
        }
    }, { once: true });
      // Play/Pause toggle
    playPauseBtn.addEventListener('click', function() {
        keepPlayerVisible();
        
        if (music.paused) {
            music.play()
                .then(() => {
                    updatePlayPauseButton(true);
                })
                .catch(error => {
                    console.error('Play failed:', error);
                    updatePlayPauseButton(false);
                });
        } else {
            music.pause();
            updatePlayPauseButton(false);
        }
    });
      // Volume slider functionality
    volumeSlider.addEventListener('input', function() {
        keepPlayerVisible();
        
        const volume = this.value / 100;
        music.volume = volume;
        
        // Update volume icon based on level
        if (volume === 0) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (volume < 0.5) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
      // Update the play/pause button and animation
    function updatePlayPauseButton(isPlaying) {
        const playerContainer = document.querySelector('.improved-music-player');
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            nowPlaying.style.display = 'block';
            
            // Auto-hide the player after 3 seconds when playing
            setTimeout(() => {
                if (!music.paused) {
                    playerContainer.classList.add('minimized');
                }
            }, 3000);
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            nowPlaying.style.display = 'none';
            
            // Show full player when paused
            playerContainer.classList.remove('minimized');
        }
    }
    
    // Music ended event
    music.addEventListener('ended', function() {
        // This shouldn't happen with loop=true, but just in case
        updatePlayPauseButton(false);
    });
    
    // Music canplaythrough event
    music.addEventListener('canplaythrough', function() {
        console.log('Audio ready to play');
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Spacebar for play/pause
        if (e.code === 'Space' && e.target === document.body) {            e.preventDefault();
            playPauseBtn.click();
        }
        else if (e.key.toLowerCase() === 'm') {
            if (music.volume > 0) {
                music.dataset.previousVolume = music.volume;
                volumeSlider.value = 0;
                music.volume = 0;
                volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                const previousVolume = music.dataset.previousVolume || 0.7;
                volumeSlider.value = previousVolume * 100;
                music.volume = previousVolume;
                if (previousVolume < 0.5) {
                    volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
                } else {
                    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            }
        }
    });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createImprovedMusicPlayer();
    initImprovedMusicPlayer();
}

function updateMusicState() {
    const audioElement = document.getElementById('background-music');
    if (audioElement && typeof saveMusicState === 'function') {
        saveMusicState(
            !audioElement.paused,
            audioElement.currentTime,
            audioElement.volume
        );
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('background-music');
    if (audioElement) {
        audioElement.addEventListener('play', updateMusicState);
        audioElement.addEventListener('pause', updateMusicState);
        audioElement.addEventListener('volumechange', updateMusicState);
        audioElement.addEventListener('timeupdate', function() {
            if (Math.round(audioElement.currentTime) % 5 === 0) {
                updateMusicState();
            }
        });
    }
});
