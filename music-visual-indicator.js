
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music visual indicator initializing...');
    
    
    createMusicIndicator();
    
    
    setTimeout(setupMusicActivityMonitor, 1500);
    
    function createMusicIndicator() {
        
        if (document.querySelector('.music-activity')) {
            return;
        }
        
        
        const indicator = document.createElement('div');
        indicator.className = 'music-activity';
        
        
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            indicator.appendChild(bar);
        }
        
        
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
        
        
        playButton.addEventListener('click', function() {
            setTimeout(updateIndicatorState, 100);
        });
        
        
        audioElement.addEventListener('play', function() {
            indicator.classList.add('visible');
        });
        
        audioElement.addEventListener('pause', function() {
            indicator.classList.remove('visible');
        });
        
        audioElement.addEventListener('ended', function() {
            indicator.classList.remove('visible');
        });
        
        
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
