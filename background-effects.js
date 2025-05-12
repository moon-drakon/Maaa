document.addEventListener('DOMContentLoaded', function() {
    createSubtleBackground();
});

function createSubtleBackground() {
    const isDedicationPage = document.body.classList.contains('dedication-page');
    
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'subtle-background';
    document.body.appendChild(backgroundContainer);
    
    const elemCount = isDedicationPage ? 12 : 8;
    
    for (let i = 0; i < elemCount; i++) {
        createBackgroundElement(backgroundContainer, isDedicationPage);
    }
}

function createBackgroundElement(container, isDedicationPage) {
    const element = document.createElement('div');
    element.className = 'bg-element';
    
    const size = Math.random() * 100 + 50;
    
    let x, y;
    if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
            x = Math.random() * 100;
            y = Math.random() > 0.5 ? -50 : window.innerHeight + 50;
        } else {
            x = Math.random() > 0.5 ? -50 : window.innerWidth + 50;
            y = Math.random() * 100;
        }
    } else {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const contentWidth = 900;
        const contentHeight = 600;
        
        if (
            x > centerX - contentWidth/2 && 
            x < centerX + contentWidth/2 && 
            y > centerY - contentHeight/2 && 
            y < centerY + contentHeight/2
        ) {
            if (Math.random() > 0.5) {
                x = Math.random() > 0.5 ? 0 : window.innerWidth;
            } else {
                y = Math.random() > 0.5 ? 0 : window.innerHeight;
            }
        }
    }
    
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    
    if (isDedicationPage) {
        element.style.background = `radial-gradient(circle at 30% 30%, 
            rgba(255, 240, 245, 0.05) 0%, 
            rgba(255, 112, 166, 0.07) 50%, 
            rgba(255, 182, 193, 0.03) 100%)`;
    } else {
        element.style.background = `radial-gradient(circle at 30% 30%, 
            rgba(255, 112, 166, 0.04) 0%, 
            rgba(147, 112, 219, 0.05) 50%, 
            rgba(173, 216, 230, 0.03) 100%)`;
    }
    
    const duration = 40 + Math.random() * 40;
    const rotation = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.4;
    element.style.animation = `float-bg ${duration}s infinite linear`;
    element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    element.style.opacity = 0.2 + Math.random() * 0.3;
    
    container.appendChild(element);
}
