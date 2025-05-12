
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music autoplay notice disabled by user request');
    if (!document.getElementById('music-notice-keyframes')) {
        const style = document.createElement('style');
        style.id = 'music-notice-keyframes';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
        `;
        document.head.appendChild(style);
    }
});
