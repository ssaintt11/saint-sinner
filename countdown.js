const overlay = document.getElementById('countdown-overlay');
const text = overlay.querySelector('.countdown-text');

// EKRAN KARARTMA EFEKTİ
function blackout() {
    document.body.style.background = '#000';
    overlay.style.opacity = '0';
    text.style.opacity = '0';
}

// IŞIK YANMA EFEKTİ
function lightOn() {
    document.body.style.background = 'url(ravenn.png) center/cover no-repeat fixed';
    overlay.style.opacity = '1';
    text.style.opacity = '1';
}

// LOOP SENARYOSU
function countdownLoop() {
    // 1. Yazı yanıp sön (2 kez)
    text.style.animation = 'flicker .3s 2';
    
    setTimeout(() => {
        // 2. Işık açılır
        lightOn();
        text.style.animation = 'flicker 1.2s infinite';
        
        // 3. 3 saniye sonra tekrar kapanır
        setTimeout(() => {
            blackout();
            
            // 4. 2 saniye bekleyip loop başa döner
            setTimeout(countdownLoop, 2000);
        }, 3000);
    }, 600);
}

// Sayfa yüklendiğinde başlat
window.addEventListener('load', () => {
    setTimeout(countdownLoop, 1000);
});