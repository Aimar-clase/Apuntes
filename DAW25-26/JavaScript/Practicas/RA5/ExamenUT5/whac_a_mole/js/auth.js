/**
 * AUTH.JS
 * 
 * Módulo encargado de la autenticación (Login y Registro).
 * Patrón de Diseño: MODULE (Módulo)
 */

window.App = window.App || {};

window.App.Auth = (function() {
    
    const { $ } = window.App.Utils;
    const Storage = window.App.Storage;

    // Referencias al DOM (privadas)
    // Nota: Las obtenemos dentro de init() o nos aseguramos que el DOM esté cargado,
    // pero como este script corre al final del body (o defer), debería estar bien.
    // Sin embargo, para seguridad, las buscaremos cuando se llame a init.
    let loginForm, registerForm, loginContainer, registerContainer, 
        showRegisterLink, showLoginLink, messageBox;

    let onLoginSuccessCallback = null;

    /**
     * Inicializa el módulo de autenticación.
     */
    function init(onLoginSuccess) {
        // Cachear DOM
        loginForm = $('#login-form');
        registerForm = $('#register-form');
        loginContainer = $('#login-form-container');
        registerContainer = $('#register-form-container');
        showRegisterLink = $('#show-register');
        showLoginLink = $('#show-login');
        messageBox = $('#auth-message');

        onLoginSuccessCallback = onLoginSuccess;
        
        // Eventos
        loginForm.addEventListener('submit', handleLogin);
        registerForm.addEventListener('submit', handleRegister);
        
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms();
        });
        
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms();
        });

        checkInitialState();
    }

    function checkInitialState() {
        if (!Storage.hasUser()) {
            toggleForms(true); 
            showMessage('No hay usuarios registrados. Crea una cuenta.', 'info');
        }
    }

    function toggleForms(forceRegister = false) {
        messageBox.textContent = ''; 
        
        if (forceRegister || loginContainer.classList.contains('hidden')) {
            loginContainer.classList.remove('hidden');
            registerContainer.classList.add('hidden');
        } else {
            loginContainer.classList.add('hidden');
            registerContainer.classList.remove('hidden');
        }

        if (forceRegister) {
            loginContainer.classList.add('hidden');
            registerContainer.classList.remove('hidden');
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        
        const username = $('#login-user').value;
        const password = $('#login-pass').value;
        
        const storedUser = Storage.getUser();
        
        if (!storedUser) {
            showMessage('No existe ningún usuario. Regístrate primero.', 'error');
            return;
        }
        
        if (storedUser.username === username && storedUser.password === password) {
            showMessage('¡Login correcto!', 'success');
            if (onLoginSuccessCallback) onLoginSuccessCallback(username);
        } else {
            showMessage('Usuario o contraseña incorrectos.', 'error');
        }
    }

    function handleRegister(e) {
        e.preventDefault();
        
        const username = $('#reg-user').value;
        const password = $('#reg-pass').value;
        
        if (username.length < 3 || password.length < 3) {
            showMessage('Usuario y contraseña deben tener al menos 3 caracteres.', 'error');
            return;
        }
        
        Storage.saveUser(username, password);
        
        showMessage('Usuario creado con éxito. Ahora inicia sesión.', 'success');
        
        setTimeout(() => {
            toggleForms(); 
            $('#login-user').value = username; 
            $('#login-pass').focus();
        }, 1500);
    }

    function showMessage(text, type = 'info') {
        messageBox.textContent = text;
        messageBox.className = `message ${type}`; 
        
        if (type === 'error') messageBox.style.color = 'var(--danger-color)';
        if (type === 'success') messageBox.style.color = 'var(--success-color)';
    }

    return {
        init
    };

})();
