/***********************************************
 * app.js — вся логика
 ***********************************************/

function applyTheme(isLight){
  if(isLight) document.body.classList.add('light-theme');
  else document.body.classList.remove('light-theme');
}
function toggleTheme(){
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('siteTheme', isLight?'dark':'light');
  applyTheme(!isLight);
}

// Проверяем логин
function checkLoginStatus(){
  const currentUser=localStorage.getItem("currentUser");
  const loginLink=document.getElementById("loginLink");
  const registerLink=document.getElementById("registerLink");
  const logoutBtn=document.getElementById("logoutBtn");

  if(currentUser){
    if(loginLink) loginLink.classList.add("hidden");
    if(registerLink) registerLink.classList.add("hidden");
    if(logoutBtn) logoutBtn.classList.remove("hidden");
  } else {
    if(loginLink) loginLink.classList.remove("hidden");
    if(registerLink) registerLink.classList.remove("hidden");
    if(logoutBtn) logoutBtn.classList.add("hidden");
  }
}
function setupLogoutBtn(){
  const logoutBtn=document.getElementById("logoutBtn");
  if(!logoutBtn)return;
  logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("currentUser");
    alert("Вы вышли из аккаунта");
    checkLoginStatus();
    location.reload();
  });
}

// Кнопка "Вверх"
function setupScrollTopBtn(btnId){
  const btn=document.getElementById(btnId);
  if(!btn)return;
  window.addEventListener("scroll",()=>{
    if(window.scrollY>300) btn.classList.add("show");
    else btn.classList.remove("show");
  });
  btn.addEventListener("click",()=>{
    window.scrollTo({top:0, behavior:"smooth"});
  });
}

// Typed-текст
function setupTypedText(words, typedTextId){
  const typedTextElement=document.getElementById(typedTextId);
  if(!typedTextElement)return;

  let index=0, wordIndex=0, currentWord="", isDeleting=false;

  function typeEffect(){
    const fullWord=words[wordIndex];
    if(!isDeleting){ currentWord=fullWord.substring(0,index+1); index++; }
    else { currentWord=fullWord.substring(0,index-1); index--; }
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

// Появление секции
function setupScrollAnimations(sectionId){
  const section=document.getElementById(sectionId);
  if(!section)return;
  function onScroll(){
    const rect=section.getBoundingClientRect();
    if(rect.top<window.innerHeight-100){
      section.classList.add("show");
      window.removeEventListener("scroll", onScroll);
    }
  }
  window.addEventListener("scroll",onScroll);
}

// Избранное / Сравнение
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
  let compareList=JSON.parse(localStorage.getItem('compare'))||[];
  if(!compareList.includes(carId)){
    compareList.push(carId);
    localStorage.setItem('compare',JSON.stringify(compareList));
    alert("Добавлено к сравнению!");
  } else {
    alert("Этот авто уже в списке сравнения!");
  }
}

// Catalog filters
function applyFilters(){}
function loadMoreCars(){}

// IntersectionObserver для карточек
function observeCards(selector){
  const cards=document.querySelectorAll(selector);
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.1});
  cards.forEach(card=>observer.observe(card));
}

/***********************************************
 * ЧАТ-БОТ
 ***********************************************/
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
      <input type="text" id="chatInput" placeholder="Введите сообщение..." />
      <button>Отправить</button>
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
    "директор":"Вы можете получить скидку, если являетесь другом директора.",
    "скидка":"У нас есть скидки для постоянных клиентов и друзей директора.",
    "оплата":"Принимаем наличные, карты, кредит. Для уточнения: 'кредит'?",
    "пока":"Спасибо за визит. Всего доброго!"
  };

  sendBtn.addEventListener('click',()=>{
    const msg=chatInput.value.trim().toLowerCase();
    if(!msg)return;
    chatMessages.innerHTML+=`<div><strong>Вы:</strong> ${msg}</div>`;
    chatInput.value='';
    setTimeout(()=>{
      let reply="Пока не знаю, как ответить...";
      if(answers[msg]) reply=answers[msg];
      chatMessages.innerHTML+=`<div style="color: #ffcc00;"><strong>Бот:</strong> ${reply}</div>`;
      chatMessages.scrollTop=chatMessages.scrollHeight;
    },700);
  });
}

/***********************************************
 * initApp — вызываем при загрузке
 ***********************************************/
function initApp(){
  // Применить тему из localStorage
  const savedTheme=localStorage.getItem('siteTheme');
  applyTheme(savedTheme==='light');

  // Проверить логин
  checkLoginStatus();
  setupLogoutBtn();

  // Запуск чат-бота
  setupChatBot();
}
