/***************************************************
 * cars: расширенный список автомобилей
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
    description: "Престижный седан, идеально подходящий для дальних поездок."
  },
  {
    model: "Honda Civic",
    year: "2022",
    price: 22500,
    image: "img/honda-civic-2022.webp",
    fallbackImage: "img/honda-civic-2022.png",
    description: "Популярный городской автомобиль: экономичность, стиль и надёжность."
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
 * Автоматически создаём admin/admin123, если нет
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
      email: 'admin@autosaling.com',
      isAdmin: true
    };
    users.push(newAdmin);
    setUsers(users);
    console.log("Admin (admin/admin123) был автоматически создан.");
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

/***************************************************
 * Структура тикета:
 * {
 *   id: "TICKET_1680216029856",
 *   user: "username",
 *   dateCreated: "2025-01-19 12:30",
 *   messages: [
 *     { from: "user" / "admin" / "guest", text: "Сообщение", date: "..." },
 *     ...
 *   ]
 * }
 ***************************************************/
function getTickets() {
  return JSON.parse(localStorage.getItem('tickets') || '[]');
}
function setTickets(tickets) {
  localStorage.setItem('tickets', JSON.stringify(tickets));
}

/***************************************************
 * Создать тикет (первое сообщение)
 ***************************************************/
function createTicket(userName, firstMessage) {
  const tickets = getTickets();
  const ticketId = "TICKET_" + Date.now();
  const now = new Date().toLocaleString();
  const fromType = userName ? "user" : "guest";

  const newTicket = {
    id: ticketId,
    user: userName || null,
    dateCreated: now,
    messages: [
      { from: fromType, text: firstMessage, date: now }
    ]
  };
  tickets.push(newTicket);
  setTickets(tickets);
  return newTicket;
}

/***************************************************
 * Добавить сообщение в тикет
 ***************************************************/
function addTicketMessage(ticketId, from, text) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return null;

  const now = new Date().toLocaleString();
  ticket.messages.push({ from, text, date: now });
  setTickets(tickets);
  return ticket;
}

/***************************************************
 * Отрисовать всю переписку тикета
 ***************************************************/
function renderTicketConversation(ticketId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) {
    container.innerHTML = "<p>Тикет не найден.</p>";
    return;
  }
  container.innerHTML = "";

  ticket.messages.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("ticket-msg");
    if (msg.from === "admin") {
      div.classList.add("ticket-msg-admin");
    } else {
      div.classList.add("ticket-msg-user");
    }
    div.innerHTML = `
      <p><strong>${capitalizeFirstLetter(msg.from)}</strong> <span style="font-size:0.8rem;color:#999;">(${msg.date})</span></p>
      <p>${msg.text}</p>
    `;
    container.appendChild(div);
  });
}

/***************************************************
 * Пользовательская сторона (contacts.html)
 ***************************************************/
function initContactsPage() {
  const supportForm = document.getElementById("support-form");
  if (supportForm) {
    supportForm.addEventListener("submit", e => {
      e.preventDefault();
      const user = getCurrentUser();
      const sname = document.getElementById("support-name").value.trim();
      const sphone = document.getElementById("support-phone").value.trim();
      const smessage = document.getElementById("support-message").value.trim();
      if (!smessage) {
        alert("Введите сообщение!");
        return;
      }

      let userName = null;
      if (user) {
        userName = user.username;
      }
      // Создаём тикет
      const ticket = createTicket(userName, `Имя: ${sname}, Тел: ${sphone}\n${smessage}`);
      alert(`Ваш тикет создан! ID: ${ticket.id}`);
      supportForm.reset();

      // Перерисуем список тикетов
      const userTicketsContainer = document.getElementById("my-tickets-container");
      if (user && userTicketsContainer) {
        renderUserTickets(user.username, userTicketsContainer.id);
      }
    });
  }

  // Если пользователь авторизован, покажем список его тикетов
  const user = getCurrentUser();
  const myTicketsContainer = document.getElementById("my-tickets-container");
  if (myTicketsContainer && user) {
    renderUserTickets(user.username, myTicketsContainer.id);
  }
}

/***************************************************
 * Отобразить тикеты конкретного пользователя
 ***************************************************/
function renderUserTickets(username, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "<h3>Мои тикеты</h3>";

  const tickets = getTickets();
  const userTickets = tickets.filter(t => t.user && t.user.toLowerCase() === username.toLowerCase());
  if (!userTickets.length) {
    container.innerHTML += "<p>У вас нет тикетов.</p>";
    return;
  }
  userTickets.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("user-ticket-item");
    div.innerHTML = `
      <p><strong>ID:</strong> ${t.id} <span style="color:#999;">(${t.dateCreated})</span></p>
      <button class="btn small-btn" onclick="openUserTicket('${t.id}')">Открыть</button>
    `;
    container.appendChild(div);
  });
}

/***************************************************
 * Открыть тикет (показать переписку + форма ответа)
 ***************************************************/
function openUserTicket(ticketId) {
  const chatContainer = document.getElementById("user-chat-container");
  if (!chatContainer) return;
  chatContainer.dataset.ticketId = ticketId;
  // Отрисовать переписку
  renderTicketConversation(ticketId, chatContainer.id);

  // Добавить поле отправки нового сообщения
  chatContainer.innerHTML += `
    <div style="margin-top:10px;">
      <textarea id="user-reply-text" rows="2" placeholder="Ваше сообщение..."></textarea>
      <button class="btn" onclick="userSendMessage('${ticketId}')">Отправить</button>
    </div>
  `;
}

/***************************************************
 * Отправить новое сообщение от пользователя
 ***************************************************/
function userSendMessage(ticketId) {
  const txt = document.getElementById("user-reply-text").value.trim();
  if (!txt) {
    alert("Введите текст сообщения!");
    return;
  }
  addTicketMessage(ticketId, "user", txt);
  document.getElementById("user-reply-text").value = "";
  renderTicketConversation(ticketId, "user-chat-container");
}

/***************************************************
 * Админ-панель (admin.html)
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

  renderAllTicketsAdmin();
}

/***************************************************
 * Отобразить все тикеты для админа
 ***************************************************/
function renderAllTicketsAdmin() {
  const ticketsList = document.getElementById("tickets-list");
  if (!ticketsList) return;
  ticketsList.innerHTML = "";

  const tickets = getTickets();
  if (!tickets.length) {
    ticketsList.innerHTML = "<p>Нет тикетов.</p>";
    return;
  }
  tickets.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("admin-ticket-item");
    div.innerHTML = `
      <p><strong>ID:</strong> ${t.id} (${t.dateCreated}) <br>
      Пользователь: ${t.user || "Гость"}</p>
      <button class="btn small-btn" onclick="adminOpenTicket('${t.id}')">Открыть</button>
    `;
    ticketsList.appendChild(div);
  });
}

/***************************************************
 * Открыть тикет в админке (чат + форма ответа)
 ***************************************************/
function adminOpenTicket(ticketId) {
  const adminChat = document.getElementById("admin-chat-container");
  if (!adminChat) return;
  adminChat.dataset.ticketId = ticketId;

  renderTicketConversation(ticketId, adminChat.id);

  // Добавим поле для ответа админа
  adminChat.innerHTML += `
    <div style="margin-top:10px;">
      <textarea id="admin-reply-text" rows="2" placeholder="Ответ admin..."></textarea>
      <button class="btn" onclick="adminSendMessage('${ticketId}')">Отправить</button>
    </div>
  `;
}

/***************************************************
 * Отправить сообщение от админа
 ***************************************************/
function adminSendMessage(ticketId) {
  const txt = document.getElementById("admin-reply-text").value.trim();
  if (!txt) {
    alert("Введите текст ответа!");
    return;
  }
  addTicketMessage(ticketId, "admin", txt);
  document.getElementById("admin-reply-text").value = "";
  renderTicketConversation(ticketId, "admin-chat-container");
}

/***************************************************
 * Регистрация / Вход
 ***************************************************/
function registerUser(username, password, email) {
  let users = getUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    alert("Такой логин уже существует!");
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
 * Каталог (index.html)
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
    if (btn.textContent === year || (year === 'all' && btn.textContent.toLowerCase() === 'все')) {
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
 * Модальное окно (покупка авто)
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
 * Вспомогательные функции
 ***************************************************/
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/***************************************************
 * Инициализация при DOMContentLoaded
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  ensureAdminExists();

  // Если index.html
  if (document.getElementById("catalog-cards")) {
    loadCars();
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", searchCars);
    }
  }

  // Если auth.html
  if (document.getElementById("register-form") || document.getElementById("login-form")) {
    initAuthPage();
  }

  // Если admin.html
  if (document.getElementById("admin-status")) {
    initAdminPage();
  }

  // contacts.html
  if (document.getElementById("support-form") || document.getElementById("my-tickets-container")) {
    initContactsPage();
  }

  // Инициализируем AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 2000,
      easing: 'ease-out-cubic',
      once: true
    });
  }
});
