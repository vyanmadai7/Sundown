document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNavigation();
    initHeroAnimations();
    initPortfolioFilters();
    initProjectHover();
    initSwiper();
    initStatsCounter();
    initBackToTop();
    initNewsletterForm();
    setProjectBackgrounds();
});

function initLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 2500);
}

function initCursor() {
    const cursor = document.getElementById('cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });

    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .elem, .service-card');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        elem.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            nav.style.background = 'rgba(0,0,0,0.95)';
        } else {
            nav.style.background = 'rgba(0,0,0,0.3)';
        }
    });
}

function initHeroAnimations() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('#hero-shape > div');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.elem');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.6s ease forwards';
                    }, index * 50);
                } else {
                    item.style.animation = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });
}

function initProjectHover() {
    const fixedImage = document.getElementById('fixed-image');
    const elems = document.querySelectorAll('.elem');

    elems.forEach(elem => {
        elem.addEventListener('mouseenter', function (e) {
            const imageUrl = this.getAttribute('data-image');
            fixedImage.style.backgroundImage = `url(${imageUrl})`;
            fixedImage.style.opacity = '1';
        });

        elem.addEventListener('mousemove', function (e) {
            fixedImage.style.left = `${e.clientX}px`;
            fixedImage.style.top = `${e.clientY}px`;
        });

        elem.addEventListener('mouseleave', function () {
            fixedImage.style.opacity = '0';
        });
    });
}

function setProjectBackgrounds() {
    const elems = document.querySelectorAll('.elem');
    elems.forEach(elem => {
        const imageUrl = elem.getAttribute('data-image');
        elem.style.backgroundImage = `url(${imageUrl})`;
    });
}

function initSwiper() {
    new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.background = '#4CAF50';
            form.reset();
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        });
    }
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gooey = document.getElementById('gooey');
    if (gooey) {
        gooey.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .elem, .testimonial-card').forEach(el => {
    observer.observe(el);
});

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('#footer-bottom p');
if (footerYear && footerYear.textContent.includes('2024')) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

const movingText = document.getElementById('moving-text');
if (movingText) {
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    textObserver.observe(movingText);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScrollHandler = debounce(() => {
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);