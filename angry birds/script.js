document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd','<center id="hi">Нажмите ENTER чтобы продолжить</center>');
var hi = document.getElementById('hi');
hi.style.display = 'block';
hi.style.fontSise = 72+"pt";

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', '<img src="pig.png" height=100px width=100px id="pig">');
var pig = document.getElementById('pig');
document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', '<img src="chuck.png" height=100px width=100px id="chuck">');
var chuck = document.getElementById('chuck');

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', '<div id="sO"></div>');
var sO= document.getElementById('sO');

var interval;

var eL = function(event){startGame(event)};
document.addEventListener("keydown",eL);
function startGame(event){
	if (event.keyCode == 13) {
		score = 0;
		setScore(0);

		hi.style.display = 'none';
		chuck.style.display = 'block';
		pig.style.display = 'block';
		sO.style.display = 'block';
		document.removeEventListener("keydown",eL);
		document.addEventListener("mousemove", mouseListener);

		spawnPig();
		setScore(0);
		tO.style.display ='block';
		timer = 10;
		setTimer(timer);


		
interval = setInterval(function(){cntdwn();}, 1000);
}
}
function cntdwn(){
	timer-=1;
	setTimer(timer);
	if (timer ==0){
	clearInterval(interval);
	document,removeEventListener('mousemove', mouseListener);
	hi.innerHTML = "Игра окончена, ваш результат: " +score+ 
	". <br> Чтобы начаиь заново нажмите ENTER";
	hi.style.display = 'block';
		chuck.style.display = 'none';
		pig.style.display = 'none';
		sO.style.display = 'none';
		document.addEventListener("keydown",eL);
		tO.style.display = 'none';

	}
}

                





pig.style.position = 'fixed';
spawnPig();
pig.style.display = 'none';

function spawnPig(){
	pig.style.left=Math.random()*(window.innerWidth-128) + 'px' ;
	pig.style.top=Math.random()*(window.innerHeight-128) + 'px';
}


chuck.style.position = 'fixed';
var mouseListener = function(event){mouseMoveFunc(event)};

chuck.style.display = 'none';

sO.style.textAlign = "center";
sO.style.fontSize = 30+ "pt";
var score=0;
sO.style.display = 'none';

function mouseMoveFunc(event){
	chuck.style.left=event.clientX - 65 + 'px';
	chuck.style.top=event.clientY - 65 + 'px';
	checkCollision();
}
function checkCollision(){
	console.log();
	if (
		Math.sqrt(Math.pow(chuck.offsetLeft - pig.offsetLeft,2) +
			Math.pow(chuck.offsetTop - pig.offsetTop,2)) <128
		)
	{
		spawnPig();
		score++;
		setScore(score);
	}
}

sO.style.color =' white';

function setScore(scoreToSet){
	sO.innerHTML = "Свиней поймано: "+scoreToSet;
}
 //var interval;
//interval = setInterval(function(){cntdwn();}, 1000);
//clearInterwal(interval);
var timer =10;
document.getElementsByTagName('body')[0].
insertAdjacentHTML('beforeEnd', '<center id="tO"></center>');
var tO = document.getElementById('tO');
tO.style.display = 'none';
tO.style.fontSise = 72+"pt";

function setTimer(timeToSet){
	console.log(timer);
	tO.innerHTML ="Осталось времени: "+ timeToSet;

}
