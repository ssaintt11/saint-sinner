// AUTHENTICATION CONTROLLER - SAINT SINNER

// Header butonlarını güncelle (Login/Register veya Profile/Logout)
async function updateHeaderButtons() {
    try {
        const { data: { user } } = await window.supabase.auth.getUser();
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
        await window.supabase.auth.signOut();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Global fonksiyon
window.logout = logout;

// Admin kontrolü
async function checkAdmin() {
    try {
        const { data: { user } } = await window.supabase.auth.getUser();
        if (!user) {
            window.location.href = 'login.html';
            return false;
        }
        
        // Admin kontrolü - belirli kullanıcı ID'leri admin olarak kabul edilir
        // Burada kendi kullanıcı ID'nizi ekleyin
        const adminIds = ['admin-user-id-here']; // Kendi user ID'nizi ekleyin
        
        if (adminIds.includes(user.id)) {
            return true;
        }
        
        // Alternatif: profiles tablosunda is_admin kontrolü
        const { data: profile } = await window.supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();
            
        return profile?.is_admin === true;
    } catch (error) {
        console.error('Admin check error:', error);
        return false;
    }
}

window.checkAdmin = checkAdmin;
