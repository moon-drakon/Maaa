// music-visual-indicator.js - Controls visualization that shows music is active
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music visual indicator initializing...');
    
    // Create the visual indicator element
    createMusicIndicator();
    
    // Wait for the audio element to be ready
    setTimeout(setupMusicActivityMonitor, 1500);
    
    function createMusicIndicator() {
        // First check if the indicator already exists
        if (document.querySelector('.music-activity')) {
            return;
        }
        
        // Create the indicator container
        const indicator = document.createElement('div');
        indicator.className = 'music-activity';
        
        // Create the bars
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            indicator.appendChild(bar);
        }
        
        // Add to the body
        document.body.appendChild(indicator);
        console.log('Music activity indicator created');
    }
    
    function setupMusicActivityMonitor() {
        const audioElement = document.getElementById('background-music');
        const indicator = document.querySelector('.music-activity');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !indicator || !playButton) {
            console.warn('Music activity monitor: Could not find required elements');
            return;
        }
        
        // Update indicator when play/pause button is clicked
        playButton.addEventListener('click', function() {
            setTimeout(updateIndicatorState, 100);
        });
        
        // Monitor audio state changes
        audioElement.addEventListener('play', function() {
            indicator.classList.add('visible');
        });
        
        audioElement.addEventListener('pause', function() {
            indicator.classList.remove('visible');
        });
        
        audioElement.addEventListener('ended', function() {
            indicator.classList.remove('visible');
        });
        
        // Initial state
        updateIndicatorState();
        
        function updateIndicatorState() {
            if (audioElement.paused) {
                indicator.classList.remove('visible');
            } else {
                indicator.classList.add('visible');
            }
        }
        
        console.log('Music activity monitor initialized');
    }
});
