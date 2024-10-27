const app = document.querySelector('.app');

const dragon = document.querySelector('.display_tap');

const currentWallet = document.querySelector('#wallet_coin');

const currentEnergy = document.querySelector('#energy');

const lvlProg = document.querySelector('.level_progress');

const level = document.querySelector('#level');


// DataBase
const data = {
   coin:0,
   energy:1000, 
   profit:1,
   level:1, 
   level_progress:0,
   earn_per_tap:1
}


//functions

function handleGreeting(){

   let div = document.createElement('div'); //Создаем блок
   let img = document.createElement('img'); //Создаем изображение
   img.src = './img/hamster-poster.png';   //Вкладываем в img изображение
   div.classList.add('greating') ;    //Задаем  класс greating

   div.appendChild(img);
    
   document.body.appendChild(div)  //Добавляем на страницу 
   

   setTimeout(function(){
    div.remove();             //Удаляем приветственное окно
    app.style.display = 'flex'//Показываем наше приложение
   
   },6000)
}

function handleTap(e){
   if(data.energy > 0){
      data.coin = data.coin + data.earn_per_tap;
      data.energy = data.energy  - 1;
         currentWallet.innerHTML = data.coin;
         currentEnergy.innerHTML = data.energy;

         dragon.classList.add('tap_mode');

         let timer = setTimeout(() => {
            dragon.classList.remove('tap_mode');

            clearTimeout(timer);
         }, 100)
   }

      //adding coin when we tap

   const money = document.createElement('img');
   money.src = './img/hamster_coin.png';
   money.classList.add('money');
   app.appendChild(money);
      money.style.left = e.clientX + 'px';
      money.style.top = e.clientY + -50 + 'px';


         setTimeout(()=>{
            money.remove();
         }, 1000);


         upgradeLvl();
}

function earnPerSec(){
   let profitInterval = setInterval(()=>{
      data.coin = data.coin + data.profit;
      currentWallet.innerHTML = data.coin;
   }, 1000);
}

function energyRecovery(){
   let energyInterval = setInterval(function(){
      if(data.energy < 1000){
         data.energy = data.energy + 1;
         currentEnergy.innerHTML = data.energy;
      }
   }, 1000)
}

function upgradeLvl(){
   data.level_progress = data.level_progress + 1;
   lvlProg.style.width =  data.level_progress + '%';

   if(data.level_progress >= 100){
      data.level = data.level + 1;
      data.level_progress = 0;
      data.profit = data.profit + 2;

      data.earn_per_tap = data.earn_per_tap + 1;

      level.innerHTML = data.level;
   }

   data.level_progress = data.level_progress + 1;
      lvlProg.style.width =  data.level_progress + '%';
}


// function calls

handleGreeting(); 
earnPerSec();
energyRecovery();







//events

dragon.addEventListener('click', handleTap);