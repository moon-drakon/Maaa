document.addEventListener('DOMContentLoaded', function() {
    preloadAudio();
});

function preloadAudio() {
    const audioSources = [
        { src: 'audio/moms-song.mp3', type: 'audio/mp3' },
        { src: 'https:
        { src: 'https:
        { src: 'https:
    ];
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
        console.warn('Audio Context not supported in this browser');
        return;
    }
    
    const audioContext = new AudioContext();
    
    
    if (audioContext.state === 'suspended') {
        const resumeAudioContext = function() {
            audioContext.resume();
            
            
            document.removeEventListener('click', resumeAudioContext);
            document.removeEventListener('touchstart', resumeAudioContext);
            document.removeEventListener('keydown', resumeAudioContext);
            
            console.log('AudioContext resumed');
        };
        
        document.addEventListener('click', resumeAudioContext);
        document.addEventListener('touchstart', resumeAudioContext);
        document.addEventListener('keydown', resumeAudioContext);
    }
    
    
    let loadedAudio = false;
    let currentSourceIndex = 0;
    
    function tryNextSource() {
        if (currentSourceIndex >= audioSources.length) {
            console.warn('All audio sources failed to load');
            return;
        }
        
        const source = audioSources[currentSourceIndex];
        console.log('Attempting to load audio:', source.src);
        
        fetch(source.src)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then(buffer => {
                
                return audioContext.decodeAudioData(buffer);
            })
            .then(decodedData => {
                console.log('Audio loaded successfully:', source.src);
                loadedAudio = true;
                
                
                window.preloadedAudioData = {
                    source: source.src,
                    decoded: decodedData
                };
                
                
                const event = new CustomEvent('audioPreloaded', { 
                    detail: { source: source.src } 
                });
                document.dispatchEvent(event);
            })
            .catch(error => {
                console.warn(`Failed to load audio source (${source.src}):`, error);
                
                currentSourceIndex++;
                tryNextSource();
            });
    }
    
    
    tryNextSource();
}
