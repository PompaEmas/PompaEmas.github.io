// Mobile Menu Toggle
const mobileMenu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.navbar__links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Burger Animation
    mobileMenu.classList.toggle('is-active');
});

// Add active class style for mobile via JS
const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 768px) {
        .navbar__links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: white;
            padding: 2rem;
            box-shadow: 0 10px 10px rgba(0,0,0,0.1);
        }
        .navbar__links.active li {
            margin: 1rem 0;
        }
        .navbar__toggle.is-active .bar:nth-child(2) { opacity: 0; }
        .navbar__toggle.is-active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .navbar__toggle.is-active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
    }
`;
document.head.appendChild(style);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.querySelectorAll('.project-card, .achievement-item, .section__header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.padding = '0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});