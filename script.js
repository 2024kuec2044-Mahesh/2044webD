// Navigation and shared functionality
function updateNavigation() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        if (isLoggedIn()) {
            loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            loginBtn.removeEventListener('click', () => openModal('login-modal'));
            loginBtn.addEventListener('click', logout);
        } else {
            loginBtn.innerHTML = '<i class="fas fa-user"></i> Login';
            loginBtn.removeEventListener('click', logout);
            loginBtn.addEventListener('click', () => openModal('login-modal'));
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check login status on page load
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        checkLoginStatus();
    }
    updateNavigation();

    // Smooth scrolling for navigation links
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

    // Simple scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
