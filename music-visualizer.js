

document.addEventListener('DOMContentLoaded', function() {
    initMusicVisualizer();
});

function initMusicVisualizer() {
    
    const audioElement = document.querySelector('audio');
    if (!audioElement) {
        console.log('No audio element found for visualization');
        return;
    }
    
    
    const visualizerContainer = document.createElement('div');
    visualizerContainer.className = 'music-visualizer-container';
    document.body.appendChild(visualizerContainer);
    
    
    const canvas = document.createElement('canvas');
    canvas.className = 'music-visualizer';
    visualizerContainer.appendChild(canvas);
    
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    
    
    const source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 150;
    
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    
    const colors = [
        'rgba(255, 112, 166, 1)', 
        'rgba(255, 145, 187, 1)', 
        'rgba(178, 112, 214, 1)', 
        'rgba(147, 112, 219, 1)'  
    ];
    
    
    function animate() {
        requestAnimationFrame(animate);
        
        
        analyser.getByteFrequencyData(dataArray);
        
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            
            const barHeight = dataArray[i] / 2;
            
            
            const colorIndex = Math.floor(i / bufferLength * colors.length);
            const color = colors[colorIndex];
            
            
            const gradient = ctx.createLinearGradient(x, canvas.height - barHeight, x, canvas.height);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(x, canvas.height, barWidth, barHeight / 3);
            
            
            x += barWidth + 1;
        }
    }
    
    
    audioElement.addEventListener('play', function() {
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        
        animate();
        
        
        visualizerContainer.style.opacity = '1';
    });
    
    
    audioElement.addEventListener('pause', function() {
        visualizerContainer.style.opacity = '0';
    });
    
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
    });
    
    
    createMusicControls(audioElement, visualizerContainer);
}


function createMusicControls(audioElement, visualizerContainer) {
    
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'music-controls';
    visualizerContainer.appendChild(controlsContainer);
    
    
    const playButton = document.createElement('button');
    playButton.className = 'music-control-button play-pause';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    controlsContainer.appendChild(playButton);
    
    
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    controlsContainer.appendChild(volumeControl);
    
    const volumeIcon = document.createElement('span');
    volumeIcon.className = 'volume-icon';
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeControl.appendChild(volumeIcon);
    
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.01;
    volumeSlider.value = 0.7; 
    volumeSlider.className = 'volume-slider';
    volumeControl.appendChild(volumeSlider);
    
    
    const trackInfo = document.createElement('div');
    trackInfo.className = 'track-info';
    trackInfo.innerHTML = '<span>Mother\'s Day Special</span>';
    controlsContainer.appendChild(trackInfo);
    
    
    audioElement.volume = volumeSlider.value;
    
    
    playButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioElement.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    
    volumeSlider.addEventListener('input', function() {
        audioElement.volume = this.value;
        
        
        if (this.value == 0) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (this.value < 0.5) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    
    audioElement.addEventListener('play', function() {
        controlsContainer.style.opacity = '1';
    });
}
