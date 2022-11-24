"use strict"
const Cal = function(divId) {
	//Сохраняем идентификатор div
	this.divId = divId;
	// Дни недели с понедельника
	this.DaysOfWeek = [
	  'Пн',
	  'Вт',
	  'Ср',
	  'Чтв',
	  'Птн',
	  'Суб',
	  'Вск'
	];
	// Месяцы начиная с января
	this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	//Устанавливаем текущий месяц, год
	const d = new Date();
	this.currMonth = d.getMonth();
	this.currYear = d.getFullYear();
	this.currDay = d.getDate();
 };
 // Переход к следующему месяцу
 Cal.prototype.nextMonth = function() {
	if ( this.currMonth == 11 ) {
	  this.currMonth = 0;
	  this.currYear = this.currYear + 1;
	}
	else {
	  this.currMonth = this.currMonth + 1;
	}
	this.showcurr();
 };
 // Переход к предыдущему месяцу
 Cal.prototype.previousMonth = function() {
	if ( this.currMonth == 0 ) {
	  this.currMonth = 11;
	  this.currYear = this.currYear - 1;
	}
	else {
	  this.currMonth = this.currMonth - 1;
	}
	this.showcurr();
 };
 // Показать текущий месяц
 Cal.prototype.showcurr = function() {
	this.showMonth(this.currYear, this.currMonth);
 };
 // Показать месяц (год, месяц)
 Cal.prototype.showMonth = function(y, m) {
	var d = new Date()
	// Первый день недели в выбранном месяце 
	, firstDayOfMonth = new Date(y, m, 7).getDay()
	// Последний день выбранного месяца
	, lastDateOfMonth =  new Date(y, m+1, 0).getDate()
	// Последний день предыдущего месяца
	, lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
	var html = '<table>';
	// Запись выбранного месяца и года
	html += '<thead><tr>';
	html += '<td colspan="7" class="month-name">' + this.Months[m] + ' ' + y + '</td>';
	html += '</tr></thead>';
	// заголовок дней недели
	html += '<tr class="days">';
	for(var i=0; i < this.DaysOfWeek.length;i++) {
	  html += '<td>' + this.DaysOfWeek[i] + '</td>';
	}
	html += '</tr>';
	// Записываем дни
	var i=1;
	do {
	  var dow = new Date(y, m, i).getDay();
	  // Начать новую строку в понедельник
	  if ( dow == 1 ) {
		 html += '<tr>';
	  }
	  // Если первый день недели не понедельник показать последние дни предыдущего месяца
	  else if ( i == 1 ) {
		 html += '<tr>';
		 var k = lastDayOfLastMonth - firstDayOfMonth+1;
		 for(var j=0; j < firstDayOfMonth; j++) {
			html += '<td class="not-current day">' + k + '</td>';
			k++;
		 }
	  }
	  // Записываем текущий день в цикл
	  var chk = new Date();
	  var chkY = chk.getFullYear();
	  var chkM = chk.getMonth();
	  if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
		 html += '<td class="today day">' + i + '</td>';
	  } else {
		 html += '<td class="normal day">' + i + '</td>';
	  }
	  // закрыть строку в воскресенье
	  if ( dow == 0 ) {
		 html += '</tr>';
	  }
	  // Если последний день месяца не воскресенье, показать первые дни следующего месяца
	  else if ( i == lastDateOfMonth ) {
		 var k=1;
		 for(dow; dow < 7; dow++) {
			html += '<td class="not-current day">' + k + '</td>';
			k++;
		 }
	  }
	  i++;
	}while(i <= lastDateOfMonth);
	// Конец таблицы
	html += '</table>';
	// Записываем HTML в div
	document.getElementById(this.divId).innerHTML = html;
 };
 // При загрузке окна
 window.onload = function() {
	// Начать календарь
	var c = new Cal("divCal");			
	c.showcurr();
	// Привязываем кнопки «Следующий» и «Предыдущий»
	getId('btnNext').onclick = function() {
	  c.nextMonth();
	};
	getId('btnPrev').onclick = function() {
	  c.previousMonth();
	 };
	 const daysAll = document.querySelectorAll('.day');
	 const mothName=document.querySelector('.month-name')
	 daysAll.forEach((day) => { 
		 day.addEventListener('click', (e) => { 
			 e.preventDefault();
			 console.log(day.innerHTML);
			 console.log(mothName.innerHTML);
			 
			 
		 });
	 });
 }
 // Получить элемент по id
 function getId(id) {
	return document.getElementById(id);
}
function displayCanvas(){
	var canvasHTML = document.getElementById('myCanvas');
	var contextHTML = canvasHTML.getContext('2d');
	contextHTML.strokeRect(0,0,canvasHTML.width, canvasHTML.height);
  
	//Расчет координат центра и радиуса часов
	var radiusClock = canvasHTML.width/2 - 10;
	var xCenterClock = canvasHTML.width/2;
	var yCenterClock = canvasHTML.height/2;
  
	//Очистка экрана. 
	contextHTML.fillStyle = "#ffffff";
	contextHTML.fillRect(0,0,canvasHTML.width,canvasHTML.height);
  
	//Рисуем контур часов
	contextHTML.strokeStyle =  "#000000";
	contextHTML.lineWidth = 1;
	contextHTML.beginPath();
	contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.stroke();
	contextHTML.closePath();
  
	//Рисуем рисочки часов
	var radiusNum = radiusClock - 10; //Радиус расположения рисочек	
	var radiusPoint;
	for(var tm = 0; tm < 60; tm++){
	 contextHTML.beginPath();
	 if(tm % 5 == 0){radiusPoint = 5;}else{radiusPoint = 2;} //для выделения часовых рисочек
	 var xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
	 var yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
	 contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
	 contextHTML.stroke();
	 contextHTML.closePath();
	} 
  
	//Оцифровка циферблата часов
	for(var th = 1; th <= 12; th++){
  contextHTML.beginPath();
  contextHTML.font = 'bold 25px sans-serif';
  var xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/180) + Math.PI/2);
  var yText = yCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/180) + Math.PI/2);
  if(th <= 9){
	  contextHTML.strokeText(th, xText - 5 , yText + 10);
  }else{
	  contextHTML.strokeText(th, xText - 15 , yText + 10);
  }
		 contextHTML.stroke();
  contextHTML.closePath();	
	}

  
	//Рисуем стрелки
	var lengthSeconds = radiusNum - 10;
	var lengthMinutes = radiusNum - 15;
	var lengthHour = lengthMinutes / 1.5;
	var d = new Date();                //Получаем экземпляр даты
	var t_sec = 6*d.getSeconds();                           //Определяем угол для секунд
	var t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds()); //Определяем угол для минут
	var t_hour = 30*(d.getHours() + (1/60)*d.getMinutes()); //Определяем угол для часов
  
	//Рисуем секунды
	contextHTML.beginPath();
	contextHTML.strokeStyle =  "#FF0000";
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
			  yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
	contextHTML.stroke();
	contextHTML.closePath();

	//Рисуем минуты
	contextHTML.beginPath();
	contextHTML.strokeStyle =  "#000000";
	contextHTML.lineWidth = 3;
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
				yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
	contextHTML.stroke();
	contextHTML.closePath();

	//Рисуем часы
	contextHTML.beginPath();
	contextHTML.lineWidth = 5;
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
				yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
	contextHTML.stroke();
	contextHTML.closePath();	
  
	//Рисуем центр часов
	contextHTML.beginPath();
	contextHTML.strokeStyle =  "#000000";
	contextHTML.fillStyle = "#ffffff";
	contextHTML.lineWidth = 3;
	contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
	contextHTML.stroke();
	contextHTML.fill();
	contextHTML.closePath();
	 
	return;
}


window.onload = function(){
	window.setInterval(
  function(){
	  var d = new Date();
	  document.getElementById("clock").innerHTML = d.toLocaleTimeString();
	  displayCanvas();
  }
	, 1000);
}