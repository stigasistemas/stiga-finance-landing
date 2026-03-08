// ================================================================
// STIGA FINANCE - LANDING PAGE ULTRA PROFISSIONAL
// JavaScript com animações e efeitos avançados
// ================================================================

console.log('🚀 Landing Page Stiga Finance carregando...');

// ================================================================
// PARTICLES.JS CONFIGURATION
// ================================================================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#D4AF37'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#D4AF37',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ================================================================
// CURSOR CUSTOMIZADO
// ================================================================
let cursor = null;
let cursorFollower = null;

function initCustomCursor() {
    cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s;
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.5;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 5 + 'px';
        cursor.style.top = e.clientY - 5 + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 20 + 'px';
            cursorFollower.style.top = e.clientY - 20 + 'px';
        }, 100);
    });
    
    document.querySelectorAll('a, button, .card-hover, .card-3d').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Iniciar cursor apenas em desktop
if (window.innerWidth > 768) {
    initCustomCursor();
}

// ================================================================
// SMOOTH SCROLL
// ================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================================================
// NAVBAR SCROLL EFFECT
// ================================================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================================================================
// SCROLL TO TOP BUTTON
// ================================================================
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================================================
// ANIMATE ON SCROLL
// ================================================================
const observerOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
        // Fallback duplo: forçar visibilidade se observer falhar
        setTimeout(() => {
            if (!el.classList.contains('animated')) {
                el.classList.add('animated');
            }
        }, 600);
    });
    // Garantia extra: mostrar TUDO após 1.5s independente do estado
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animated');
        });
    }, 1500);
}

// Rodar quando DOM estiver pronto (qualquer método que funcionar primeiro)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    // DOM já está pronto
    initAnimations();
}

// ================================================================
// COUNTER ANIMATION
// ================================================================
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    const targetElement = counter.querySelector('[data-target]') || counter;
    if (targetElement.dataset.target) {
        counterObserver.observe(counter);
    }
});

// ================================================================
// FAQ ACCORDION
// ================================================================
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// ================================================================
// VIDEO PLAYER
// ================================================================
function loadVideo() {
    const placeholder = document.getElementById('videoPlaceholder');
    const video = document.getElementById('vslVideo');
    
    if (video) {
        placeholder.style.display = 'none';
        video.style.display = 'block';
        if (video.src.includes('youtube') || video.src.includes('vimeo')) {
            video.src = video.src + (video.src.includes('?') ? '&' : '?') + 'autoplay=1';
        }
    } else {
        placeholder.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-video" style="font-size: 3rem; color: var(--gold); margin-bottom: 20px;"></i>
                <p style="color: var(--text-muted);">Configure seu vídeo VSL editando o HTML!</p>
            </div>
        `;
    }
}

const videoPlaceholder = document.getElementById('videoPlaceholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', loadVideo);
}

// ================================================================
// MOBILE MENU TOGGLE
// ================================================================
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mobileBtn.classList.remove('active');
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(10, 14, 23, 0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.gap = '20px';
        navLinks.style.borderTop = '1px solid rgba(212, 175, 55, 0.2)';
        mobileBtn.classList.add('active');
    }
}

// ================================================================
// 3D CARD TILT EFFECT
// ================================================================
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            scale(1.02)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ================================================================
// FADE IN ANIMATION FOR LIST ITEMS
// ================================================================
const listObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            listObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    listObserver.observe(item);
});

// ================================================================
// PARALLAX SCROLL EFFECT
// ================================================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroContent && heroVideo) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroVideo.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    document.querySelectorAll('.floating').forEach(el => {
        const rect = el.getBoundingClientRect();
        const scrollPercent = rect.top / window.innerHeight;
        el.style.transform = `translateY(${scrollPercent * 30}px)`;
    });
});

// ================================================================
// LOADING ANIMATION
// ================================================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('✅ Landing Page Stiga Finance carregada com sucesso!');
    console.log('🎨 Particles.js ativado');
    console.log('🖱️ Cursor customizado ativado');
});

// ================================================================
// PRELOAD IMAGES
// ================================================================
function preloadImages() {
    const images = [
        'logo-stiga.png',
        'stiga-dashboard-complete.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

console.log('✅ Todos os scripts carregados!');
console.log('💎 Versão: Ultra Profissional COMPLETA');

// ================================================================
// VIDEO TESTIMONIALS
// ================================================================
function playTestimonial(element, videoUrl) {
    const card = element.closest('.video-testimonial-card');
    const wrapper = card.querySelector('.video-wrapper-testimonial');
    
    // Se não tiver URL configurada, mostrar alerta
    if (!videoUrl || videoUrl.includes('VIDEO_URL')) {
        alert('⚠️ Configure a URL do vídeo no HTML!\n\nProcure por "VIDEO_URL_X" e substitua pela URL real do YouTube/Vimeo.');
        return;
    }
    
    // Criar iframe do vídeo
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl + (videoUrl.includes('?') ? '&' : '?') + 'autoplay=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;';
    
    // Criar botão fechar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-video';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.onclick = () => closeTestimonial(card);
    
    // Adicionar classe playing
    card.classList.add('playing');
    
    // Limpar wrapper e adicionar iframe
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    document.body.appendChild(closeBtn);
    
    // Impedir scroll do body
    document.body.style.overflow = 'hidden';
}

function closeTestimonial(card) {
    card.classList.remove('playing');
    
    // Remover botão fechar
    const closeBtn = document.querySelector('.close-video');
    if (closeBtn) closeBtn.remove();
    
    // Restaurar thumbnail
    const wrapper = card.querySelector('.video-wrapper-testimonial');
    const thumbnailData = card.dataset.thumbnail || 'https://i.pravatar.cc/400?img=5';
    const duration = card.dataset.duration || '2:00';
    
    wrapper.innerHTML = `
        <div class="video-thumbnail" onclick="playTestimonial(this, '${card.dataset.videoUrl}')">
            <img src="${thumbnailData}" alt="Depoimento">
            <div class="play-overlay">
                <div class="play-button-testimonial">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-duration">${duration}</div>
            </div>
        </div>
    `;
    
    // Restaurar scroll do body
    document.body.style.overflow = '';
}

// Fechar vídeo ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const playingCard = document.querySelector('.video-testimonial-card.playing');
        if (playingCard) closeTestimonial(playingCard);
    }
});

console.log('✅ Sistema de vídeo testimonials carregado');

// ================================================================
// TESTIMONIALS CAROUSEL NAVIGATION
// ================================================================
// Calcula largura de um card + gap
function _carouselCardWidth(carousel) {
    const card = carousel.querySelector('.testimonial-card');
    const gap = window.innerWidth <= 768 ? 12 : 24;
    return card ? card.offsetWidth + gap : 364;
}

// Snap suave ao card mais próximo
function _snapCarousel(carousel) {
    const cw = _carouselCardWidth(carousel);
    const maxIdx = carousel.querySelectorAll('.testimonial-card').length - 1;
    const idx = Math.round(carousel.scrollLeft / cw);
    carousel.scrollTo({ left: Math.max(0, Math.min(idx, maxIdx)) * cw, behavior: 'smooth' });
}

function scrollTestimonials(direction) {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    const cw = _carouselCardWidth(carousel);
    const maxIdx = carousel.querySelectorAll('.testimonial-card').length - 1;
    const cur = Math.round(carousel.scrollLeft / cw);
    const next = Math.max(0, Math.min(direction === 'left' ? cur - 1 : cur + 1, maxIdx));
    carousel.scrollTo({ left: next * cw, behavior: 'smooth' });
}

// Drag mouse (desktop) + touch (mobile) com snap ao soltar
(function () {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    carousel.style.cursor = 'grab';

    // ---- MOUSE DRAG ----
    let isDown = false, startX = 0, scrollStart = 0, dragged = false;

    carousel.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDown = true;
        dragged = false;
        startX = e.clientX;
        scrollStart = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
        carousel.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const dx = startX - e.clientX;
        if (Math.abs(dx) > 5) dragged = true;
        carousel.scrollLeft = scrollStart + dx;
    });

    document.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        carousel.style.cursor = 'grab';
        carousel.style.userSelect = '';
        if (dragged) _snapCarousel(carousel);
    });

    // Evitar click em links após drag
    carousel.addEventListener('click', (e) => {
        if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
    }, true);

    // ---- TOUCH SWIPE ----
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            scrollTestimonials(diff > 0 ? 'right' : 'left');
        } else {
            _snapCarousel(carousel);
        }
    }, { passive: true });
})();

console.log('✅ Carousel de depoimentos horizontal carregado');

// ================================================================
// CONTADOR REGRESSIVO + VAGAS
// ================================================================
function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;
    let expiry = localStorage.getItem('stigaOfferExpiry');
    if (!expiry || parseInt(expiry) < Date.now()) {
        expiry = Date.now() + (23 * 60 * 60 * 1000) + (Math.random() * 3600000);
        localStorage.setItem('stigaOfferExpiry', expiry);
    }
    function tick() {
        const rem = parseInt(expiry) - Date.now();
        if (rem <= 0) {
            expiry = Date.now() + (23 * 60 * 60 * 1000);
            localStorage.setItem('stigaOfferExpiry', expiry);
            return;
        }
        const h = Math.floor(rem / 3600000).toString().padStart(2, '0');
        const m = Math.floor((rem % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((rem % 60000) / 1000).toString().padStart(2, '0');
        el.textContent = h + ':' + m + ':' + s;
    }
    tick();
    setInterval(tick, 1000);
}
function initVagas() {
    const el = document.getElementById('vagas-count');
    if (!el) return;
    let v = sessionStorage.getItem('stigaVagas');
    if (!v) { v = Math.floor(Math.random() * 14) + 17; sessionStorage.setItem('stigaVagas', v); }
    el.textContent = v;
}
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initVagas();
});
