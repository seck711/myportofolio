// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

function setMenuOpen(isOpen) {
    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    navOverlay.setAttribute('aria-hidden', !isOpen);
}

function toggleMenu() {
    setMenuOpen(!navMenu.classList.contains('active'));
}

hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', () => setMenuOpen(false));

navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenuOpen(false);
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1100 && navMenu.classList.contains('active')) {
        setMenuOpen(false);
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
}, { passive: true });

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');

function getNavOffset() {
    return navbar.offsetHeight + 16;
}

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - getNavOffset();
        if (scrollPos >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - getNavOffset(),
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll(
    '.skill-category, .timeline-item, .project-card, .education-card, .contact-item, .stat-item'
);

animateElements.forEach((el, index) => {
    if (!prefersReducedMotion) {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${(index % 4) * 0.08}s`;
        observer.observe(el);
    } else {
        el.classList.add('visible');
    }
});

const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    if (!prefersReducedMotion) {
        aboutContent.classList.add('animate-on-scroll');
        observer.observe(aboutContent);
    } else {
        aboutContent.classList.add('visible');
    }
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.pageYOffset > 400);
}, { passive: true });

// Page load fade-in
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
