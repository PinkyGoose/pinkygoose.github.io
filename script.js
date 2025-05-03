document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы RSVP
    // const rsvpForm = document.getElementById('rsvpForm');
    
    // if (rsvpForm) {
    //     // Проверяем, есть ли параметр success в URL
    //     const urlParams = new URLSearchParams(window.location.search);
    //     if (urlParams.get('success') === 'true') {
    //         document.getElementById('form-success').style.display = 'block';
    //         // Прокручиваем к сообщению об успехе
    //         document.getElementById('form-success').scrollIntoView({ behavior: 'smooth' });
    //     }
        
    //     // Netlify автоматически обрабатывает отправку формы,
    //     // но мы можем добавить дополнительную валидацию перед отправкой
    //     rsvpForm.addEventListener('submit', function(e) {
    //         // Получаем значения полей
    //         const name = document.getElementById('name').value.trim();
    //         let attendance = '';
            
    //         // Получаем значение радиокнопок
    //         const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    //         for (const radio of attendanceRadios) {
    //             if (radio.checked) {
    //                 attendance = radio.value;
    //                 break;
    //             }
    //         }
            
    //         // Валидация формы
    //         if (!name || !attendance) {
    //             e.preventDefault();
    //             document.getElementById('form-error').style.display = 'block';
    //             document.getElementById('form-error').textContent = 'Пожалуйста, заполните все обязательные поля';
    //             return;
    //         }
            
    //         // Отображаем индикатор загрузки
    //         const submitButton = this.querySelector('button[type="submit"]');
    //         const originalButtonText = submitButton.textContent;
    //         submitButton.disabled = true;
    //         submitButton.textContent = 'Отправка...';
            
    //         // Здесь должен быть код для отправки данных
    //         // Для демонстрации просто показываем сообщение
    //         setTimeout(() => {
    //             alert(`Спасибо, ${name}! Ваш ответ принят.`);
    //             rsvpForm.reset();
                
    //             // Восстанавливаем кнопку
    //             submitButton.disabled = false;
    //             submitButton.textContent = originalButtonText;
    //         }, 1000);
    //     });
    // }
    
    // Обратный отсчет до свадьбы
    function updateCountdown() {
        const weddingDate = new Date('August 07, 2025 13:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Расчет дней, часов, минут и секунд
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Обновление элементов на странице
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Если дата свадьбы прошла
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Можно добавить сообщение о том, что свадьба уже состоялась
            const countdownSection = document.querySelector('.countdown');
            if (countdownSection && !document.getElementById('wedding-passed')) {
                const message = document.createElement('p');
                message.id = 'wedding-passed';
                message.textContent = 'Наша свадьба уже состоялась! Спасибо всем, кто был с нами в этот день!';
                message.style.marginTop = '20px';
                message.style.fontSize = '1.2rem';
                message.style.color = '#9a7aa0';
                countdownSection.appendChild(message);
            }
        }
    }
    
    // Обновление счетчика каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Анимация для timeline при прокрутке
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация стилей для анимации
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимации при загрузке и прокрутке
    animateTimeline();
    window.addEventListener('scroll', animateTimeline);
    
    // Слайдер для дресс-кода
    function initDressCodeSlider() {
        const images = document.querySelectorAll('.slider-image');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        
        // Функция для переключения слайдов
        function showSlide(index) {
            // Скрываем все изображения и деактивируем все точки
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Показываем нужное изображение и активируем соответствующую точку
            images[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Обновляем текущий индекс
            currentIndex = index;
        }
        
        // Автоматическое переключение слайдов каждые 5 секунд
        function autoSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            showSlide(nextIndex);
        }
        
        // Запускаем автоматическое переключение
        const slideInterval = setInterval(autoSlide, 5000);
        
        // Обработчики кликов по точкам
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
                
                // Сбрасываем интервал при ручном переключении
                clearInterval(slideInterval);
                setTimeout(() => {
                    // Запускаем интервал заново
                    setInterval(autoSlide, 5000);
                }, 5000);
            });
        });
    }
    
    // Инициализация слайдера дресс-кода
    initDressCodeSlider();
}); 