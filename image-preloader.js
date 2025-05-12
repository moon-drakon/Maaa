

document.addEventListener('DOMContentLoaded', () => {
    
    preloadVisibleImages();
    
    
    preloadLinkedPageImages();
});


function preloadVisibleImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.getAttribute('src')) {
            preloadImage(img.getAttribute('src'));
        }
        
        
        if (img.getAttribute('data-src')) {
            preloadImage(img.getAttribute('data-src'));
        }
    });
    
    
    const elementsWithBgImage = document.querySelectorAll('[style*="background-image"]');
    elementsWithBgImage.forEach(el => {
        const style = window.getComputedStyle(el);
        const url = style.backgroundImage.replace(/url\(['"]?([^'")]+)['"]?\)/i, '$1');
        if (url !== 'none') {
            preloadImage(url);
        }
    });
}


function preloadLinkedPageImages() {
    
    const links = document.querySelectorAll('a[href^="index.html"], a[href^="gallery.html"], a[href^="dedication.html"], a[href="./"], a[href="/"]');
    
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        
        for (let i = 1; i <= 10; i++) {
            preloadImage(`images/photo${i}.jpg`, true);
        }
    }
}


function preloadImage(url, lowPriority = false) {
    if (!url) return;
    
    const img = new Image();
    
    if (lowPriority) {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
    } else {
        img.fetchPriority = 'high';
    }
    
    img.src = url;
}
