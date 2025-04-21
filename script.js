document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы RSVP
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Здесь вы можете добавить код для отправки данных на сервер
            // Например, через fetch API или другой метод
            
            // Для демонстрации просто покажем сообщение
            alert(`Спасибо, ${name}! Ваш ответ принят.`);
            rsvpForm.reset();
        });
    }
    
    // Обратный отсчет до свадьбы
    function updateCountdown() {
        const weddingDate = new Date('August 20, 2024 14:00:00').getTime();
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
    }
    
    // Обновление счетчика каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
}); 