// AUTHENTICATION CONTROLLER - SAINT SINNER HOSTING
import { supabase } from './supabase.js';

// Header butonlarını güncelle (Login/Register veya Profile/Logout)
async function updateHeaderButtons() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        const topButtons = document.querySelector('.top-buttons');
        
        if (!topButtons) return;
        
        if (user) {
            // Giriş yapılmışsa
            topButtons.innerHTML = `
                <button class="backrooms-btn" onclick="location.href='profile.html'">Profile</button>
                <button class="backrooms-btn" onclick="logout()">Logout</button>
            `;
        } else {
            // Giriş yapılmamışsa
            topButtons.innerHTML = `
                <button class="backrooms-btn" onclick="location.href='login.html'">Login</button>
                <button class="backrooms-btn" onclick="location.href='register.html'">Register</button>
            `;
        }
    } catch (error) {
        console.error('Header update error:', error);
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', updateHeaderButtons);

// Logout fonksiyonu
async function logout() {
    try {
        await supabase.auth.signOut();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Global fonksiyon
window.logout = logout;