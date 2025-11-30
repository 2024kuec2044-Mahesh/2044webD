// Login functionality
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
    window.location.href = 'login.html';
}

function checkLoginStatus() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Event listeners for login page
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            if (login(email, password)) {
                if (errorMessage) errorMessage.textContent = '';
                window.location.href = 'index.html';
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
