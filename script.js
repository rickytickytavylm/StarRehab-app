// Ждём, пока DOM будет полностью загружен
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const navLinks = document.querySelectorAll('nav ul li a');
    const backToTopButton = document.getElementById('back-to-top');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const revealElements = document.querySelectorAll('.reveal');
    const themeToggle = document.querySelector('.theme-toggle');
    const cards = document.querySelectorAll('.card');
    
    // Проверяем сохраненную тему из localStorage
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
    }
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Сохраняем выбор пользователя
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('darkTheme', 'true');
        } else {
            localStorage.setItem('darkTheme', 'false');
        }
    });

    // Плавный скролл по якорным ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем мобильное меню при клике на ссылку
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Компенсация высоты шапки
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Кнопка "Вернуться наверх"
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Мобильное меню
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Анимация появления элементов при прокрутке (IntersectionObserver)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Для браузеров, не поддерживающих IntersectionObserver, просто показываем элементы
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // Анимация карточек в разделе "Проблемы" - по клику вместо наведения
    cards.forEach(card => {
        // Флаг для отслеживания состояния карточки
        let isFlipped = false;
        const cardInner = card.querySelector('.card-inner');
        
        // Обработчик клика
        card.addEventListener('click', function() {
            if (!isFlipped) {
                // Переворачиваем карточку
                cardInner.style.transform = 'rotateY(180deg)';
                isFlipped = true;
            } else {
                // Возвращаем в исходное положение
                cardInner.style.transform = 'rotateY(0deg)';
                isFlipped = false;
            }
        });
    });

    // Изменение стиля шапки при прокрутке
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = document.body.classList.contains('dark-theme') 
                ? 'rgba(34, 34, 34, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--bg-color)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });

    // Добавление секции "Как разобраться в себе"
    function addSelfAwarenessSection() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const selfAwarenessSection = document.createElement('section');
        selfAwarenessSection.id = 'self-awareness';
        selfAwarenessSection.className = 'section';
        
        selfAwarenessSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">✨ Как разобраться в себе: мысли, чувства, действия</h2>
                
                <div class="chain-container">
                    <!-- Блок "Мысли" -->
                    <div class="chain-item reveal">
                        <div class="chain-icon">💭</div>
                        <h3>Мысли</h3>
                        <p>У каждого человека постоянно возникают определённые мысли и убеждения, формирующие его картину мира.</p>
                        <div class="examples">
                            <p class="example-thought">«У меня ничего не получится»</p>
                            <p class="example-thought">«Меня никто не любит»</p>
                            <p class="example-thought">«Я должен быть лучшим»</p>
                        </div>
                    </div>
                    
                    <!-- Стрелка -->
                    <div class="chain-arrow">→</div>
                    
                    <!-- Блок "Чувства" -->
                    <div class="chain-item reveal">
                        <div class="chain-icon">❤️</div>
                        <h3>Чувства (эмоции)</h3>
                        <p>Мысли всегда вызывают определённые эмоциональные реакции, которые мы переживаем на физическом уровне.</p>
                        <div class="examples">
                            <p class="example-emotion">Страх</p>
                            <p class="example-emotion">Тревога</p>
                            <p class="example-emotion">Грусть</p>
                            <p class="example-emotion">Стыд</p>
                        </div>
                    </div>
                    
                    <!-- Стрелка -->
                    <div class="chain-arrow">→</div>
                    
                    <!-- Блок "Действия" -->
                    <div class="chain-item reveal">
                        <div class="chain-icon">🚶‍♂️</div>
                        <h3>Действия</h3>
                        <p>Эмоции приводят нас к определённым действиям и реакциям, часто автоматическим и неосознанным.</p>
                        <div class="examples">
                            <p class="example-action">Избегание ситуаций</p>
                            <p class="example-action">Употребление веществ</p>
                            <p class="example-action">Самоизоляция</p>
                            <p class="example-action">Самосаботаж</p>
                        </div>
                    </div>
                </div>
                
                <!-- Блок "Зачем это нужно?" -->
                <div class="why-block reveal">
                    <div class="why-icon">🎯</div>
                    <h3>Зачем это нужно?</h3>
                    <p>Когда человек осознаёт связь между своими мыслями, чувствами и действиями, он способен изменить её. Заменив негативную мысль на более реалистичную, человек обретает возможность изменить эмоции и поступать иначе, свободнее и счастливее.</p>
                </div>
            </div>
        `;
        
        // Вставляем секцию после hero и перед problems
        heroSection.after(selfAwarenessSection);
        
        // Добавляем наблюдатель для анимации появления
        setupIntersectionObserver();
    }

    // Настройка IntersectionObserver для анимаций при прокрутке
    function setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => {
            observer.observe(el);
        });
    }

    // Добавляем секцию про мысли, чувства и действия
    addSelfAwarenessSection();
});
