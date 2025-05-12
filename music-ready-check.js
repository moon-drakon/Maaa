
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music ready check initializing...');
    
    
    setTimeout(checkMusicSystem, 2000);
    
    function checkMusicSystem() {
        const audioElement = document.getElementById('background-music');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !playButton) {
            console.error('Music system elements missing - attempting repair');
            repairMusicSystem();
            return;
        }
        
        
        let hasValidSource = false;
        
        
        if (audioElement.querySelector('source')) {
            hasValidSource = true;
        } else if (audioElement.src) {
            hasValidSource = true;
        }
        
        if (!hasValidSource) {
            console.error('Audio element has no valid source');
            repairMusicSystem();
            return;
        }
        
        
        if (typeof playButton.onclick !== 'function' && 
            playButton._events === undefined && 
            playButton.eventListenerList === undefined) {
            console.warn('Play button may not have event handlers');
            
            
            playButton.addEventListener('click', function() {
                console.log('Backup click handler triggered');
                if (audioElement && audioElement.paused) {
                    audioElement.play()
                        .then(() => console.log('Music started from backup handler'))
                        .catch(err => console.error('Backup handler play error:', err));
                } else if (audioElement) {
                    audioElement.pause();
                }
            });
        }
        
        console.log('Music system check complete');
    }
    
    function repairMusicSystem() {
        console.log('Attempting to repair music system...');
        
        
        let audioElement = document.getElementById('background-music');
        if (!audioElement) {
            audioElement = document.createElement('audio');
            audioElement.id = 'background-music';
            audioElement.preload = 'auto';
            audioElement.loop = true;
            
            const source = document.createElement('source');
            source.src = 'audio/moms-song.mp3';
            source.type = 'audio/mpeg';
            
            audioElement.appendChild(source);
            document.body.appendChild(audioElement);
            console.log('Recreated audio element');
        }
        
        
        let controls = document.getElementById('music-controls');
        if (!controls) {
            controls = document.createElement('div');
            controls.id = 'music-controls';
            
            const playBtn = document.createElement('button');
            playBtn.id = 'play-music-button';
            playBtn.textContent = 'Play Music';
            
            const volumeSlider = document.createElement('input');
            volumeSlider.id = 'volume-slider';
            volumeSlider.type = 'range';
            volumeSlider.min = '0';
            volumeSlider.max = '1';
            volumeSlider.step = '0.01';
            volumeSlider.value = '0.7';
            
            controls.appendChild(playBtn);
            controls.appendChild(volumeSlider);
            document.body.appendChild(controls);
            console.log('Recreated music controls');
            
            
            if (typeof enableDirectAudio === 'function') {
                enableDirectAudio();
            }
        }
        
        console.log('Music system repair complete');
    }
});
