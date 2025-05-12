// page-transitions.js - Provides smooth transitions between pages

document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page load
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500); // match the transition duration
        }, 300); // small delay to ensure content is ready
    }

    // Handle page transitions - fade out before navigating
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links (not external websites)
        if (link.hostname === window.location.hostname || link.hostname === '') {
            link.addEventListener('click', function(e) {
                // Don't handle if it's a new tab, download link, etc.
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;
                
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) return; // Don't handle for anchor links
                
                e.preventDefault(); // Prevent default navigation
                const destination = this.href;
                
                // Fade out current page
                document.body.classList.add('fade-out');
                
                // Navigate to new page after fade out completes
                setTimeout(() => {
                    window.location.href = destination;
                }, 300); // match body transition duration
            });
        }
    });
    
    // Preload images to make transitions smoother
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    // Preload images in the background
    window.addEventListener('load', preloadImages);
});