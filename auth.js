// Global auth durumunu yönet
async function updateAuthUI() {
    const { data: { user } } = await window.supabase.auth.getUser();
    
    // Header auth buttonları güncelle
    const authButtons = document.getElementById('auth-buttons');
    const adminLink = document.getElementById('admin-link');
    const sidebarProfile = document.getElementById('sidebar-profile');
    const sidebarGuest = document.getElementById('sidebar-guest');
    
    if (user) {
        // Kullanıcı giriş yapmış
        if (authButtons) {
            authButtons.innerHTML = `
                <button onclick="location.href='profile.html'" class="btn-outline">Profile</button>
                <button onclick="logout()" class="btn-primary">Logout</button>
            `;
        }
        
        if (adminLink) adminLink.style.display = 'inline-block';
        
        if (sidebarProfile && sidebarGuest) {
            sidebarProfile.style.display = 'block';
            sidebarGuest.style.display = 'none';
            
            // Profil bilgilerini çek
            const { data: profile } = await window.supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
            if (profile) {
                const avatarEl = document.getElementById('sidebar-avatar');
                const usernameEl = document.getElementById('sidebar-username');
                const titleEl = document.getElementById('sidebar-title');
                
                if (avatarEl) avatarEl.src = profile.avatar_url || 'https://placehold.co/80x80/1A1A1A/8B0000?text=?';
                if (usernameEl) usernameEl.textContent = profile.username;
                if (titleEl) titleEl.textContent = profile.title || '!000';
            }
        }
    } else {
        // Giriş yapılmamış
        if (authButtons) {
            authButtons.innerHTML = `
                <button onclick="location.href='login.html'" class="btn-outline">Login</button>
                <button onclick="location.href='register.html'" class="btn-primary">Register</button>
            `;
        }
        
        if (adminLink) adminLink.style.display = 'none';
        
        if (sidebarProfile && sidebarGuest) {
            sidebarProfile.style.display = 'none';
            sidebarGuest.style.display = 'block';
        }
    }
}

async function logout() {
    await window.supabase.auth.signOut();
    window.location.href = 'index.html';
}

// Sayfa yüklendiğinde çalıştır (eğer supabase yüklüyse)
if (typeof window.supabase !== 'undefined') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
}