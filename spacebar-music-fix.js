document.addEventListener('DOMContentLoaded', function() {
    console.log('Spacebar fix initializing...');
    
    setTimeout(applySpacebarFix, 1000);
    
    function applySpacebarFix() {
        const audioElement = document.getElementById('background-music');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !playButton) {
            console.warn('Spacebar fix: Required elements not found');
            return;
        }
        
        console.log('Applying dedicated spacebar fix');
        
        function handleSpacebar(event) {
            if (event.code !== 'Space' || event.ctrlKey || event.altKey || event.shiftKey) {
                return;
            }
            
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }
            
            event.preventDefault();
            event.stopPropagation();
            
            console.log('Spacebar handler - toggling music playback');
            
            if (audioElement.paused) {
            
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Spacebar handler - Audio played successfully');
                        playButton.textContent = 'Pause Music';
                        playButton.classList.add('active');
                        localStorage.setItem('musicIsPlaying', 'true');
                    }).catch(err => {
                        console.error('Spacebar play error:', err);
                        setTimeout(() => playButton.click(), 10);
                    });
                }
            } else {
                audioElement.pause();
                console.log('Spacebar handler - Audio paused successfully');
                
                playButton.textContent = 'Play Music';
                playButton.classList.remove('active');
                
                localStorage.setItem('musicIsPlaying', 'false');
                
                if (!audioElement.paused) {
                    console.warn('Standard pause failed, trying robust pause');
                    if (window.robustAudioPause) {
                        window.robustAudioPause();
                    }
                }
            }
        }
        
        document.addEventListener('keydown', handleSpacebar, { capture: true });
        
        console.log('Spacebar fix applied successfully');
    }
});
