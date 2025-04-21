document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы RSVP
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Отображаем индикатор загрузки
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
            
            // URL вашего Google Apps Script
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbyq7ojbaX_LJEl4r-pDSMO3sJfpH06GjJdrVMRpkFyj1Kddq9h36NROivaAFjWoCiPt/exec';
            
            // Отправляем данные через Google Apps Script
            fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    attendance,
                    guests: parseInt(guests),
                    message
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Показываем сообщение об успехе
                alert(`Спасибо, ${name}! Ваш ответ принят.`);
                rsvpForm.reset();
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
            })
            .finally(() => {
                // Восстанавливаем кнопку
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }
    
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
}); 