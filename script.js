/***************************************************
 * cars: уникальный ассортимент
 ***************************************************/
const cars = [
  {
    model: "Tesla Model 3",
    year: "2023",
    price: 44990, // Цена в USD
    image: "img/tesla-model-3-2023.webp",
    fallbackImage: "img/tesla-model-3-2023.png",
    description: "Компактный электромобиль с отличным запасом хода и автопилотом."
  },
  {
    model: "Toyota Camry",
    year: "2023",
    price: 25990,
    image: "img/toyota-camry-2023.webp",
    fallbackImage: "img/toyota-camry-2023.png",
    description: "Надёжный седан бизнес-класса, комфорт и практичность."
  },
  {
    model: "BMW iX",
    year: "2024",
    price: 84900,
    image: "img/bmw-ix-2024.webp",
    fallbackImage: "img/bmw-ix-2024.png",
    description: "Электрический кроссовер с современным дизайном и технологиями."
  },
  {
    model: "Mercedes-Benz E-Class",
    year: "2022",
    price: 55900,
    image: "img/mercedes-e-class-2022.webp",
    fallbackImage: "img/mercedes-e-class-2022.png",
    description: "Элегантный и престижный седан, идеальный для дальних поездок."
  },
  {
    model: "Honda Civic",
    year: "2022",
    price: 22500,
    image: "img/honda-civic-2022.webp",
    fallbackImage: "img/honda-civic-2022.png",
    description: "Популярный городской авто: экономичность, стиль и надёжность."
  },
  {
    model: "Audi Q5",
    year: "2024",
    price: 49900,
    image: "img/audi-q5-2024.webp",
    fallbackImage: "img/audi-q5-2024.png",
    description: "Престижный кроссовер с полным приводом и отличной управляемостью."
  },
  {
    model: "Range Rover Velar",
    year: "2023",
    price: 63900,
    image: "img/range-rover-velar-2023.webp",
    fallbackImage: "img/range-rover-velar-2023.png",
    description: "Стильный и роскошный SUV, сочетающий проходимость и изысканный дизайн."
  }
];

  
  /***************************************************
   * loadCars / filterCars / searchCars
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
          <p class="car-price">Цена: $${car.price.toLocaleString()}</p>
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
    const input = document.getElementById('search-input');
    if (!input) return;
    const query = input.value.toLowerCase();
  
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
   * Модальное окно "Купить автомобиль"
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
   * Локальное хранение: users + currentUser
   ***************************************************/
  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  function setCurrentUser(user) {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
  }
  
  /***************************************************
   * Регистрация: admin + admin123 => isAdmin
   ***************************************************/
  function registerUser(username, password, email) {
    let users = getUsers();
    // Проверка занятости
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      alert("Такой логин уже используется!");
      return false;
    }
  
    let isAdmin = false;
    // Если логин = 'admin', пароль = 'admin123'
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      isAdmin = true;
    }
  
    const newUser = { username, password, email, isAdmin };
    users.push(newUser);
    setUsers(users);
  
    alert("Регистрация успешно завершена!");
    return true;
  }
  
  function loginUser(username, password) {
    let users = getUsers();
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
    );
    if (!user) {
      alert("Неверный логин или пароль!");
      return null;
    }
    setCurrentUser(user);
    alert(`Здравствуйте, ${user.username}!`);
    return user;
  }
  
  function logoutUser() {
    setCurrentUser(null);
    location.reload();
  }
  
  /***************************************************
   * Инициализация auth.html
   ***************************************************/
  function initAuthPage() {
    const regForm = document.getElementById("register-form");
    if (regForm) {
      regForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("reg-username").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        if (!username || !password || !email) {
          alert("Заполните все поля!");
          return;
        }
        if (registerUser(username, password, email)) {
          regForm.reset();
        }
      });
    }
  
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();
        if (!username || !password) {
          alert("Введите логин и пароль!");
          return;
        }
        const user = loginUser(username, password);
        if (user) {
          loginForm.reset();
          location.href = "index.html";
        }
      });
    }
  }
  
  /***************************************************
   * Админ-панель (admin.html)
   ***************************************************/
  function initAdminPage() {
    const adminStatus = document.getElementById("admin-status");
    const ticketsBlock = document.getElementById("tickets-block");
    if (!adminStatus || !ticketsBlock) return;
  
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.isAdmin) {
      adminStatus.innerHTML = "У вас нет прав доступа.";
      ticketsBlock.style.display = "none";
      return;
    }
    adminStatus.innerHTML = `Здравствуйте, <strong>${currentUser.username}</strong> (администратор).`;
    // Здесь логика вывода заявок, если нужно
  }
  
  /***************************************************
   * Тема (dark/light) + боковое меню
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
  
    themeFab.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      let theme = 'light';
      if (document.body.classList.contains("dark-theme")) {
        theme = 'dark';
      }
      localStorage.setItem("theme", theme);
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
   * Форма покупки (buy-form)
   ***************************************************/
  document.addEventListener("DOMContentLoaded", () => {
    // Index
    if (document.getElementById("catalog-cards")) {
      loadCars();
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.addEventListener("input", searchCars);
      }
    }
  
    // Auth
    if (document.getElementById("register-form") || document.getElementById("login-form")) {
      initAuthPage();
    }
  
    // Admin
    if (document.getElementById("admin-status")) {
      initAdminPage();
    }
  
    // Покупка
    const buyForm = document.getElementById("buy-form");
    if (buyForm) {
      buyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("buy-name").value.trim();
        const email = document.getElementById("buy-email").value.trim();
        const phone = document.getElementById("buy-phone").value.trim();
        const car = document.getElementById("buy-car").value.trim();
        const message = document.getElementById("buy-message").value.trim();
        if (!name || !email || !phone || !car || !message) {
          alert("Заполните все поля формы!");
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          alert("Неверный формат Email.");
          return;
        }
        const phonePattern = /^\+?\\d{7,15}$/;
        if (!phonePattern.test(phone)) {
          alert("Введите корректный номер телефона.");
          return;
        }
        alert(`Спасибо, ${name}! Ваша заявка на покупку ${car} принята.`);
        buyForm.reset();
        closeBuyModal();
      });
    }
  
    // Инициализация AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1400,
        easing: 'ease-out-cubic',
        once: true
      });
    }
  });
  