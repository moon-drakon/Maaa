document.addEventListener('DOMContentLoaded', function() {
    preloadAudio();
});

function preloadAudio() {
    const audioSources = [
        { src: 'audio/moms-song.mp3', type: 'audio/mp3' },
        { src: 'https://www.chosic.com/wp-content/uploads/2021/04/Beautiful-Piano-Meditation.mp3', type: 'audio/mp3' },
        { src: 'https://www.bensound.com/bensound-music/bensound-memories.mp3', type: 'audio/mp3' },
        { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', type: 'audio/mp3' }
    ];
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
        console.warn('Audio Context not supported in this browser');
        return;
    }
    
    const audioContext = new AudioContext();
    
    // Check if AudioContext is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        const resumeAudioContext = function() {
            audioContext.resume();
            
            // Remove the event listeners once audio context is resumed
            document.removeEventListener('click', resumeAudioContext);
            document.removeEventListener('touchstart', resumeAudioContext);
            document.removeEventListener('keydown', resumeAudioContext);
            
            console.log('AudioContext resumed');
        };
        
        document.addEventListener('click', resumeAudioContext);
        document.addEventListener('touchstart', resumeAudioContext);
        document.addEventListener('keydown', resumeAudioContext);
    }
    
    // Try to load each source until one succeeds
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
                // Try to decode the audio
                return audioContext.decodeAudioData(buffer);
            })
            .then(decodedData => {
                console.log('Audio loaded successfully:', source.src);
                loadedAudio = true;
                
                // Store the audio data for later use
                window.preloadedAudioData = {
                    source: source.src,
                    decoded: decodedData
                };
                
                // Dispatch an event that our music player can listen for
                const event = new CustomEvent('audioPreloaded', { 
                    detail: { source: source.src } 
                });
                document.dispatchEvent(event);
            })
            .catch(error => {
                console.warn(`Failed to load audio source (${source.src}):`, error);
                // Try next source
                currentSourceIndex++;
                tryNextSource();
            });
    }
    
    // Start trying to load sources
    tryNextSource();
}
