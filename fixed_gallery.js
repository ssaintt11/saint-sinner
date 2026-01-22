// Gerçek içerik gösterme fonksiyonları
window.onload = function() {
    const grid = document.getElementById('content-grid');
    
    // Eğer content-grid elementi varsa, içerik göster
    if (grid) {
        // Demo içerik - gerçek verilerle değiştirilebilir
        const posts = [
            {
                title: "The First Sin",
                content: "In the beginning, there was darkness... and then came the first sin.",
                date: "2026-01-20",
                author: "Saint"
            },
            {
                title: "Redemption Path",
                content: "Not all who wander are lost, but those who sin must seek redemption.",
                date: "2026-01-19",
                author: "sinneR"
            },
            {
                title: "The Confession",
                content: "Speak your truth, for only through confession can one find peace... or damnation.",
                date: "2026-01-18",
                author: "Anonymous"
            }
        ];
        
        let postsHTML = '';
        
        posts.forEach(post => {
            postsHTML += `
                <div class="post-card">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-meta">By ${post.author} on ${post.date}</p>
                    <p class="post-content">${post.content}</p>
                </div>
            `;
        });
        
        grid.innerHTML = `
            <div class="content-wrapper">
                <h2 class="section-title">Latest Confessions</h2>
                <div class="posts-container">
                    ${postsHTML}
                </div>
            </div>
        `;
        
        // CSS stilleri ekle
        addGalleryStyles();
    }
}

function addGalleryStyles() {
    // Eğer stiller daha önce eklenmemişse ekle
    if (!document.getElementById('gallery-styles')) {
        const style = document.createElement('style');
        style.id = 'gallery-styles';
        style.textContent = `
            .content-wrapper {
                max-width: 1200px;
                margin: 0 auto;
                padding: 40px 20px;
            }
            
            .section-title {
                font-family: 'Creepster', cursive;
                font-size: 48px;
                color: #8B0000;
                text-align: center;
                margin-bottom: 50px;
                text-shadow: 0 0 20px #8B0000;
            }
            
            .posts-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
            }
            
            .post-card {
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid #333;
                padding: 30px;
                transition: all 0.3s ease;
            }
            
            .post-card:hover {
                border-color: #8B0000;
                box-shadow: 0 0 30px rgba(139, 0, 0, 0.3);
                transform: translateY(-5px);
            }
            
            .post-title {
                font-family: 'Creepster', cursive;
                font-size: 32px;
                color: #8B0000;
                margin-bottom: 10px;
            }
            
            .post-meta {
                font-size: 16px;
                color: #666;
                margin-bottom: 20px;
                font-style: italic;
            }
            
            .post-content {
                font-size: 20px;
                line-height: 1.6;
                color: #ccc;
            }
            
            @media (max-width: 768px) {
                .section-title {
                    font-size: 36px;
                }
                
                .posts-container {
                    grid-template-columns: 1fr;
                }
                
                .post-title {
                    font-size: 24px;
                }
                
                .post-content {
                    font-size: 18px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Yeni post ekleme fonksiyonu (ileride kullanılabilir)
function addPost(title, content, author) {
    const posts = JSON.parse(localStorage.getItem('saint_sinner_posts') || '[]');
    
    const newPost = {
        title: title,
        content: content,
        author: author,
        date: new Date().toISOString().split('T')[0],
        id: Date.now()
    };
    
    posts.unshift(newPost); // Yeni postu başa ekle
    localStorage.setItem('saint_sinner_posts', JSON.stringify(posts));
    
    // Sayfayı yeniden yükle
    window.location.reload();
}

// Tüm postları getirme fonksiyonu
function getAllPosts() {
    return JSON.parse(localStorage.getItem('saint_sinner_posts') || '[]');
}
