// Creates subtle background effects that don't interfere with content visibility

document.addEventListener('DOMContentLoaded', function() {
    // Initialize background effects
    createSubtleBackground();
});

// Creates a subtle animated background that doesn't interfere with content
function createSubtleBackground() {
    // Check if we're on a page with dedication-page class
    const isDedicationPage = document.body.classList.contains('dedication-page');
    
    // Create background container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'subtle-background';
    document.body.appendChild(backgroundContainer);
    
    // Add different number of elements depending on page
    const elemCount = isDedicationPage ? 12 : 8;
    
    // Create background elements
    for (let i = 0; i < elemCount; i++) {
        createBackgroundElement(backgroundContainer, isDedicationPage);
    }
}

// Creates a single background element
function createBackgroundElement(container, isDedicationPage) {
    const element = document.createElement('div');
    element.className = 'bg-element';
    
    // Set random size - very subtle and small
    const size = Math.random() * 100 + 50;
    
    // Set random position - keep to edges of screen
    let x, y;
    if (Math.random() > 0.5) {
        // Position along edges
        if (Math.random() > 0.5) {
            // Top or bottom
            x = Math.random() * 100;
            y = Math.random() > 0.5 ? -50 : window.innerHeight + 50;
        } else {
            // Left or right
            x = Math.random() > 0.5 ? -50 : window.innerWidth + 50;
            y = Math.random() * 100;
        }
    } else {
        // Random position but away from center content
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        
        // Avoid center area where content is
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const contentWidth = 900;
        const contentHeight = 600;
        
        // If in content area, move to edge
        if (
            x > centerX - contentWidth/2 && 
            x < centerX + contentWidth/2 && 
            y > centerY - contentHeight/2 && 
            y < centerY + contentHeight/2
        ) {
            // Move to one of the corners
            if (Math.random() > 0.5) {
                x = Math.random() > 0.5 ? 0 : window.innerWidth;
            } else {
                y = Math.random() > 0.5 ? 0 : window.innerHeight;
            }
        }
    }
    
    // Apply styles
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    
    // Set appearance based on page type
    if (isDedicationPage) {
        // Subtle warm gradient for dedication page
        element.style.background = `radial-gradient(circle at 30% 30%, 
            rgba(255, 240, 245, 0.05) 0%, 
            rgba(255, 112, 166, 0.07) 50%, 
            rgba(255, 182, 193, 0.03) 100%)`;
    } else {
        // More colorful gradient for other pages
        element.style.background = `radial-gradient(circle at 30% 30%, 
            rgba(255, 112, 166, 0.04) 0%, 
            rgba(147, 112, 219, 0.05) 50%, 
            rgba(173, 216, 230, 0.03) 100%)`;
    }
    
    // Add subtle animation
    const duration = 40 + Math.random() * 40;
    const rotation = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.4;
    element.style.animation = `float-bg ${duration}s infinite linear`;
    element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    element.style.opacity = 0.2 + Math.random() * 0.3; // Very translucent
    
    // Add to container
    container.appendChild(element);
}
