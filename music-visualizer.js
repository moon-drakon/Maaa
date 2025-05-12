// Music Visualizer for Mother's Day Website

document.addEventListener('DOMContentLoaded', function() {
    initMusicVisualizer();
});

function initMusicVisualizer() {
    // Check if audio element exists
    const audioElement = document.querySelector('audio');
    if (!audioElement) {
        console.log('No audio element found for visualization');
        return;
    }
    
    // Create visualizer container
    const visualizerContainer = document.createElement('div');
    visualizerContainer.className = 'music-visualizer-container';
    document.body.appendChild(visualizerContainer);
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'music-visualizer';
    visualizerContainer.appendChild(canvas);
    
    // Setup audio context and analyzer
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    
    // Connect audio element to analyzer
    const source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 150;
    
    // Create data array for visualization
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Colors for visualization
    const colors = [
        'rgba(255, 112, 166, 1)', // Pink
        'rgba(255, 145, 187, 1)', // Light Pink
        'rgba(178, 112, 214, 1)', // Purple
        'rgba(147, 112, 219, 1)'  // Medium Purple
    ];
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Get frequency data
        analyser.getByteFrequencyData(dataArray);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw visualization
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            // Get bar height based on frequency data
            const barHeight = dataArray[i] / 2;
            
            // Determine color based on frequency
            const colorIndex = Math.floor(i / bufferLength * colors.length);
            const color = colors[colorIndex];
            
            // Draw bar with gradient
            const gradient = ctx.createLinearGradient(x, canvas.height - barHeight, x, canvas.height);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            // Draw reflection
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(x, canvas.height, barWidth, barHeight / 3);
            
            // Add some spacing between bars
            x += barWidth + 1;
        }
    }
    
    // Start animation when audio plays
    audioElement.addEventListener('play', function() {
        // Resume audio context if suspended
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Start animation
        animate();
        
        // Show visualizer
        visualizerContainer.style.opacity = '1';
    });
    
    // Hide visualizer when audio pauses
    audioElement.addEventListener('pause', function() {
        visualizerContainer.style.opacity = '0';
    });
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
    });
    
    // Create music controls
    createMusicControls(audioElement, visualizerContainer);
}

// Create beautiful music controls
function createMusicControls(audioElement, visualizerContainer) {
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'music-controls';
    visualizerContainer.appendChild(controlsContainer);
    
    // Create play/pause button
    const playButton = document.createElement('button');
    playButton.className = 'music-control-button play-pause';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    controlsContainer.appendChild(playButton);
    
    // Create volume control
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
    volumeSlider.value = 0.7; // Default volume
    volumeSlider.className = 'volume-slider';
    volumeControl.appendChild(volumeSlider);
    
    // Create track info
    const trackInfo = document.createElement('div');
    trackInfo.className = 'track-info';
    trackInfo.innerHTML = '<span>Mother\'s Day Special</span>';
    controlsContainer.appendChild(trackInfo);
    
    // Set initial volume
    audioElement.volume = volumeSlider.value;
    
    // Play/pause button event
    playButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioElement.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Volume control event
    volumeSlider.addEventListener('input', function() {
        audioElement.volume = this.value;
        
        // Update volume icon
        if (this.value == 0) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (this.value < 0.5) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Show controls when audio plays
    audioElement.addEventListener('play', function() {
        controlsContainer.style.opacity = '1';
    });
}
