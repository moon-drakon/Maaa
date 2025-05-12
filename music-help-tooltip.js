
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music help tooltip initializing...');
    
    
    setTimeout(createMusicHelpTooltip, 1000);
    
    function createMusicHelpTooltip() {
        const musicControls = document.getElementById('music-controls');
        if (!musicControls) {
            console.warn('Music help tooltip: Music controls not found');
            return;
        }
        
        
        const helpIcon = document.createElement('span');
        helpIcon.innerHTML = '?';
        helpIcon.className = 'music-help-icon';
        helpIcon.style.cursor = 'pointer';
        helpIcon.style.marginLeft = '10px';
        helpIcon.style.display = 'inline-flex';
        helpIcon.style.alignItems = 'center';
        helpIcon.style.justifyContent = 'center';
        helpIcon.style.width = '20px';
        helpIcon.style.height = '20px';
        helpIcon.style.borderRadius = '50%';
        helpIcon.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        helpIcon.style.color = '#ff6b6b';
        helpIcon.style.fontSize = '14px';
        helpIcon.style.fontWeight = 'bold';
        helpIcon.style.transition = 'all 0.2s ease';
        
        
        const tooltip = document.createElement('div');
        tooltip.className = 'music-help-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '10px';
        tooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        tooltip.style.color = '#333';
        tooltip.style.padding = '10px 15px';
        tooltip.style.borderRadius = '10px';
        tooltip.style.boxShadow = '0 3px 15px rgba(0, 0, 0, 0.2)';
        tooltip.style.width = '200px';
        tooltip.style.fontSize = '12px';
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        tooltip.style.zIndex = '1002';
        tooltip.style.marginBottom = '10px';
        tooltip.style.pointerEvents = 'none';
        
        
        tooltip.innerHTML = `
            <h4 style="margin-top: 0; color: #ff6b6b;">Music Controls</h4>
            <p style="margin-bottom: 5px;"><strong>Space</strong> - Play/Pause music</p>
            <p style="margin-bottom: 5px;"><strong>M</strong> - Mute/Unmute</p>
            <p style="margin-bottom: 0;"><strong>Ctrl + ↑/↓</strong> - Volume up/down</p>
        `;
        
        
        helpIcon.onmouseenter = function() {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            helpIcon.style.backgroundColor = '#ff6b6b';
            helpIcon.style.color = 'white';
        };
        
        helpIcon.onmouseleave = function() {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
            helpIcon.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            helpIcon.style.color = '#ff6b6b';
        };
        
        
        musicControls.appendChild(tooltip);
        musicControls.appendChild(helpIcon);
        
        console.log('Music help tooltip initialized');
    }
});
