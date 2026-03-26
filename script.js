// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 获取元素
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const workCards = document.querySelectorAll('.work-card');
    const otherCards = document.querySelectorAll('.other-card');
    
    // 汉堡菜单切换（部分内页无此元素，需判断是否存在）
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    
        // 点击导航链接时关闭移动端菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    
        // 点击页面其他地方关闭移动端菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    
    // 作品卡片点击事件
    workCards.forEach(card => {
        // 使卡片可聚焦，便于键盘访问
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'link');
        const link = card.querySelector('.work-title a');

        const navigate = () => {
            if (link && link.getAttribute('href')) {
                window.location.href = link.getAttribute('href');
            }
        };

        card.addEventListener('click', navigate);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate();
            }
        });
    });
    
    // 其他作品卡片点击事件
    otherCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.other-title').textContent;
            console.log('点击了其他项目:', projectTitle);
            
            // 临时显示提示信息
            showNotification(`即将展示 ${projectTitle} 详情`);
        });
    });
    
    // Pause video when collapsible closed
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('toggle', () => {
            const vid = card.querySelector('video');
            if (!vid) return;
            if (card.open) {
                vid.play();
            } else {
                vid.pause();
            }
        });
    });
    
    // 滚动时导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加滚动阴影效果
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 显示通知的函数
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 设置样式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #000;
            color: #fff;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape') {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // 添加作品卡片的加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有作品卡片
    workCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // 观察所有其他作品卡片
    otherCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== 图片灯箱初始化 =====
    initImageLightbox();
});

/**
 * 图片灯箱功能
 * - 点击 .project-content 内的图片打开全屏灯箱
 * - 鼠标滚轮以鼠标为中心缩放
 * - 鼠标拖拽平移
 * - 点击背景 / 按 ESC / 点击关闭按钮退出
 */
function initImageLightbox() {
    // ---- 创建 DOM 结构 ----
    const overlay = document.createElement('div');
    overlay.className = 'img-lightbox-overlay';
    overlay.innerHTML = `
        <div class="img-lightbox-container">
            <img class="img-lightbox-img" src="" alt="">
        </div>
        <button class="img-lightbox-close" aria-label="关闭">✕</button>
        <p class="img-lightbox-hint">滚轮缩放 · 拖拽平移 · 按 ESC 退出</p>
    `;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('.img-lightbox-img');
    const closeBtn = overlay.querySelector('.img-lightbox-close');

    // ---- 状态变量 ----
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0, startY = 0;
    let lastTranslateX = 0, lastTranslateY = 0;

    const MIN_SCALE = 0.3;
    const MAX_SCALE = 8;
    const SCALE_STEP = 0.1;

    function applyTransform() {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function resetState() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        lastTranslateX = 0;
        lastTranslateY = 0;
        applyTransform();
    }

    // ---- 打开灯箱 ----
    function openLightbox(src, alt) {
        resetState();
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        overlay.style.display = 'flex';
        // 等待下一帧再添加 active 触发过渡
        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.add('active'));
        });
        document.body.style.overflow = 'hidden';
    }

    // ---- 关闭灯箱 ----
    function closeLightbox() {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }, 300);
    }

    // ---- 绑定图片点击事件 ----
    // 选取 .project-section 内所有图片，通过 closest 排除 .pagination 导航缩略图
    function bindProjectImages() {
        document.querySelectorAll('.project-section img').forEach(img => {
            if (img.closest('.pagination')) return; // 排除分页导航缩略图
            img.addEventListener('click', () => openLightbox(img.src, img.alt));
        });
    }
    bindProjectImages();

    // ---- 滚轮缩放（以鼠标位置为缩放中心）----
    overlay.addEventListener('wheel', (e) => {
        e.preventDefault();

        const rect = lightboxImg.getBoundingClientRect();
        // 鼠标相对于图片中心的位置
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        const delta = e.deltaY < 0 ? SCALE_STEP : -SCALE_STEP;
        const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
        const scaleRatio = newScale / scale;

        // 调整平移使鼠标位置保持不变
        translateX = mouseX - scaleRatio * (mouseX - translateX);
        translateY = mouseY - scaleRatio * (mouseY - translateY);
        scale = newScale;

        lastTranslateX = translateX;
        lastTranslateY = translateY;
        applyTransform();
    }, { passive: false });

    // ---- 拖拽平移 ----
    lightboxImg.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.classList.add('grabbing');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        lastTranslateX = translateX;
        lastTranslateY = translateY;
        applyTransform();
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        lightboxImg.classList.remove('grabbing');
    });

    // ---- 触摸支持（移动端）----
    let lastTouchDist = 0;
    let lastTouchMidX = 0, lastTouchMidY = 0;

    overlay.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            const dx = e.touches[1].clientX - e.touches[0].clientX;
            const dy = e.touches[1].clientY - e.touches[0].clientY;
            lastTouchDist = Math.hypot(dx, dy);
            lastTouchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            lastTouchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        }
    }, { passive: true });

    overlay.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dx = e.touches[1].clientX - e.touches[0].clientX;
            const dy = e.touches[1].clientY - e.touches[0].clientY;
            const dist = Math.hypot(dx, dy);
            const ratio = dist / lastTouchDist;
            const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * ratio));
            scale = newScale;
            lastTouchDist = dist;
            applyTransform();
        }
    }, { passive: false });

    // ---- 关闭逻辑 ----
    closeBtn.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', (e) => {
        // 只有点击背景时关闭，不是点击图片
        if (e.target === overlay || e.target.classList.contains('img-lightbox-container')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
}

