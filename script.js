// Данные о машинах
const cars = [
    {
        model: "BMW X5",
        year: "2023",
        image: "img/bmw-x5-2023.webp",
        fallbackImage: "img/bmw-x5-2023.png",
        description: "Премиальный кроссовер с современным дизайном и мощным двигателем.",
        price: 75000 // Добавлено для сортировки по цене
    },
    {
        model: "BMW X5",
        year: "2020",
        image: "img/bmw-x5-2020.webp",
        fallbackImage: "img/bmw-x5-2020.png",
        description: "Надёжный выбор с проверенной технологией.",
        price: 65000
    },
    {
        model: "Hyundai Solaris",
        year: "2024",
        image: "img/hyundai-solaris-2024.webp",
        fallbackImage: "img/hyundai-solaris-2024.png",
        description: "Новый уровень экономии и стиля.",
        price: 20000
    },
    {
        model: "Hyundai Solaris",
        year: "2021",
        image: "img/hyundai-solaris-2021.webp",
        fallbackImage: "img/hyundai-solaris-2021.png",
        description: "Экономичный и стильный седан для комфортной езды.",
        price: 18000
    },
    {
        model: "Tesla Model S",
        year: "2023",
        image: "img/tesla-model-s-2023.webp",
        fallbackImage: "img/tesla-model-s-2023.png",
        description: "Современный электромобиль с автопилотом и запасом хода до 600 км.",
        price: 120000
    },
    {
        model: "Tesla Model S",
        year: "2022",
        image: "img/tesla-model-s-2022.webp",
        fallbackImage: "img/tesla-model-s-2022.png",
        description: "Лучшее сочетание мощности и стиля.",
        price: 115000
    }
];

// Загрузка машин в каталог
function loadCars(filter = 'all') {
    const catalog = document.getElementById("catalog-cards");
    if (!catalog) return; // Если элемент не найден на странице, выход

    catalog.innerHTML = "";
    cars.forEach((car) => {
        if (filter === 'all' || car.year === filter || car.model.startsWith(filter)) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-year", car.year);
            card.innerHTML = `
                <picture>
                    <source srcset="${car.image}" type="image/webp">
                    <img src="${car.fallbackImage}" alt="${car.model} ${car.year}" loading="lazy">
                </picture>
                <h3>${car.model} (${car.year})</h3>
                <p>${car.description}</p>
                <p><strong>Цена:</strong> $${car.price.toLocaleString()}</p>
                <button class="buy-btn" onclick="openBuyModal('${car.model} (${car.year})')" aria-label="Купить ${car.model} ${car.year}">Купить</button>
            `;
            catalog.appendChild(card);
        }
    });

    // Refresh AOS после динамического добавления элементов
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Фильтрация машин по году выпуска или бренду
function filterCars(criteria) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        if(btn.textContent === criteria || (criteria === 'all' && btn.textContent.toLowerCase() === 'все')){
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    let filteredCars = cars;
    if (criteria !== 'all') {
        if (['BMW', 'Hyundai', 'Tesla'].includes(criteria)) {
            filteredCars = cars.filter(car => car.model.startsWith(criteria));
        } else {
            filteredCars = cars.filter(car => car.year === criteria);
        }
    }

    displayCars(filteredCars);
}

// Сортировка машин
function sortCars(criteria) {
    let sortedCars = [...cars];
    switch(criteria) {
        case 'price-asc':
            sortedCars.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedCars.sort((a, b) => b.price - a.price);
            break;
        case 'year-asc':
            sortedCars.sort((a, b) => a.year - b.year);
            break;
        case 'year-desc':
            sortedCars.sort((a, b) => b.year - a.year);
            break;
        default:
            sortedCars = cars;
    }
    displayCars(sortedCars);
}

function displayCars(carList) {
    const catalog = document.getElementById("catalog-cards");
    if (!catalog) return;

    catalog.innerHTML = "";
    carList.forEach((car) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-year", car.year);
        card.innerHTML = `
            <picture>
                <source srcset="${car.image}" type="image/webp">
                <img src="${car.fallbackImage}" alt="${car.model} ${car.year}" loading="lazy">
            </picture>
            <h3>${car.model} (${car.year})</h3>
            <p>${car.description}</p>
            <p><strong>Цена:</strong> $${car.price.toLocaleString()}</p>
            <button class="buy-btn" onclick="openBuyModal('${car.model} (${car.year})')" aria-label="Купить ${car.model} ${car.year}">Купить</button>
        `;
        catalog.appendChild(card);
    });

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Функция поиска по модели
function searchCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const catalog = document.getElementById("catalog-cards");
    if (!catalog) return; // Если элемент не найден на странице, выход

    catalog.innerHTML = "";
    cars.forEach((car) => {
        if (car.model.toLowerCase().includes(query)) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-year", car.year);
            card.innerHTML = `
                <picture>
                    <source srcset="${car.image}" type="image/webp">
                    <img src="${car.fallbackImage}" alt="${car.model} ${car.year}" loading="lazy">
                </picture>
                <h3>${car.model} (${car.year})</h3>
                <p>${car.description}</p>
                <p><strong>Цена:</strong> $${car.price.toLocaleString()}</p>
                <button class="buy-btn" onclick="openBuyModal('${car.model} (${car.year})')" aria-label="Купить ${car.model} ${car.year}">Купить</button>
            `;
            catalog.appendChild(card);
        }
    });

    // Refresh AOS после динамического добавления элементов
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Обработчик события для поиска при вводе
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchCars);
    }

    const sortInput = document.getElementById('sort-input');
    if (sortInput) {
        sortInput.addEventListener('change', (e) => {
            sortCars(e.target.value);
        });
    }
});

// Открытие модального окна для покупки автомобиля
function openBuyModal(carName) {
    const buyModal = document.getElementById("buyModal");
    const buyCarInput = document.getElementById("buy-car");
    const selectedCarInfo = document.getElementById("selected-car-info");
    
    if (!buyModal || !buyCarInput || !selectedCarInfo) return;

    // Находим объект автомобиля по названию
    const car = cars.find(c => `${c.model} (${c.year})` === carName);
    
    if (car) {
        selectedCarInfo.innerHTML = `
            <picture>
                <source srcset="${car.image}" type="image/webp">
                <img src="${car.fallbackImage}" alt="${car.model} ${car.year}">
            </picture>
            <h3>${car.model} (${car.year})</h3>
            <p>${car.description}</p>
            <p><strong>Цена:</strong> $${car.price.toLocaleString()}</p>
        `;
    } else {
        selectedCarInfo.innerHTML = `<p>Информация о выбранном автомобиле недоступна.</p>`;
    }

    buyCarInput.value = carName;
    buyModal.style.display = "flex";

    // Scroll to top to ensure visibility
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh AOS после добавления контента
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Закрытие модального окна покупки автомобиля
function closeBuyModal() {
    const buyModal = document.getElementById("buyModal");
    if (buyModal) {
        buyModal.style.display = "none";
    }
}

// Закрытие модальных окон при клике вне содержимого
window.onclick = function(event) {
    const buyModal = document.getElementById("buyModal");
    if (buyModal && event.target === buyModal) {
        buyModal.style.display = "none";
    }
}

// Переключение темы
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

// Проверка сохранённой темы при загрузке страницы
if (currentTheme) {
    document.body.classList.add(currentTheme);
    updateThemeToggleIcon(currentTheme);
}

// Обработчик клика по кнопке переключения темы
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light-theme';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
        }
        localStorage.setItem('theme', theme);
        updateThemeToggleIcon(theme);
    });
}

// Обновление иконки переключения темы
function updateThemeToggleIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark-theme') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Обработка отправки форм обратной связи
const contactForms = document.querySelectorAll('.contact-form');
contactForms.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Здесь можно добавить логику отправки данных на сервер
        alert('Спасибо за ваше сообщение!');
        form.reset();
    });
});

// Обработка отправки формы покупки автомобиля
const buyForms = document.querySelectorAll('#buy-form');
buyForms.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Здесь можно добавить логику отправки данных на сервер

        // Валидация формы
        const name = document.getElementById('buy-name').value.trim();
        const email = document.getElementById('buy-email').value.trim();
        const phone = document.getElementById('buy-phone').value.trim();
        const car = document.getElementById('buy-car').value.trim();
        const message = document.getElementById('buy-message').value.trim();

        if (!name || !email || !phone || !car || !message) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        // Простая проверка email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Пожалуйста, введите корректный email.');
            return;
        }

        // Проверка номера телефона
        const phonePattern = /^\+?\d{7,15}$/;
        if (!phonePattern.test(phone)) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        // Симуляция отправки данных
        alert(`Спасибо, ${name}! Ваша заявка на покупку ${car} принята. Мы свяжемся с вами по адресу ${email} или телефону ${phone} в ближайшее время.`);
        form.reset();
        closeBuyModal();
    });
});

// Обработка клика по кнопке меню для мобильных устройств
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Меняем иконку при открытии/закрытии меню
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Инициализация загрузки всех машин и карты при загрузке страницы
window.onload = () => {
    loadCars();
    // Инициализация AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    // Инициализация Leaflet карты
    initMap();
};

// Инициализация Leaflet карты
function initMap() {
    // Проверка наличия контейнера карты
    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer) {
        console.error('Контейнер карты с id "leaflet-map" не найден.');
        return;
    }

    // Создаем карту
    const map = L.map('leaflet-map').setView([55.7558, 37.6173], 13); // Москва

    // Добавляем слой OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    // Добавляем маркеры
    const locations = [
        { coords: [55.7558, 37.6173], popup: 'AutoSaling - Москва' },
        { coords: [55.7517, 37.6178], popup: 'AutoSaling - Шарапово' },
        // Добавьте другие локации по необходимости
    ];

    locations.forEach(loc => {
        L.marker(loc.coords).addTo(map)
            .bindPopup(loc.popup);
    });

    // Опционально: Добавление маршрута
    /*
    const latlngs = [
        [55.7558, 37.6173],
        [55.7517, 37.6178]
    ];
    L.polyline(latlngs, {color: 'blue'}).addTo(map);
    */
}
