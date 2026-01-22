function showLogin() { document.getElementById('login-modal').style.display = 'block'; }
function closeLogin() { document.getElementById('login-modal').style.display = 'none'; }
function showRegister() { document.getElementById('register-modal').style.display = 'block'; }
function closeRegister() { document.getElementById('register-modal').style.display = 'none'; }
function openForgive() { document.getElementById('forgive-modal').style.display = 'block'; }
function closeForgive() { document.getElementById('forgive-modal').style.display = 'none'; }

function login() {
    alert('Login demo - Firebase kurulunca çalışacak');
    closeLogin();
}

function register() {
    alert('Register demo - Firebase kurulunca çalışacak');
    closeRegister();
}

function logout() {
    location.reload();
}