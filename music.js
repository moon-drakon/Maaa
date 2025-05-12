
document.addEventListener('DOMContentLoaded', function() {
    
    createMusicPlayer();
    
    
    initMusicPlayer();
});

function createMusicPlayer() {
    const playerContainer = document.createElement('div');
    playerContainer.className = 'music-player';
    
    const songTitle = document.createElement('div');
    songTitle.className = 'song-title';
    songTitle.textContent = 'Mom\'s Song';
    
    const playerControls = document.createElement('div');
    playerControls.className = 'player-controls';
    
    const playButton = document.createElement('button');
    playButton.id = 'play-button';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    
    const pauseButton = document.createElement('button');
    pauseButton.id = 'pause-button';
    pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    pauseButton.style.display = 'none';
    
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    volumeControl.innerHTML = '<i class="fas fa-volume-up"></i>';
    
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '100';
    volumeSlider.value = '70';
    volumeSlider.id = 'volume-slider';
    
    const audioElement = document.createElement('audio');
    audioElement.id = 'background-music';
    audioElement.loop = true;
    
    
    const musicSources = [
        { src: 'https:
    ];
    
    
    musicSources.forEach(source => {
        const sourceElement = document.createElement('source');
        sourceElement.src = source.src;
        sourceElement.type = source.type;
        audioElement.appendChild(sourceElement);
    });
    
    
    volumeControl.appendChild(volumeSlider);
    playerControls.appendChild(playButton);
    playerControls.appendChild(pauseButton);
    playerControls.appendChild(volumeControl);
    
    playerContainer.appendChild(songTitle);
    playerContainer.appendChild(playerControls);
    playerContainer.appendChild(audioElement);
    
    document.body.appendChild(playerContainer);
}

function initMusicPlayer() {
    const music = document.getElementById('background-music');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const volumeSlider = document.getElementById('volume-slider');
    
    
    music.volume = volumeSlider.value / 100;
    
    
    playButton.addEventListener('click', function() {
        music.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    });
    
    
    pauseButton.addEventListener('click', function() {
        music.pause();
        pauseButton.style.display = 'none';
        playButton.style.display = 'inline-block';
    });
    
    
    volumeSlider.addEventListener('input', function() {
        music.volume = volumeSlider.value / 100;
    });
}
