document.addEventListener('DOMContentLoaded', function() {
    console.log('Spacebar fix initializing...');
    
    // Wait a short while for other scripts to initialize
    setTimeout(applySpacebarFix, 1000);
    
    function applySpacebarFix() {
        const audioElement = document.getElementById('background-music');
        const playButton = document.getElementById('play-music-button');
        
        if (!audioElement || !playButton) {
            console.warn('Spacebar fix: Required elements not found');
            return;
        }
        
        console.log('Applying dedicated spacebar fix');
        
        // Create a dedicated spacebar handler
        function handleSpacebar(event) {
            // Only handle spacebar without modifiers
            if (event.code !== 'Space' || event.ctrlKey || event.altKey || event.shiftKey) {
                return;
            }
            
            // Skip if user is typing in an input field or textarea
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }
            
            // Prevent default (page scrolling)
            event.preventDefault();
            event.stopPropagation();
            
            console.log('Spacebar handler - toggling music playback');
            
            if (audioElement.paused) {
            
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Spacebar handler - Audio played successfully');
                        // Update button state
                        playButton.textContent = 'Pause Music';
                        playButton.classList.add('active');
                        // Save state
                        localStorage.setItem('musicIsPlaying', 'true');
                    }).catch(err => {
                        console.error('Spacebar play error:', err);
                        // Fallback to button click
                        setTimeout(() => playButton.click(), 10);
                    });
                }
            } else {
                // Pause the audio
                audioElement.pause();
                console.log('Spacebar handler - Audio paused successfully');
                
                // Update button state
                playButton.textContent = 'Play Music';
                playButton.classList.remove('active');
                
                // Save state
                localStorage.setItem('musicIsPlaying', 'false');
                
                // If pause didn't work, try the robust pause
                if (!audioElement.paused) {
                    console.warn('Standard pause failed, trying robust pause');
                    if (window.robustAudioPause) {
                        window.robustAudioPause();
                    }
                }
            }
        }
        
        // Add the spacebar handler to the document
        document.addEventListener('keydown', handleSpacebar, { capture: true });
        
        console.log('Spacebar fix applied successfully');
    }
});
