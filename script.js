// Навигация
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Мобильное меню
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Изменение навбара при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Анимация появления элементов при скролле
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

    // Наблюдение за элементами
    const animatedElements = document.querySelectorAll('.feature-card, .info-card, .lake-card, .waterfall-card, .animal-category, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Интерактивная карта (заглушка)
    createInteractiveMap();
    
    // Галерея изображений
    createImageGallery();
    
    // Статистика с анимацией
    animateStats();
    
    // Интерактивные карточки
    addCardInteractions();
});

// Функция для плавной прокрутки к секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Создание интерактивной карты
function createInteractiveMap() {
    const mapContainer = document.querySelector('.map-placeholder');
    if (!mapContainer) return;

    // Создаем простую интерактивную карту с точками интереса
    const mapHTML = `
        <div class="interactive-map">
            <div class="map-point" style="top: 20%; left: 30%;" data-title="Озеро Лама" data-description="Крупнейшее озеро плато (80 км, глубина 350 м)">
                <div class="point-marker"></div>
                <div class="point-tooltip">Озеро Лама</div>
            </div>
            <div class="map-point" style="top: 40%; left: 60%;" data-title="Тальниковый водопад" data-description="Самый высокий водопад России (≈700 м)">
                <div class="point-marker"></div>
                <div class="point-tooltip">Тальниковый водопад</div>
            </div>
            <div class="map-point" style="top: 60%; left: 25%;" data-title="Озеро Виви" data-description="Географический центр России">
                <div class="point-marker"></div>
                <div class="point-tooltip">Озеро Виви</div>
            </div>
            <div class="map-point" style="top: 70%; left: 70%;" data-title="Озеро Хантайское" data-description="Самое глубокое озеро (≈450 м)">
                <div class="point-marker"></div>
                <div class="point-tooltip">Озеро Хантайское</div>
            </div>
        </div>
    `;

    mapContainer.innerHTML = mapHTML;

    // Добавляем стили для карты
    const mapStyles = `
        <style>
        .interactive-map {
            position: relative;
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            overflow: hidden;
        }
        
        .map-point {
            position: absolute;
            cursor: pointer;
            z-index: 10;
        }
        
        .point-marker {
            width: 20px;
            height: 20px;
            background: #e74c3c;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            animation: pulse 2s infinite;
        }
        
        .point-tooltip {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .map-point:hover .point-tooltip {
            opacity: 1;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', mapStyles);

    // Добавляем обработчики для точек на карте
    const mapPoints = document.querySelectorAll('.map-point');
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const title = this.dataset.title;
            const description = this.dataset.description;
            showMapModal(title, description);
        });
    });
}

// Модальное окно для карты
function showMapModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'map-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;

    // Стили для модального окна
    const modalStyles = `
        <style>
        .map-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);

    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Создание галереи изображений
function createImageGallery() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
        img.style.cursor = 'pointer';
    });
}

// Модальное окно для изображений
function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="${src}" alt="${alt}" />
            <p>${alt}</p>
        </div>
    `;

    // Стили для модального окна изображений
    const modalStyles = `
        <style>
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .image-modal .modal-content {
            background: transparent;
            padding: 0;
            border-radius: 0;
            max-width: 90%;
            max-height: 90%;
            position: relative;
        }
        
        .image-modal img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
        }
        
        .image-modal p {
            color: white;
            text-align: center;
            margin-top: 1rem;
            font-size: 1.1rem;
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);

    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Анимация статистики
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                
                if (number) {
                    animateValue(element, 0, number, 2000);
                }
                
                observer.unobserve(element);
            }
        });
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Интерактивные карточки
function addCardInteractions() {
    const cards = document.querySelectorAll('.feature-card, .lake-card, .waterfall-card, .animal-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Плавная прокрутка для кнопки CTA
document.querySelector('.cta-button')?.addEventListener('click', function() {
    scrollToSection('geography');
});

// Эффект печатания для заголовка
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Инициализация эффекта печатания для главного заголовка
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Добавление эффекта частиц в фоне
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }

    hero.appendChild(particleContainer);

    // CSS для анимации частиц
    const particleStyles = `
        <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', particleStyles);
}

// Инициализация частиц
createParticles();

// Добавление звуковых эффектов (опционально)
function addSoundEffects() {
    const buttons = document.querySelectorAll('.cta-button, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Создаем простой звуковой эффект
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Инициализация звуковых эффектов (раскомментировать при необходимости)
// addSoundEffects();
