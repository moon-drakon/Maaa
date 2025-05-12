document.addEventListener('DOMContentLoaded', function() {
    initTypewriterEffect();
});

function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    if (!typewriterElements.length) return;
    
    typewriterElements.forEach((element, index) => {
        const originalText = element.textContent;
        element.setAttribute('data-original-text', originalText);
        
        element.textContent = '';
        
        setTimeout(() => {
            typeText(element, originalText, 0);
        }, index * 1500);
    });
    
    const replayButton = document.createElement('button');
    replayButton.className = 'typewriter-replay-btn';
    replayButton.innerHTML = '<i class="fas fa-redo-alt"></i> Replay Message';
    
    const messageContainer = document.querySelector('.message-container');
    if (messageContainer) {
        messageContainer.appendChild(replayButton);
        
        replayButton.addEventListener('click', () => {
            replayTypewriterEffect();
        });
    }
}

function typeText(element, text, charIndex) {
    if (charIndex >= text.length) {
        return;
    }
    
    element.textContent += text[charIndex];
    
    const speed = Math.random() * 20 + 30;
    
    setTimeout(() => {
        typeText(element, text, charIndex + 1);
    }, speed);
}

function replayTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    const signature = document.querySelector('.signature');
    
    if (signature) signature.style.opacity = '0';
    
    typewriterElements.forEach((element, index) => {
        const originalText = element.getAttribute('data-original-text');
        
        element.textContent = '';
        
        setTimeout(() => {
            typeText(element, originalText, 0);
            
            if (index === typewriterElements.length - 1 && signature) {
                setTimeout(() => {
                    signature.style.opacity = '1';
                    signature.style.transition = 'opacity 1s ease';
                }, originalText.length * 50);
            }
        }, index * 1500);
    });
}
