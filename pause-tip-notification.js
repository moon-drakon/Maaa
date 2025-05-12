document.addEventListener('DOMContentLoaded', function() {
    console.log('Pause tip notification disabled by user request');
    
    let hasPlayedMusic = false;
    let hasPausedMusic = localStorage.getItem('hasPausedMusic') === 'true';
    let tipShown = false;
    let audioElement = document.querySelector('audio') || {};
    
    function setupPauseTipNotification() {
        window.showPauseTip = function() {
            console.log('Tip display is disabled per user request');
        };
        
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', function() {
                if (audioElement.paused) {
                    hasPlayedMusic = true;
                    
                    if (!hasPausedMusic && !tipShown) {
                        setTimeout(window.showPauseTip, 8000);
                    }
                } else {
                    hasPausedMusic = true;
                    localStorage.setItem('hasPausedMusic', 'true');
                    
                    const tip = document.getElementById('pause-tip');
                    if (tip) {
                        tip.style.opacity = '0';
                        setTimeout(() => {
                            if (tip.parentNode) {
                                tip.parentNode.removeChild(tip);
                            }
                        }, 500);
                    }
                }
            });
        }
        
        console.log('Pause tip notification initialized (disabled mode)');
    }
    
    setupPauseTipNotification();
});
