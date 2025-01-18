/***********************************************
 *  app.js: Общая логика и анимации для всех страниц
 ***********************************************/

// Переключение темы
function applyTheme(isLight) {
    if(isLight) document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');
  }
  
  function toggleTheme(){
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('siteTheme', isLight? 'dark':'light');
    applyTheme(!isLight);
  }
  
  // Проверка логина (currentUser)
  function checkLoginStatus(){
    const currentUser = localStorage.getItem('currentUser');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutBtn = document.getElementById('logoutBtn');
  
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
  
  // Кнопка "Выход"
  function setupLogoutBtn(){
    const logoutBtn = document.getElementById('logoutBtn');
    if(!logoutBtn) return;
    logoutBtn.addEventListener('click', ()=>{
      localStorage.removeItem('currentUser');
      alert("Вы вышли из аккаунта");
      checkLoginStatus();
      location.reload();
    });
  }
  
  // Typed-текст (пример)
  function setupTypedText(words, typedTextElementId){
    let index=0, wordIndex=0, currentWord="", isDeleting=false;
    const typedTextElement = document.getElementById(typedTextElementId);
    if(!typedTextElement) return;
  
    function typeEffect(){
      const fullWord=words[wordIndex];
      if(!isDeleting) { currentWord=fullWord.substring(0,index+1); index++; }
      else { currentWord=fullWord.substring(0,index-1); index--; }
  
      typedTextElement.textContent=currentWord;
  
      if(!isDeleting && index===fullWord.length){
        isDeleting=true;
        setTimeout(typeEffect,1000);
      } else if(isDeleting && index===0){
        isDeleting=false;
        wordIndex=(wordIndex+1)%words.length;
        setTimeout(typeEffect,200);
      } else {
        const speed=isDeleting?50:100;
        setTimeout(typeEffect,speed);
      }
    }
    typeEffect();
  }
  
  // Плавное появление секции (advantages)
  function setupScrollAnimations(sectionId){
    const section = document.getElementById(sectionId);
    if(!section) return;
    function onScroll(){
      const rect=section.getBoundingClientRect();
      if(rect.top<window.innerHeight-100){
        section.classList.add('show');
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll);
  }
  
  // Кнопка "Вверх"
  function setupScrollTopBtn(btnId){
    const btn=document.getElementById(btnId);
    if(!btn) return;
    window.addEventListener('scroll', ()=>{
      if(window.scrollY>300){
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });
    // onclick="..."
  }
  
  // Catalog: Избранное, Сравнение, Load More, Фильтр, ...
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
  
  function applyFilters(){
    // Реализация — смотрите пример catalog.html
  }
  
  function loadMoreCars(){
    // Реализация — смотрите пример catalog.html
  }
  
  // Анимация появления карточек (IntersectionObserver)
  function observeCards(selector){
    const cards = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries)=>{
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
   * ИНИЦИАЛИЗАЦИЯ (вызываем из <script> в HTML)
   ***********************************************/
  
  function initApp(){
    // 1) Применяем сохранённую тему
    const savedTheme=localStorage.getItem('siteTheme');
    applyTheme(savedTheme==='light');
  
    // 2) Проверяем логин
    checkLoginStatus();
    setupLogoutBtn();
  }
  