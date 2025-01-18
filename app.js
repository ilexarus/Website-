/*****************************************************
 * app.js — финальная логика Tesla-like
 *****************************************************/

// Тёмная/Светлая тема
function applyTheme(isLight){
  if(isLight) document.body.classList.add('light-theme');
  else document.body.classList.remove('light-theme');
}
function toggleTheme(){
  const isLight=document.body.classList.contains('light-theme');
  localStorage.setItem('siteTheme', isLight?'dark':'light');
  applyTheme(!isLight);
}

// Шапка затемняется при скролле
function setupNavBarScroll(){
  const navBar=document.querySelector('.nav-bar');
  window.addEventListener('scroll',()=>{
    if(window.scrollY>40){
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
  });
}

// Логин/Выход
function checkLoginStatus(){
  const currentUser=localStorage.getItem('currentUser');
  const loginLink=document.getElementById('loginLink');
  const registerLink=document.getElementById('registerLink');
  const logoutBtn=document.getElementById('logoutBtn');
  if(currentUser){
    if(loginLink) loginLink.classList.add('hidden');
    if(registerLink) registerLink.classList.add('hidden');
    if(logoutBtn) logoutBtn.classList.remove('hidden');
  } else {
    if(loginLink) loginLink.classList.remove('hidden');
    if(registerLink) registerLink.classList.remove('hidden');
    if(logoutBtn) logoutBtn.classList.add('hidden');
  }
}
function setupLogoutBtn(){
  const logoutBtn=document.getElementById('logoutBtn');
  if(!logoutBtn)return;
  logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('currentUser');
    alert("Вы вышли из аккаунта");
    checkLoginStatus();
    location.reload();
  });
}

// Кнопка "Вверх"
function setupScrollTopBtn(btnId){
  const btn=document.getElementById(btnId);
  if(!btn)return;
  window.addEventListener('scroll',()=>{
    if(window.scrollY>300) btn.classList.add('show');
    else btn.classList.remove('show');
  });
  btn.addEventListener('click',()=>{
    window.scrollTo({ top:0, behavior:'smooth'});
  });
}

// Анимация Typed
function setupTypedText(words, typedTextId){
  const typedTextElement=document.getElementById(typedTextId);
  if(!typedTextElement)return;

  let index=0, wordIndex=0, currentWord="", isDeleting=false;

  function typeEffect(){
    const fullWord=words[wordIndex];
    if(!isDeleting) {
      currentWord=fullWord.substring(0,index+1); index++;
    } else {
      currentWord=fullWord.substring(0,index-1); index--;
    }
    typedTextElement.textContent=currentWord;

    if(!isDeleting && index===fullWord.length){
      isDeleting=true; setTimeout(typeEffect,1000);
    } else if(isDeleting && index===0){
      isDeleting=false; wordIndex=(wordIndex+1)%words.length; setTimeout(typeEffect,200);
    } else {
      const speed=isDeleting?50:100;
      setTimeout(typeEffect,speed);
    }
  }
  typeEffect();
}

// Fade-up
function fadeUpOnScroll(selector){
  const elements=document.querySelectorAll(selector);
  function check(){
    elements.forEach(el=>{
      const rect=el.getBoundingClientRect();
      if(rect.top<window.innerHeight-100){
        el.classList.add('show');
      }
    });
  }
  window.addEventListener('scroll',check);
  check();
}

// Избранное/Сравнение
function addToFavorites(carId){
  let favorites=JSON.parse(localStorage.getItem('favorites'))||[];
  if(!favorites.includes(carId)){
    favorites.push(carId);
    localStorage.setItem('favorites',JSON.stringify(favorites));
    alert("Добавлено в избранное!");
  } else {
    alert("Уже в избранном!");
  }
}
function addToCompare(carId){
  let compare=JSON.parse(localStorage.getItem('compare'))||[];
  if(!compare.includes(carId)){
    compare.push(carId);
    localStorage.setItem('compare',JSON.stringify(compare));
    alert("Добавлено к сравнению!");
  } else {
    alert("Этот авто уже в списке сравнения!");
  }
}
function applyFilters(){}
function loadMoreCars(){}

// Чат-бот
function setupChatBot(){
  const chatBtn=document.createElement('button');
  chatBtn.className='chat-bot-btn';
  chatBtn.innerText='Чат';
  document.body.appendChild(chatBtn);

  const chatWindow=document.createElement('div');
  chatWindow.className='chat-bot-window';
  chatWindow.innerHTML=`
    <div class="chat-bot-header">Онлайн-бот</div>
    <div class="chat-bot-messages" id="chatMessages"></div>
    <div class="chat-bot-input">
      <input type="text" id="chatInput" placeholder="Здравствуйте..." />
      <button>→</button>
    </div>
  `;
  document.body.appendChild(chatWindow);

  let chatOpen=false;
  chatBtn.addEventListener('click',()=>{
    chatOpen=!chatOpen;
    chatWindow.style.display=chatOpen?'flex':'none';
  });

  const sendBtn=chatWindow.querySelector('button');
  const chatInput=chatWindow.querySelector('#chatInput');
  const chatMessages=chatWindow.querySelector('#chatMessages');
  const answers={
    "привет":"Здравствуйте! Чем могу помочь?",
    "тесла":"У нас есть Tesla, а также другие бренды.",
    "скидка":"Проверьте, не являетесь ли вы другом директора!",
    "пока":"Спасибо за визит!"
  };

  sendBtn.addEventListener('click',()=>{
    const msg=chatInput.value.trim().toLowerCase();
    if(!msg)return;
    chatMessages.innerHTML+=`<div><strong>Вы:</strong> ${msg}</div>`;
    chatInput.value='';
    setTimeout(()=>{
      let reply="Пока не знаю, что ответить...";
      if(answers[msg]) reply=answers[msg];
      chatMessages.innerHTML+=`<div style="color: #ffcc00;"><strong>Бот:</strong> ${reply}</div>`;
      chatMessages.scrollTop=chatMessages.scrollHeight;
    },700);
  });
}

// Инициализация
function initApp(){
  const savedTheme=localStorage.getItem('siteTheme');
  applyTheme(savedTheme==='light');

  checkLoginStatus();
  setupLogoutBtn();
  setupChatBot();
  setupNavBarScroll();
}
