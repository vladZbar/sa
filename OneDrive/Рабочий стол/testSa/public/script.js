// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const applyBtn = document.getElementById('apply-btn');
const learnMoreBtn = document.getElementById('learn-more-btn');
const ctaApplyBtn = document.getElementById('cta-apply-btn');
const modal = document.getElementById('application-modal');
const modalClose = document.getElementById('modal-close');
const applicationForm = document.getElementById('application-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Modal Functions
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Telegram links are handled by href attributes

// Close modal when close button is clicked
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Application Form Handler
applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = applicationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(applicationForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Reset form
        applicationForm.reset();
        closeModal();
        
    } catch (error) {
        showNotification('Произошла ошибка при отправке заявки. Попробуйте еще раз.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});


// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
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
        z-index: 3000;
        max-width: 400px;
        background: ${type === 'success' ? '#f0fff4' : '#fed7d7'};
        border: 1px solid ${type === 'success' ? '#48bb78' : '#e53e3e'};
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i:first-child {
        color: #48bb78;
        font-size: 1.2rem;
    }
    
    .notification-content span {
        flex: 1;
        color: #2d3748;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    
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
`;
document.head.appendChild(notificationStyles);

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .benefit-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.about-card, .benefit-card, .timeline-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Learn More Button Handler
learnMoreBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const headerOffset = 80;
        const elementPosition = aboutSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#e53e3e';
            isValid = false;
        }
    }
    
    // Phone validation
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.style.borderColor = '#e53e3e';
            isValid = false;
        }
    }
    
    return isValid;
}

// Add validation to forms
if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
        if (!validateForm(applicationForm)) {
            e.preventDefault();
            showNotification('Пожалуйста, заполните все обязательные поля корректно.', 'error');
        }
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else if (counter.textContent.includes('k')) {
                counter.textContent = Math.floor(current) + 'k';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counter animation when stats section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);
