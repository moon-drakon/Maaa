// image-preloader.js - Preloads images for faster page transitions

document.addEventListener('DOMContentLoaded', () => {
    // Preload images on current page
    preloadVisibleImages();
    
    // Preload images from other pages
    preloadLinkedPageImages();
});

// Preload all images on the current page
function preloadVisibleImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.getAttribute('src')) {
            preloadImage(img.getAttribute('src'));
        }
        
        // Also check for lazy-loaded images
        if (img.getAttribute('data-src')) {
            preloadImage(img.getAttribute('data-src'));
        }
    });
    
    // Check for background images
    const elementsWithBgImage = document.querySelectorAll('[style*="background-image"]');
    elementsWithBgImage.forEach(el => {
        const style = window.getComputedStyle(el);
        const url = style.backgroundImage.replace(/url\(['"]?([^'")]+)['"]?\)/i, '$1');
        if (url !== 'none') {
            preloadImage(url);
        }
    });
}

// Preload images from linked pages
function preloadLinkedPageImages() {
    // Get all links within the site
    const links = document.querySelectorAll('a[href^="index.html"], a[href^="gallery.html"], a[href^="dedication.html"], a[href="./"], a[href="/"]');
    
    // For gallery page, preload all gallery images with low priority
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        // When on home page, preload gallery images with low priority
        for (let i = 1; i <= 10; i++) {
            preloadImage(`images/photo${i}.jpg`, true);
        }
    }
}

// Preload a single image with option for low priority
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
