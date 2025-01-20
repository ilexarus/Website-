/***************************************************
 * cars: список авто
 ***************************************************/
/***************************************************
 * Расширенный массив cars: добавлено больше моделей
 ***************************************************/
const cars = [
  {
    model: "Tesla Model 3",
    year: "2023",
    price: 44990,
    image: "img/tesla-model-3-2023.webp",
    fallbackImage: "img/tesla-model-3-2023.png",
    description: "Компактный электромобиль с автопилотом и большим запасом хода."
  },
  {
    model: "Toyota Camry",
    year: "2023",
    price: 25990,
    image: "img/toyota-camry-2023.webp",
    fallbackImage: "img/toyota-camry-2023.png",
    description: "Надёжный седан бизнес-класса, комфорт и практичность для города и трассы."
  },
  {
    model: "BMW iX",
    year: "2024",
    price: 84900,
    image: "img/bmw-ix-2024.webp",
    fallbackImage: "img/bmw-ix-2024.png",
    description: "Электрический кроссовер с современными технологиями и спортивным дизайном."
  },
  {
    model: "Mercedes-Benz E-Class",
    year: "2022",
    price: 55900,
    image: "img/mercedes-e-class-2022.webp",
    fallbackImage: "img/mercedes-e-class-2022.png",
    description: "Престижный седан, создающий идеальные условия для дальних поездок."
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
  },
  {
    model: "Hyundai Solaris",
    year: "2023",
    price: 16900,
    image: "img/hyundai-solaris-2023.webp",
    fallbackImage: "img/hyundai-solaris-2023.png",
    description: "Доступный и надёжный седан с небольшим расходом топлива."
  },
  {
    model: "Ford Mustang",
    year: "2022",
    price: 55900,
    image: "img/ford-mustang-2022.webp",
    fallbackImage: "img/ford-mustang-2022.png",
    description: "Легендарный американский мускул-кар со стильным дизайном и мощным двигателем."
  },
  {
    model: "Chevrolet Tahoe",
    year: "2023",
    price: 59900,
    image: "img/chevrolet-tahoe-2023.webp",
    fallbackImage: "img/chevrolet-tahoe-2023.png",
    description: "Большой внедорожник с просторным салоном и отличной проходимостью."
  },
  {
    model: "Volkswagen Golf GTI",
    year: "2024",
    price: 32900,
    image: "img/vw-golf-gti-2024.webp",
    fallbackImage: "img/vw-golf-gti-2024.png",
    description: "Спортивный хэтчбек с узнаваемым дизайном и динамичным характером."
  }
];

/***************************************************
 * Ниже логика (admin, localStorage, темы, покупка), 
 * остаётся такой же, как в прошлых примерах.
 ***************************************************/
// ... дальше идёт весь ваш код loginUser, logoutUser, initAuthPage,
//    initAdminPage, loadCars, filterCars, openBuyModal, closeBuyModal, etc.
//    без изменений


/***************************************************
 * Убедимся, что admin/admin123 есть
 ***************************************************/
function ensureAdminExists() {
  let users = getUsers();
  let adminUser = users.find(u =>
    u.username.toLowerCase() === 'admin' && u.password === 'admin123'
  );
  if (!adminUser) {
    const newAdmin = {
      username: 'admin',
      password: 'admin123',
      email: 'admin@site',
      isAdmin: true
    };
    users.push(newAdmin);
    setUsers(users);
    console.log("Admin (admin/admin123) auto-created.");
  }
}

/***************************************************
 * LocalStorage: users, currentUser, tickets
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

function getTickets() {
  return JSON.parse(localStorage.getItem('tickets') || '[]');
}
function setTickets(arr) {
  localStorage.setItem('tickets', JSON.stringify(arr));
}

/***************************************************
 * Регистрация / Вход
 ***************************************************/
function registerUser(username, password, email) {
  let users = getUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    alert("Такой логин уже есть!");
    return false;
  }
  let isAdmin = false;
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
 * auth.html
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
 * admin.html
 ***************************************************/
function initAdminPage() {
  const adminStatus = document.getElementById("admin-status");
  const ticketsBlock = document.getElementById("tickets-block");
  const ticketsList = document.getElementById("tickets-list");
  if (!adminStatus || !ticketsBlock || !ticketsList) return;

  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.isAdmin) {
    adminStatus.innerHTML = "У вас нет прав доступа.";
    ticketsBlock.style.display = "none";
    return;
  }
  adminStatus.innerHTML = `Здравствуйте, <strong>${currentUser.username}</strong> (администратор).`;

  const tickets = getTickets();
  if (!tickets.length) {
    ticketsList.innerHTML = "<p>Нет запросов в техподдержку.</p>";
  } else {
    ticketsList.innerHTML = "";
    tickets.forEach(t => {
      const div = document.createElement("div");
      div.style.marginBottom = "15px";
      div.innerHTML = `
        <p><strong>${t.name}</strong> (${t.phone}): "${t.message}" <span style="color:#999;">(${t.date})</span></p>
      `;
      ticketsList.appendChild(div);
    });
  }
}

/***************************************************
 * Каталог
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
  const input = document.getElementById("search-input");
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
        <p class="car-price">Цена: $${car.price.toLocaleString()}</p>
        <button class="buy-btn" onclick="openBuyModal('${car.model} (${car.year})')">Купить</button>
      `;
      catalog.appendChild(card);
    }
  });
  if (typeof AOS !== 'undefined') AOS.refresh();
}

/***************************************************
 * Модальное окно "Купить"
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
      <p class="car-price">Цена: $${car.price.toLocaleString()}</p>
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
 * Плавающее меню + тема
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
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    updateThemeIcon("dark");
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
 * Формы при DOMContentLoaded
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  ensureAdminExists(); // Создаём admin/admin123, если нет

  // index.html
  if (document.getElementById("catalog-cards")) {
    loadCars();
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", searchCars);
    }
  }

  // auth.html
  if (document.getElementById("register-form") || document.getElementById("login-form")) {
    initAuthPage();
  }

  // admin.html
  if (document.getElementById("admin-status")) {
    initAdminPage();
  }

  // Покупка авто
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
        alert("Заполните все поля!");
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Неверный формат Email!");
        return;
      }
      if (phone.length < 5) {
        alert("Введите нормальный телефон (не меньше 5 символов).");
        return;
      }
      alert(`Спасибо, ${name}! Ваша заявка на покупку ${car} принята.`);
      buyForm.reset();
      closeBuyModal();
    });
  }

  // Техподдержка (contacts.html)
  const supportForm = document.getElementById("support-form");
  if (supportForm) {
    supportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sname = document.getElementById("support-name").value.trim();
      const sphone = document.getElementById("support-phone").value.trim();
      const smessage = document.getElementById("support-message").value.trim();

      if (!sname || !smessage) {
        alert("Введите имя и сообщение!");
        return;
      }
      if (sphone.length < 5) {
        alert("Введите нормальный телефон (не меньше 5 символов).");
        return;
      }

      let tickets = getTickets();
      const newTicket = {
        name: sname,
        phone: sphone,
        message: smessage,
        date: new Date().toLocaleString()
      };
      tickets.push(newTicket);
      setTickets(tickets);

      alert("Ваш запрос отправлен в техподдержку!");
      supportForm.reset();
    });
  }

  // Инициализация AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 2000,
      easing: 'ease-out-cubic',
      once: true
    });
  }
});
// Подключение к серверу Socket.io
const socket = io();

let currentTicketId = null; // ID текущего тикета
let currentUserName = null; // Имя пользователя (или admin)

// Функция создания нового тикета
function createTicket(userName) {
  currentUserName = userName || `User_${Date.now()}`;
  currentTicketId = `TICKET_${Date.now()}`;

  // Уведомляем сервер
  socket.emit("createTicket", currentTicketId);

  // Подключаемся к событиям сервера
  socket.on("ticketData", (ticket) => {
    renderMessages(ticket);
  });
}

// Функция отправки сообщения
function sendMessage(text) {
  if (!currentTicketId || !text.trim()) return;

  const message = {
    ticketId: currentTicketId,
    from: currentUserName,
    text: text.trim(),
  };

  socket.emit("sendMessage", message);
}

// Отрисовка сообщений в чате
function renderMessages(ticket) {
  const messagesContainer = document.getElementById("chat-messages");
  if (!messagesContainer || !ticket) return;

  messagesContainer.innerHTML = "";
  ticket.messages.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = msg.from === "admin" ? "msg-admin" : "msg-user";
    msgDiv.innerHTML = `<strong>${msg.from}</strong> <span style='font-size:0.8rem;color:#999;'>(${msg.date})</span><br>${msg.text}`;
    messagesContainer.appendChild(msgDiv);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Пример подключения
function initChat() {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  if (!chatForm || !chatInput) return;

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage(chatInput.value);
    chatInput.value = "";
  });

  // Создаём тикет при загрузке страницы (для демонстрации)
  createTicket("guest");
}

// Запуск инициализации
window.addEventListener("DOMContentLoaded", initChat);
