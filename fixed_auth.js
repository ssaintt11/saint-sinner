// Popup kontrol fonksiyonları
function showLogin() { 
    document.getElementById('login-modal').style.display = 'block'; 
}

function closeLogin() { 
    document.getElementById('login-modal').style.display = 'none'; 
}

function showRegister() { 
    document.getElementById('register-modal').style.display = 'block'; 
}

function closeRegister() { 
    document.getElementById('register-modal').style.display = 'none'; 
}

function openForgive() { 
    document.getElementById('forgive-modal').style.display = 'block'; 
}

function closeForgive() { 
    document.getElementById('forgive-modal').style.display = 'none'; 
}

// Login fonksiyonu
function login() {
    const nickname = document.getElementById('login-nickname').value;
    const password = document.getElementById('login-password').value;
    
    if (!nickname || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Demo: LocalStorage kontrolü
    const storedUser = localStorage.getItem('saint_sinner_user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.nickname === nickname && user.password === password) {
            localStorage.setItem('saint_sinner_session', JSON.stringify({nickname: nickname, loggedIn: true}));
            alert('Welcome back, ' + nickname + '!');
            closeLogin();
            updateUIForLoggedInUser(nickname);
        } else {
            alert('Invalid nickname or password');
        }
    } else {
        alert('No user found. Please register first.');
    }
}

// Register fonksiyonu
function register() {
    const nickname = document.getElementById('reg-nickname').value;
    const password = document.getElementById('reg-password').value;
    
    if (!nickname || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (nickname.length < 3) {
        alert('Nickname must be at least 3 characters');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Kullanıcıyı kaydet
    const user = {
        nickname: nickname,
        password: password,
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('saint_sinner_user', JSON.stringify(user));
    localStorage.setItem('saint_sinner_session', JSON.stringify({nickname: nickname, loggedIn: true}));
    
    alert('Registration successful! Welcome, ' + nickname + '!');
    closeRegister();
    updateUIForLoggedInUser(nickname);
}

// Logout fonksiyonu
function logout() {
    localStorage.removeItem('saint_sinner_session');
    alert('You have been logged out');
    location.reload();
}

// UI güncelleme fonksiyonu
function updateUIForLoggedInUser(nickname) {
    // Login/Register butonlarını gizle, logout butonu göster
    const topButtons = document.querySelector('.top-buttons');
    if (topButtons) {
        topButtons.innerHTML = `
            <span style="color: #8B0000; font-size: 24px; margin-right: 15px;">Welcome, ${nickname}</span>
            <button onclick="logout()" style="font-size: 24px;">Logout</button>
        `;
    }
}

// Sayfa yüklendiğinde giriş durumunu kontrol et
window.onload = function() {
    const session = localStorage.getItem('saint_sinner_session');
    if (session) {
        const userSession = JSON.parse(session);
        if (userSession.loggedIn) {
            updateUIForLoggedInUser(userSession.nickname);
        }
    }
}

// Popup dışına tıklayınca kapat
window.onclick = function(event) {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const forgiveModal = document.getElementById('forgive-modal');
    
    if (event.target === loginModal) {
        closeLogin();
    }
    if (event.target === registerModal) {
        closeRegister();
    }
    if (event.target === forgiveModal) {
        closeForgive();
    }
}
