// pause-tip-notification.js - DISABLED popup notifications per user request
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pause tip notification disabled by user request');
    
    // All functionality disabled - no popups will be shown
    function setupPauseTipNotification() {
        // Do nothing - functionality disabled
    }
    
    // Empty placeholder function to avoid errors if other code tries to call it
    window.showPauseTip = function() {
        // Do nothing
    };
        
        // Add event listeners to detect first play
        playButton.addEventListener('click', function() {
            // Check if this click was a play action (based on current state before click)
            if (audioElement.paused) {
                hasPlayedMusic = true;
                
                // If user has played but never paused, show tip after a delay
                if (!hasPausedMusic && !tipShown) {
                    setTimeout(showPauseTip, 8000);
                }
            } else {
                // Mark that user has successfully paused music
                hasPausedMusic = true;
                localStorage.setItem('hasPausedMusic', 'true');
                
                // If tip is showing, hide it
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
        
        function showPauseTip() {
            // Only show tip if music is currently playing
            if (audioElement.paused || hasPausedMusic || tipShown) {
                return;
            }
            
            tipShown = true;
            
            // Create tip element
            const tip = document.createElement('div');
            tip.id = 'pause-tip';
            tip.className = 'pause-tip';
            
            Object.assign(tip.style, {
                position: 'fixed',
                bottom: '80px',
                left: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#333',
                padding: '10px 15px',
                borderRadius: '10px',
                boxShadow: '0 3px 15px rgba(0, 0, 0, 0.2)',
                maxWidth: '250px',
                fontSize: '14px',
                zIndex: '999',
                transition: 'opacity 0.5s ease',
                opacity: '0',
                transform: 'translateY(10px)'
            });
            
            // Add close button
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '5px';
            closeBtn.style.right = '10px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '18px';
            
            closeBtn.onclick = function() {
                tip.style.opacity = '0';
                setTimeout(() => {
                    if (tip.parentNode) {
                        tip.parentNode.removeChild(tip);
                    }
                }, 500);
            };
            
            // Add content
            const content = document.createElement('div');
            content.innerHTML = `
                <strong>Tip:</strong> To pause the music, click the 
                <span style="color: #ff4081; font-weight: bold;">Pause Music</span> button 
                or press the <strong>Space</strong> key.
                <div style="margin-top: 5px; font-size: 12px; opacity: 0.8;">
                    Double-click the button as a fallback if pause doesn't work.
                </div>
            `;
            
            // Add elements to tip
            tip.appendChild(closeBtn);
            tip.appendChild(content);
            
            // Add to document
            document.body.appendChild(tip);
            
            // Animate in
            setTimeout(() => {
                tip.style.opacity = '1';
                tip.style.transform = 'translateY(0)';
            }, 100);
            
            // Auto-hide after 12 seconds
            setTimeout(() => {
                if (tip.parentNode) {
                    tip.style.opacity = '0';
                    setTimeout(() => {
                        if (tip.parentNode) {
                            tip.parentNode.removeChild(tip);
                        }
                    }, 500);
                }
            }, 12000);
        }
        
        console.log('Pause tip notification initialized');
    }
});
