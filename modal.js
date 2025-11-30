// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Login functionality for modal
const VALID_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'password'
};

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function login(email, password) {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function checkLoginStatus() {
    if (!isLoggedIn()) {
        // Do nothing, stay on page
    }
}

// Event listeners for modals
document.addEventListener('DOMContentLoaded', function() {
    // Login modal (for index.html)
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && !isLoggedIn()) {
        loginBtn.addEventListener('click', () => openModal('login-modal'));
    }

    const loginClose = document.getElementById('login-close');
    if (loginClose) {
        loginClose.addEventListener('click', () => closeModal('login-modal'));
    }

    // Cart modal
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            renderCart();
            openModal('cart-modal');
        });
    }

    const cartClose = document.getElementById('cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', () => closeModal('cart-modal'));
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Modal login form submission
    const modalLoginForm = document.getElementById('modal-login-form');
    if (modalLoginForm) {
        modalLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('modal-email').value;
            const password = document.getElementById('modal-password').value;
            const errorMessage = document.getElementById('modal-error-message');

            if (login(email, password)) {
                if (errorMessage) errorMessage.textContent = '';
                closeModal('login-modal');
                updateNavigation();
                this.reset();
            } else {
                if (errorMessage) {
                    errorMessage.textContent = 'Invalid email or password.';
                } else {
                    alert('Invalid email or password.');
                }
            }
        });
    }
});
