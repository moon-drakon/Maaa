
document.addEventListener('DOMContentLoaded', function() {
    console.log('Emergency pause handler initializing...');
    
    
    setTimeout(setupEmergencyPauseHandler, 2000);
    
    function setupEmergencyPauseHandler() {
        const playButton = document.getElementById('play-music-button');
        if (!playButton) {
            console.warn('Emergency pause: Play button not found');
            return;
        }
        
        
        function isInPauseState() {
            
            if (playButton.textContent.toLowerCase().includes('pause')) {
                return true;
            }
            
            
            if (playButton.classList.contains('active')) {
                return true;
            }
            
            
            return false;
        }
        
        
        playButton.addEventListener('dblclick', function(e) {
            console.log('Emergency pause: Double-clicked detected');
            
            
            if (isInPauseState()) {
                e.preventDefault();
                e.stopPropagation();
                
                
                console.log('Emergency pause: Performing emergency pause via page handling');
                
                
                const audioElement = document.getElementById('background-music');
                if (audioElement) {
                    
                    localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                    localStorage.setItem('musicVolume', audioElement.volume);
                }
                
                
                localStorage.setItem('musicIsPlaying', 'false');
                localStorage.setItem('emergencyPause', 'true');
                localStorage.setItem('musicStateTimestamp', Date.now());
                
                
                window.location.reload();
                return false;
            }
        });
        
        
        if (localStorage.getItem('emergencyPause') === 'true') {
            console.log('Emergency pause: Page loaded after emergency pause');
            
            
            localStorage.removeItem('emergencyPause');
                  
            playButton.textContent = 'Play Music';
            playButton.classList.remove('active');
        }
        
        
        window.emergencyPause = function() {
            console.log('Emergency pause function called');
            
            
            const audioElement = document.getElementById('background-music');
            if (audioElement) {
                
                localStorage.setItem('musicCurrentTime', audioElement.currentTime);
                localStorage.setItem('musicVolume', audioElement.volume);
            }
            
            
            localStorage.setItem('musicIsPlaying', 'false');
            localStorage.setItem('emergencyPause', 'true');
            localStorage.setItem('musicStateTimestamp', Date.now());
            
            
            const playBtn = document.getElementById('play-music-button');
            if (playBtn) {
                playBtn.textContent = 'Play Music';
                playBtn.classList.remove('active');
            }
        };
        
        
            const allAudio = document.querySelectorAll('audio');
            allAudio.forEach(audio => {
                try {
                    audio.pause();
                } catch (e) {
                    console.warn('Could not pause audio element:', e);
                }
            });
            
            
            setTimeout(function() {
                const audioElement = document.getElementById('background-music');
                if (audioElement && !audioElement.paused) {
                    console.log('Emergency pause: Audio still playing, replacing element');
                    
                    
                    const currentTime = audioElement.currentTime;
                    const volume = audioElement.volume;
                    
                    
                    const newAudio = document.createElement('audio');
                    newAudio.id = 'background-music';
                    newAudio.loop = true;
                    newAudio.preload = 'auto';
                    
                    
                    const source = document.createElement('source');
                    source.src = 'audio/moms-song.mp3';
                    source.type = 'audio/mpeg';
                    newAudio.appendChild(source);
                    
                    
                    audioElement.parentNode.replaceChild(newAudio, audioElement);
                    
                    
                    newAudio.volume = volume;
                    
                    
                    newAudio.addEventListener('loadedmetadata', function() {
                        newAudio.currentTime = currentTime;
                    });
                }
            }, 500);
        
            console.log('Emergency pause handler initialized');
        }
});
