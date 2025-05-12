document.addEventListener('DOMContentLoaded', () => {
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }, 300);
    }

    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname || link.hostname === '') {
            link.addEventListener('click', function(e) {
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;
                
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) return;
                
                e.preventDefault();
                const destination = this.href;
                
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = destination;
                }, 300);
            });
        }
    });
    
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
    
    window.addEventListener('load', preloadImages);
});
