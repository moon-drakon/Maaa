
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music autoplay notice disabled by user request');
    
    
    function checkIfMusicStarted() {
        
    }
    
    function showPlayMusicNotice() {
        
        let notice = document.getElementById('music-notice');
        if (!notice) {
            notice = document.createElement('div');
            notice.id = 'music-notice';
            notice.className = 'music-notice';
            
            
            Object.assign(notice.style, {
                position: 'fixed',
                bottom: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '10px 20px',
                borderRadius: '20px',
                boxShadow: '0 3px 15px rgba(0, 0, 0, 0.2)',
                zIndex: '1001',
                fontSize: '14px',
                textAlign: 'center',
                maxWidth: '300px',
                animation: 'fadeIn 0.5s ease'
            });
            
            
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '5px';
            closeBtn.style.right = '10px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '18px';
            closeBtn.onclick = function() {
                document.body.removeChild(notice);
            };
            
            
            const content = document.createElement('p');
            content.innerHTML = '💕 Click the <strong>Play Music</strong> button in the bottom left corner for the full emotional experience! 🎵';
            content.style.margin = '0';
            
            
            const arrow = document.createElement('div');
            arrow.innerHTML = '👈';
            arrow.style.position = 'absolute';
            arrow.style.bottom = '-15px';
            arrow.style.left = '30px';
            arrow.style.fontSize = '24px';
            arrow.style.transform = 'rotate(30deg)';
            
            
            notice.appendChild(closeBtn);
            notice.appendChild(content);
            notice.appendChild(arrow);
            
            
            document.body.appendChild(notice);
            
            
            setTimeout(function() {
                if (notice.parentNode) {
                    notice.style.opacity = '0';
                    setTimeout(function() {
                        if (notice.parentNode) {
                            notice.parentNode.removeChild(notice);
                        }
                    }, 1000);
                }
            }, 10000);
        }
    }
    
    
    if (!document.getElementById('music-notice-keyframes')) {
        const style = document.createElement('style');
        style.id = 'music-notice-keyframes';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
        `;
        document.head.appendChild(style);
    }
});
