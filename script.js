/***************************************************
 * Новый массив cars: все модели разные.
 ***************************************************/
const cars = [
    {
      model: "Tesla Model 3",
      year: "2023",
      image: "img/tesla-model-3-2023.webp",
      fallbackImage: "img/tesla-model-3-2023.png",
      description: "Компактный электромобиль с отличным запасом хода и автопилотом."
    },
    {
      model: "Toyota Camry",
      year: "2023",
      image: "img/toyota-camry-2023.webp",
      fallbackImage: "img/toyota-camry-2023.png",
      description: "Надёжный седан бизнес-класса, комфорт и практичность в одном."
    },
    {
      model: "BMW iX",
      year: "2024",
      image: "img/bmw-ix-2024.webp",
      fallbackImage: "img/bmw-ix-2024.png",
      description: "Полностью электрический кроссовер с современным дизайном и технологиями."
    },
    {
      model: "Mercedes-Benz E-Class",
      year: "2022",
      image: "img/mercedes-e-class-2022.webp",
      fallbackImage: "img/mercedes-e-class-2022.png",
      description: "Элегантный и престижный седан, идеальный для дальних поездок."
    },
    {
      model: "Honda Civic",
      year: "2022",
      image: "img/honda-civic-2022.webp",
      fallbackImage: "img/honda-civic-2022.png",
      description: "Популярный городской автомобиль: экономичность, стиль и надёжность."
    },
    {
      model: "Audi Q5",
      year: "2024",
      image: "img/audi-q5-2024.webp",
      fallbackImage: "img/audi-q5-2024.png",
      description: "Престижный кроссовер с полным приводом и отличной управляемостью."
    },
    {
      model: "Range Rover Velar",
      year: "2023",
      image: "img/range-rover-velar-2023.webp",
      fallbackImage: "img/range-rover-velar-2023.png",
      description: "Стильный и роскошный SUV, сочетающий проходимость и изысканный дизайн."
    }
  ];
  
  /***************************************************
   * Загрузка и фильтрация автомобилей
   ***************************************************/
  function loadCars(filter = 'all') {
    const catalog = document.getElementById("catalog-cards");
    if (!catalog) return;
  
    catalog.innerHTML = "";
    cars.forEach(car => {
      if (filter === 'all' || car.year === filter) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <picture>
            <source srcset="${car.image}" type="image/webp">
            <img src="${car.fallbackImage}" alt="${car.model} ${car.year}" loading="lazy">
          </picture>
          <h3>${car.model} (${car.year})</h3>
          <p>${car.description}</p>
          <button class="buy-btn" onclick="openBuyModal('${car.model} (${car.year})')">Купить</button>
        `;
        catalog.appendChild(card);
      }
    });
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
  
  function filterCars(year) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.textContent === year || (year === 'all' && btn.textContent.toLowerCase() === 'все')){
        btn.classList.add("active");
      }
    });
    loadCars(year);
  }
  
  function searchCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const catalog = document.getElementById("catalog-cards");
    if (!catalog) return;
  
    catalog.innerHTML = "";
    cars.forEach(car => {
      if (car.model.toLowerCase().includes(query)) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <picture>
            <source srcset="${car.image}" type="image/webp">
            <img src="${car.fallbackImage}" alt="${car.model} ${car.year}" loading="lazy">
          </picture>
          <h3>${car.model} (${car.year})</h3>
          <p>${car.description}</p>
          <button class="buy-btn" onclick="openBuyModal('${car.model} (${car.year})')">Купить</button>
        `;
        catalog.appendChild(card);
      }
    });
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
  
  /***************************************************
   * Открытие и закрытие модального окна
   ***************************************************/
  function openBuyModal(carName) {
    const buyModal = document.getElementById("buyModal");
    const selectedCarInfo = document.getElementById("selected-car-info");
    const buyCarInput = document.getElementById("buy-car");
    if (!buyModal || !selectedCarInfo || !buyCarInput) return;
  
    const car = cars.find(c => `${c.model} (${c.year})` === carName);
    if (car) {
      selectedCarInfo.innerHTML = `
        <picture>
          <source srcset="${car.image}" type="image/webp">
          <img src="${car.fallbackImage}" alt="${car.model} ${car.year}">
        </picture>
        <h3>${car.model} (${car.year})</h3>
        <p>${car.description}</p>
      `;
    } else {
      selectedCarInfo.innerHTML = "<p>Информация о выбранном автомобиле недоступна.</p>";
    }
  
    buyCarInput.value = carName;
    buyModal.style.display = "flex";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
  
  function closeBuyModal() {
    const buyModal = document.getElementById("buyModal");
    if (buyModal) {
      buyModal.style.display = "none";
    }
  }
  
  window.onclick = function(event) {
    const buyModal = document.getElementById("buyModal");
    if (buyModal && event.target === buyModal) {
      buyModal.style.display = "none";
    }
  };
  
  /***************************************************
   * Обработка формы покупки
   ***************************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', searchCars);
    }
  
    const buyForm = document.getElementById('buy-form');
    if (buyForm) {
      buyForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('buy-name').value.trim();
        const email = document.getElementById('buy-email').value.trim();
        const phone = document.getElementById('buy-phone').value.trim();
        const car = document.getElementById('buy-car').value.trim();
        const message = document.getElementById('buy-message').value.trim();
  
        if (!name || !email || !phone || !car || !message) {
          alert("Пожалуйста, заполните все поля формы.");
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          alert("Введите корректный Email.");
          return;
        }
        const phonePattern = /^\+?\d{7,15}$/;
        if (!phonePattern.test(phone)) {
          alert("Введите корректный номер телефона.");
          return;
        }
  
        alert(`Спасибо, ${name}! Ваша заявка на покупку ${car} принята.`);
        buyForm.reset();
        closeBuyModal();
      });
    }
  });
  
  /***************************************************
   * Плавающие кнопки: меню и тема
   ***************************************************/
  const menuFab = document.getElementById("menu-fab");
  const sideMenu = document.getElementById("side-menu");
  const closeMenuBtn = document.getElementById("close-menu");
  
  if (menuFab && sideMenu && closeMenuBtn) {
    menuFab.addEventListener("click", () => {
      sideMenu.classList.add("active");
    });
    closeMenuBtn.addEventListener("click", () => {
      sideMenu.classList.remove("active");
    });
  }
  
  const themeFab = document.getElementById("theme-fab");
  if (themeFab) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      updateThemeIcon('dark');
    }
  
    themeFab.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      let theme = 'light';
      if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  }
  
  function updateThemeIcon(theme) {
    const icon = themeFab.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
  
  /***************************************************
   * Инициализация при загрузке страницы
   ***************************************************/
  window.onload = () => {
    loadCars();
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1400,
        easing: 'ease-out-cubic',
        once: true
      });
    }
  };
  