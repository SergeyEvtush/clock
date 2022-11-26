"use strict"

const clock = document.querySelector('.clock');
const clockWraper = clock.querySelector('.clock-wraper');
const hourData = clock.querySelectorAll('.hour');
const hourArrow = clock.querySelector('.arrow-hour');
const hourMinute = clock.querySelector('.arrow-minute');
const check = clock.querySelector('#choise');
const amCheck=clock.querySelector('#am');
const pmCheck = clock.querySelector('#pm');
const labelPm = clock.querySelector('.pm~label');
const labelAm = clock.querySelector('.am-pm-block__am>label');
const labelMinutes = clock.querySelector('.choise-block>label');
const time = {
	"hour": 13,
	"minute": 0,
	"dayTime":"am"
};

console.log(labelMinutes);

check.addEventListener('click', () => {
		
	choiseMinutes(check, labelMinutes);
});
function choiseMinutes(checkBox, label) {
	label.classList.toggle('active')
	checkBox.checked = true;
	label.innerText = "Для установки часов кликните на надпись ниже"
	if(!labelMinutes.classList.contains('active')) {
		checkBox.checked = false;
		label.innerText = "Для установки минут кликните на флажок"
	 }
 }



hourArrow.style.transformOrigin = 'bottom';
hourArrow.style.transform = `rotateZ(30deg)`;
hourData.forEach((hour) => {
	hour.addEventListener('click', (e) => {
		
		let valHour = 0;
		console.log(valHour);
		valHour = e.target.getAttribute('data-time');
		let angle = valHour * 30;
		let minute = 0;
		if (check.checked == true) {
			hourMinute.style.transformOrigin = 'bottom';
			hourMinute.style.transform = `rotateZ(${angle}deg)`;
			minute = valHour * 5;
			
		} else {
			hourArrow.style.transformOrigin = 'bottom';
			hourArrow.style.transform = `rotateZ(${angle}deg)`;
		}
		time.hour = valHour;
		time.minute = minute;
		if (pmCheck.checked == true) {
			time.dayTime = 'pm';
			amCheck.checked = false;
				
				
		} else {
			time.dayTime = 'am';
			pmCheck.checked == false;
		}
		
		console.log(time);
			
	});
});
function moveArrow(param1, param2, elem,event) {
	const x2 = event.clientX
	const y2 = event.clientY
		const angle =Math.floor ( 180*(( Math.atan2(y2 - param1,x2 - param2 ) )) / Math.PI );
		elem.style.transformOrigin = '';
		elem.style.transform = ``;
		elem.style.transformOrigin = 'bottom';
		elem.style.transform = `rotateZ(${angle}deg)`;
 }
//получение угла
function getDegreeElementById(element){
	    /* var element = document.getElementById(id_element); */
	const style = window.getComputedStyle(element, null);
	    // получаем значение стилей
	const valueStyle = style.getPropertyValue("-webkit-transform") ||
	        style.getPropertyValue("-moz-transform") ||
	        style.getPropertyValue("-ms-transform") ||
	        style.getPropertyValue("-o-transform") ||
	        style.getPropertyValue("transform");
	    // если стилей нет, то угол 0 градусов
	    if(valueStyle == 'none') return 0;
	    // разбираем полученное значение
	    console.log(valueStyle);
	    var values = valueStyle.split('(')[1];
	    values = values.split(')')[0];
	    values = values.split(',');
	    // получаем синус и косинус
	    var cos = values[0];
	    var sin = values[1];
	    // вычисляем угол
	    var degree = Math.round(Math.asin(sin) * (180/Math.PI));
	    if(cos<0){
	     let   addDegree = 90 - Math.round(Math.asin(sin) * (180/Math.PI));
	        degree = 90 + addDegree;
	    }
	    if(degree < 0){
	        degree = 360 + degree;
	    }
	    return degree;
	}







hourArrow.addEventListener('mousedown', (e) => {
	let x1, y1;
	let m;
	
	hourArrow.classList.add('active');
	if (hourArrow.classList.contains('active')) { 
			x1 = e.clientX
			y1 = e.clientY
		clockWraper.addEventListener('mousemove',  m=(e)=> {
			moveArrow(y1, x1, hourArrow, e);
		 })
	}
	clockWraper.addEventListener('click', (e) => {
		console.log();
		clockWraper.removeEventListener('mousemove', m, false)
		console.log(getDegreeElementById(hourArrow));
		
	})
})



hourMinute.addEventListener('mousedown', (e) => {
	let x1, y1;
	let m;
	
	hourMinute.classList.add('active');
	if (hourMinute.classList.contains('active')) { 
			x1 = e.clientX
			y1 = e.clientY
		clockWraper.addEventListener('mousemove',  m=(e)=> {
			moveArrow(y1, x1, hourMinute, e);
		 })
	}
	clockWraper.addEventListener('click', (e) => {
		console.log();
		clockWraper.removeEventListener('mousemove', m, false)
		console.log(getDegreeElementById(hourMinute));
		
	})
})
/*--------------------------------------- */

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
	 const calendar = document.querySelector('.calendar-wraper');
	 const daysAll = document.querySelectorAll('.day');
	 const mothName=document.querySelector('.month-name')
	 daysAll.forEach((day) => { 
		 day.addEventListener('click', (e) => { 
			 e.preventDefault();
			 calendar.classList.add('clock-active');
			 clock.classList.add('clock-active');
			 console.log(day.innerHTML);
			 console.log(mothName.innerHTML);
			 
			 
		 });
	 });
 }
 // Получить элемент по id
 function getId(id) {
	return document.getElementById(id);
}







