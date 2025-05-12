class ParticleSystem {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            count: 50,
            color: '#ffffff',
            minSize: 2,
            maxSize: 5,
            speed: 1,
            opacity: 0.5,
            linked: true,
            linkDistance: 120,
            linkWidth: 1,
            moveDirection: 'random',
            ...options
        };
        
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
        this.containerRect = null;
        
        this.init();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-system';
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        
        this.options.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        
        this.createParticles();
        
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.mouse = { x: null, y: null, radius: 100 };
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
                speedX: (Math.random() - 0.5) * this.options.speed,
                speedY: (Math.random() - 0.5) * this.options.speed,
                opacity: Math.random() * this.options.opacity,
                color: this.getRandomColor(),
                active: true
            });
        }
    }
    
    resizeCanvas() {
        this.containerRect = this.options.container.getBoundingClientRect();
        this.canvas.width = this.containerRect.width;
        this.canvas.height = this.containerRect.height;
        
        if (this.particles.length > 0) {
            this.createParticles();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x > this.canvas.width) {
                p.x = 0;
            } else if (p.x < 0) {
                p.x = this.canvas.width;
            }
            
            if (p.y > this.canvas.height) {
                p.y = 0;
            } else if (p.y < 0) {
                p.y = this.canvas.height;
            }
            
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const pushFactor = 1 - (distance / this.mouse.radius);
                    p.x += dx * pushFactor * 0.02;
                    p.y += dy * pushFactor * 0.02;
                    p.active = true;
                }
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            if (this.options.linked) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.options.linkDistance) {
                        const opacity = 1 - (distance / this.options.linkDistance);
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = this.options.color;
                        this.ctx.lineWidth = this.options.linkWidth;
                        this.ctx.globalAlpha = opacity * 0.5;
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1;
                    }
                }
            }
        }
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    getRandomColor() {
        if (Array.isArray(this.options.color)) {
            return this.options.color[Math.floor(Math.random() * this.options.color.length)];
        }
        
        return this.options.color;
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        new ParticleSystem({
            container: document.querySelector('.hero-section') || document.body,
            count: 30,
            color: ['rgba(255,182,193,0.5)', 'rgba(255,105,180,0.5)', 'rgba(238,130,238,0.5)'],
            minSize: 1,
            maxSize: 3,
            speed: 0.3,
            linkDistance: 150,
            opacity: 0.6
        });
    } else if (currentPage === 'gallery.html') {
        new ParticleSystem({
            container: document.body,
            count: 40,
            color: ['rgba(176,224,230,0.5)', 'rgba(135,206,250,0.5)', 'rgba(100,149,237,0.5)'],
            minSize: 1,
            maxSize: 2,
            speed: 0.2,
            linkDistance: 150,
            opacity: 0.5
        });
    } else if (currentPage === 'dedication.html') {
        new ParticleSystem({
            container: document.body,
            count: 50,
            color: ['rgba(255,215,0,0.3)', 'rgba(255,165,0,0.3)', 'rgba(255,127,80,0.3)'],
            minSize: 1,
            maxSize: 4,
            speed: 0.4,
            linkDistance: 100,
            opacity: 0.4
        });
    }
});
