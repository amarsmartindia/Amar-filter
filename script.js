// Amin Deoghar Website - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLanguageToggle();
    initScrollToTop();
    initSmoothScrolling();
    initGallery();
    initAnimations();
    initContactForm();
    initFloatingContact();
    initNavbarScroll();
});

// Language Toggle Functionality
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('language') || 'hi';
    
    // Set initial language
    setLanguage(currentLang);
    updateToggleButton(currentLang);
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'hi' ? 'en' : 'hi';
        setLanguage(currentLang);
        updateToggleButton(currentLang);
        localStorage.setItem('language', currentLang);
    });
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-hi][data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    const titleText = lang === 'hi' ? 'Amin Deoghar - अमीन देवघर' : 'Amin Deoghar';
    document.title = titleText;
}

function updateToggleButton(lang) {
    const langToggle = document.getElementById('langToggle');
    const buttonText = lang === 'hi' ? 'EN' : 'हि';
    langToggle.innerHTML = `<i class="fas fa-language"></i> ${buttonText}`;
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Gallery Lightbox Initialization
function initGallery() {
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        plyr: {
            config: {
                ratio: '16:9',
                youtube: {
                    noCookie: true,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3
                },
                vimeo: {
                    byline: false,
                    portrait: false,
                    title: false,
                    speed: true,
                    transparent: false
                }
            }
        }
    });
}

// Initialize AOS (Animate on Scroll)
function initAnimations() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('कृपया वैध ईमेल पता दर्ज करें / Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> भेजा जा रहा है... / Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('आपका संदेश सफलतापूर्वक भेज दिया गया है! / Your message has been sent successfully!', 'success');
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d1edff' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        border: 1px solid ${type === 'success' ? '#0d6efd' : type === 'error' ? '#dc3545' : '#bee5eb'};
        color: ${type === 'success' ? '#0d6efd' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        max-width: 400px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Floating Contact Box
function initFloatingContact() {
    const floatingContact = document.querySelector('.floating-contact');
    const floatingToggle = document.querySelector('.floating-contact-toggle');
    const floatingContent = document.querySelector('.floating-contact-content');
    
    if (floatingContact) {
        let isOpen = false;
        
        floatingToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            isOpen = !isOpen;
            
            if (isOpen) {
                floatingContent.style.opacity = '1';
                floatingContent.style.visibility = 'visible';
                floatingContent.style.transform = 'translateY(0)';
            } else {
                floatingContent.style.opacity = '0';
                floatingContent.style.visibility = 'hidden';
                floatingContent.style.transform = 'translateY(10px)';
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!floatingContact.contains(e.target) && isOpen) {
                isOpen = false;
                floatingContent.style.opacity = '0';
                floatingContent.style.visibility = 'hidden';
                floatingContent.style.transform = 'translateY(10px)';
            }
        });
        
        // Track contact clicks
        const contactItems = document.querySelectorAll('.floating-contact-item');
        contactItems.forEach(item => {
            item.addEventListener('click', function() {
                const type = this.classList.contains('whatsapp') ? 'WhatsApp' : 'Phone';
                console.log(`Contact clicked: ${type}`);
                
                // You can add analytics tracking here
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_click', {
                        'contact_type': type
                    });
                }
            });
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link highlighting
updateActiveNavLink();

// Service Card Interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize service cards
initServiceCards();

// Loading Animation
function initLoadingAnimation() {
    const elements = document.querySelectorAll('section');
    
    elements.forEach(element => {
        element.classList.add('loading');
    });
    
    window.addEventListener('load', function() {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 100);
        });
    });
}

// Initialize loading animation
initLoadingAnimation();

// Parallax Effect for Hero Section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Initialize parallax (optional - can be resource intensive)
// initParallax();

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Press 'L' to toggle language
    if (e.key === 'l' || e.key === 'L') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('langToggle').click();
        }
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('scrollToTop').click();
        }
    }
    
    // Press 'C' to toggle contact box
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            document.querySelector('.floating-contact-toggle').click();
        }
    }
});

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize image optimization
optimizeImages();

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .navbar-nav .nav-link.active {
        color: #ffc107 !important;
        font-weight: 600;
    }
    
    .navbar-nav .nav-link.active::after {
        width: 100%;
    }
    
    img.loaded {
        opacity: 1;
        transform: scale(1);
        transition: all 0.3s ease;
    }
    
    img:not(.loaded) {
        opacity: 0;
        transform: scale(0.8);
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log(`
🌟 Welcome to Amin Deoghar Website
🚀 Developed by Vigyapan.online
📱 Contact: +91 99390 54883
💬 WhatsApp: +91 62051 26106
🌐 Website: https://vigyapan.online

Keyboard Shortcuts:
- Press 'L' to toggle language
- Press 'T' to scroll to top  
- Press 'C' to toggle contact box
`);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Analytics (if Google Analytics is loaded)
if (typeof gtag !== 'undefined') {
    // Track page view
    gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    // Track language changes
    document.getElementById('langToggle').addEventListener('click', function() {
        gtag('event', 'language_toggle', {
            'language': localStorage.getItem('language') === 'hi' ? 'en' : 'hi'
        });
    });
}