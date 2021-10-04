const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');
const scoreLive = document.querySelector(".scoreLive");
const killsLive = document.querySelector(".killsLive");
const levelLive = document.querySelector(".levelLive");
const levelNew = document.querySelector(".level");
const volume = document.querySelector("#volume");
const start = document.querySelector(".start-button");
const buttons = document.querySelector(".buttons");
const name = document.querySelector(".name");
const nameWarning = document.querySelector(".nameWarning");
const nameContainer = document.querySelector(".nameContainer");
let reset;
let playerName;
let topScores = {};
let score = 0;
let highScore = 0;
let kills = 0;
let level = 1;
let hard = 3;
let border = 1000;
let slowTime = false;
let timer = 10;
canvas.width = 800;
canvas.height = 500;

const keys = [];

const playerSprite = new Image();
playerSprite.src = "img/player.png";
const background = new Image();
background.src = "img/background.png"
const policeSprite = new Image();
policeSprite.src = "img/police.png"
const detectiveSprite = new Image();
detectiveSprite.src = "img/detective.png"
const specialSprite = new Image();
specialSprite.src = "img/special.png"
const nutelaSprite = new Image();
nutelaSprite.src = "img/nutela.png";
const cokoladaSprite = new Image();
cokoladaSprite.src = "img/cokolada.png";
const kinderSprite = new Image();
kinderSprite.src = "img/kinder.png";
const livesSprite = new Image();
livesSprite.src = "img/livesSprite.png";
const timeSprite = new Image();
timeSprite.src = "img/sat.png"; 
const timeSprite2 = new Image();
timeSprite2.src = "img/sat2.png"; 
const shieldSprite = new Image();
shieldSprite.src = "img/stit.png";
const electricSprite = new Image();
electricSprite.src = "img/electric.png";
const killSound = new Audio();
killSound.src = "sound/kill.mp3";
killSound.volume = 0.5;
const electricKill = new Audio();
electricKill.src = "sound/electriczap.mp3";
electricKill.volume = 0.5;
const lifeUp = new Audio();
lifeUp.src = "sound/lifeUp.mp3"
lifeUp.volume = 0.5;
const timeUp = new Audio();
timeUp.src = "sound/collecttime.mp3";
timeUp.volume = 0.5;
const shieldUp = new Audio();
shieldUp.src = "sound/collectshield.mp3"
shieldUp.volume = 0.5;
const slowTimePress = new Audio();
slowTimePress.src = "sound/slowTime.mp3"
slowTimePress.volume = 0.5;
const fail = new Audio();
fail.src = "sound/fail.wav";
fail.volume = 0.5;
const over = new Audio();
over.src = "sound/gameOver.wav";
over.volume = 0.5;
const music = new Audio();
music.src = "sound/music.mp3";
music.volume = 0.5;
music.loop = true;


function drawSprite(img, sX,sY,sW,sH,dX,dY,dW,dH){
	ctx.drawImage(img, sX,sY,sW,sH,dX,dY,dW,dH);
}


window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
	if(	keys[38] || keys[87] ||
		keys[40] || keys[83] ||
		keys[37] || keys[65] ||
		keys[39] || keys[68]){
	player.moving = true;}

})
window.addEventListener("keyup", function(e){
	keys[e.keyCode] = false;
	player.moving = false;	

})

window.addEventListener("keypress", function(e){
	if(keys[32] && time.count > 0 && !slowTime){
		slowTime = true;
		time.count--;		
		countdownTime();
		slowTimePress.play();
	}
})

function createResetElement() {
	var resetButton = document.createElement("div");
	var button = document.createElement("div");
	button.innerText = "Reset";
	resetButton.className = "reset-button flex-container margin";
	resetButton.appendChild(button);
	return resetButton;
}


start.addEventListener("mousedown", function() {
	playerName = name.value;
	if(playerName){
		nameContainer.removeChild(name);
		nameWarning.innerText = "";
		start.classList.add('start-button-press');
		start.classList.remove('start-button');
		start.addEventListener('click', function() {
		startAnimating(100);
		music.play();
		buttons.replaceChild(createResetElement(), start);	
		reset = document.querySelector(".reset-button");
		reset.addEventListener("mousedown", function(){
			reset.classList.add('reset-button-press');
			reset.classList.remove('reset-button');
			reset.addEventListener('click', function() {
			window.location.reload(false);
			})
		})
	})
	} else {
		nameWarning.innerText = "Please insert your name";
	}
})

volume.addEventListener("input", function(e){
	music.volume = volume.value / 100;	
	electricKill.volume = volume.value / 100;
	lifeUp.volume = volume.value / 100;
	timeUp.volume = volume.value / 100;
	shieldUp.volume = volume.value / 100;
	slowTimePress.volume = volume.value / 100;
	fail.volume = volume.value / 100;
	over.volume = volume.value / 100;
	killSound.volume = volume.value / 100;
});

const countdownTime = () => {
	setTimeout(function (){
				slowTime = false;
			}, 10000)
}

let countdownShield;

const downTimer = () =>{ 
countdownShield = setInterval(function(){
  if(shield.count < 1){
    clearInterval(countdownShield);
    shield.on = false;
  }else shield.count -= 1;  
}, 1000);}


///////////////////////////PLAYER


const player = {
	x: 300,
	y: 200,
	width: 40,
	height: 72,
	frameX: 0,
	frameY: 0,
	speed: 8,
	moving: false
};

function movePlayer(){
	if((keys[38] || keys[87]) 
		&& (player.y > 120 || player.x > 250)
		&& player.y > 0) {
		player.y -= player.speed;
		player.frameY = 3;
		player.moving = true;		
	}
	if((keys[40] || keys[83]) && player.y < canvas.height - player.height){
		player.y += player.speed;
		player.frameY = 0;
		player.moving = true;
	}
	if((keys[37] || keys[65]) 
		&& (player.y > 120 || player.x > 250)
		&& player.x > 0){
		player.x -= player.speed;
		player.frameY = 1;
		player.moving = true;
	}
	if((keys[39] || keys[68]) && player.x < canvas.width - player.width){
		player.x += player.speed;
		player.frameY = 2;
		player.moving = true;
	}
}


function walk(){
	if(player.frameX < 3 && player.moving) player.frameX++;
	else player.frameX = 0;
}

///////////////////////////ENEMIES

class Detective {
	constructor(width, height, x, y, frameX, frameY, speed, slowSpeed, fastSpeed, sprite, alive, blink){
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.frameX = frameX;
		this.frameY = frameY;
		this.speed = speed;
		this.slowSpeed = slowSpeed;
		this.fastSpeed = fastSpeed;
		this.sprite = sprite;
		this.alive = alive;
		this.blink = blink;

	}
}

const enemiesSkin = [policeSprite, detectiveSprite, policeSprite, policeSprite, specialSprite, detectiveSprite,
 policeSprite, detectiveSprite, policeSprite, policeSprite, detectiveSprite];
let enemies = [];

function spawnEnemies(){
		const width = 40;
		const height = 72;
		const x = canvas.width + Math.floor(Math.random()*1000 + 100);
		const y =  Math.floor((Math.random() * (canvas.height - 100) + 10));
		const frameY = 1;
		const frameX = 0;
		const sprite = enemiesSkin[Math.round(Math.random()*10)];
		let speed;
		const alive = true;	
		const blink = true;	
		if (sprite === policeSprite){
			speed = 2;
		} else if(sprite === detectiveSprite){
			speed = 3;
		} else {speed = 5}
		const slowSpeed = speed / 2;
		const fastSpeed = speed;
		enemies.push(new Detective(width, height, x, y, frameX, frameY, speed, slowSpeed, fastSpeed, sprite, alive, blink));

}

function moveDetective(det, i){

det.speed = slowTime? det.slowSpeed : det.fastSpeed;
   
	if(!det.alive) {	

		setTimeout(function(){ det.blink = false }, 1000);	
		det.frameY = 0;		
        enemies = enemies.filter(det => det.blink === true);	
    }

	if (det.alive) {
		det.x -= det.speed;
	}
	if(det.frameX < 3) det.frameX++;
	else det.frameX = 0;
	if(
		   det.alive 
		&& det.x < player.x + 50 
		&& det.y < player.y 
		&& det.y > player.y - 50
		&& det.y > 0
		){
		det.y -= det.speed;
	}
	if(
		    det.alive 
		&& det.x < player.x + 70 
		&& det.y > player.y 
		&& det.y < player.y + 100
		&& det.y < canvas.height - det.height
		){
		det.y += det.speed;
	}
	if(    det.alive 
		&& det.x < player.x + 10 
		&& det.x > player.x - 10 
		&& det.y < player.y + 60 
		&& det.y > player.y - 10
		){
		kills += 1;
		killsLive.innerText = kills;
		det.alive = false;
		killSound.pause();
		killSound.currentTime = 0;		
		killSound.play();
	} else if(det.x < 0){
		enemies.splice(i, 1);
	} else if(det.y < 120 && det.x < 250 && shield.on === false){
		enemies.splice(i, 1);
		lifeDown();
	} else if(det.y < 120 && det.x < 250 && shield.on === true){
		kills += 1;
		killsLive.innerText = kills;
		enemies.splice(i, 1);
		electricKill.pause();
		electricKill.currentTime = 0;		
		electricKill.play();
	}


	for (var i = 0; i < candies.length; i++) {
		if(
			det.alive 
			&& det.x < candies[i].x + 20 
			&& det.x > candies[i].x - 20 
			&& det.y < candies[i].y + 20 
			&& det.y > candies[i].y - 60) {
			score -= candies[i].points * 2;
			scoreLive.innerText = score;
			candies[i].det = true;
			}		
		if(
		   det.alive 
		&& det.x < candies[i].x + 50 
		&& det.y < candies[i].y 
		&& det.y > candies[i].y - 50
		&& det.y > 0
		){
		det.y += det.speed;
	}
	if(
		   det.alive
		&& det.x < candies[i].x + 70 
		&& det.y > candies[i].y 
		&& det.y < candies[i].y + 100
		&& det.y < canvas.height - det.height
		){
		det.y -= det.speed;
	}	
	}
}

///////////////////////////CANDIES

class Candy {
	constructor(sprite, width, height, x, y, speed, points, det){
		this.sprite = sprite;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.points = points;
		this.det = det;

	}
}

const candyobj = {
		nutela: {
		sprite: nutelaSprite,
		width: 30,
		height: 35,
		x: Math.floor(Math.random()*250),
		y: 3000,
		speed: 2,
		points: 100,
	},

	 cokolada: {
	 	sprite: cokoladaSprite,
		width: 30,
		height: 45,
		x: Math.floor(Math.random()*250),
		y: 1000,
		speed: 4,
		points: 20,
		
	},
	 kinder: {
	 	sprite: kinderSprite,
		width: 30,
		height: 39,
		x: Math.floor(Math.random()*250),
		y: 2000,
		speed: 3,
		points: 50,
	}
}

const candySkins = ["cokolada", "nutela", "kinder", "cokolada", "cokolada", "cokolada", "kinder",];
let candies = [];
let randomCandy;

function spawnCandy() {
	randomCandy = candySkins[Math.round(Math.random()*6)];
	const {sprite} = candyobj[randomCandy];
	const {width} = candyobj[randomCandy];
	const {height} = candyobj[randomCandy];
	const x = Math.floor(Math.random()*250);
	const y = canvas.height + Math.floor(Math.random()* candyobj[randomCandy].y + 100);
	const {speed} = candyobj[randomCandy];
	const {points} = candyobj[randomCandy];
	const det = false;
	candies.push(new Candy(sprite, width, height, x, y, speed, points, det));
}

function moveCandy(c, i){
	c.y -= c.speed;
	if (c.y < 120) {
		score += c.points;
		scoreLive.innerText = score;
		if(score > highScore) highScore = score;
		candies.splice(i, 1)
	}
	if(c.det === true){	
      candies = candies.filter(c => c.det === false);	
    }
}				



///////////////////////////LIVES, TIME and SHIELD

const lives = {
	count: 3,
	x: Math.floor(Math.random() * 700 + 50),
	y: -600,
	width: 210,
	height: 150,
	frameX: 0,
	frameY: 0,
	speed: 2,
};

const time = {
	count: 0,
	x: Math.floor(Math.random() * 700 + 50),
	y: -800,
	width: 140,
	height: 140,
	frameX: 0,
	frameY: 0,
	speed: 2,
};

const shield = {
	count: 0,
	x: Math.floor(Math.random() * 700 + 50),
	y: -700,
	width: 160,
	height: 186,
	frameX: 0,
	frameY: 0,
	speed: 2,
	on: false,
};

const electric = {
	x: -30,
	y: -10,
	width: 320,
	height: 190,
	frameX: 0,
	frameY: 0,
};

function getScores() {
	fetch('https://guarded-depths-46761.herokuapp.com/score', {
    method: 'post',
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(data => {
  	topScores = data;  	
  })
  .catch(err => console.log('Something went wrong'))
}

function sendScores() {
	fetch('https://guarded-depths-46761.herokuapp.com/scoreadd', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
     	name: playerName,
     	score: highScore
      })            
  })
  .then(res => res.json())
  .catch(err => console.log('Something went wrong'))
}

function lifeDown(){
	if(!shield.on){
	lives.count -= 1;
	lives.frameX += 1;
	fail.play();
}
	if(lives.count === 0) {
		music.pause();	
		over.play();
		sendScores();	
		getScores();
	}
}

function moveLives(){
	lives.y += lives.speed;
	if (lives.x < player.x + 10 &&
		lives.x > player.x - 10 &&
		lives.y < player.y + 60 &&
		lives.y > player.y - 10) {
		lives.count += 1;
		lives.frameX -= 1;
		lifeUp.play();
		lives.y = -(Math.floor(Math.random() * 3000 + 100));
		lives.x = Math.floor(Math.random() * 700 + 50);
} 	if(lives.y > canvas.height){
	lives.y = -(Math.floor(Math.random()*3000 + 100));
	lives.x = Math.floor(Math.random() * 700 + 50);
}
}

function moveTime(){
	if(time.count < 3) time.y += time.speed;
	if (time.x < player.x + 10 &&
		time.x > player.x - 10 &&
		time.y < player.y + 60 &&
		time.y > player.y - 10) {
		time.count += 1;
		timeUp.play();
		time.y = -(Math.floor(Math.random() * 3000 + 300));
		time.x = Math.floor(Math.random() * 700 + 50);
} 	if(time.y > canvas.height){
	time.y = -(Math.floor(Math.random() * 3000 + 300));
	time.x = Math.floor(Math.random() * 700 + 50);
}
}

function moveShield(){
	shield.y += shield.speed;
	if (shield.x < player.x + 10 &&
		shield.x > player.x - 10 &&
		shield.y < player.y + 60 &&
		shield.y > player.y - 10 &&
		shield.on === false) {
		shield.on = true;
		shield.count += 10;
		shieldUp.play();
		downTimer();
		shield.y = -(Math.floor(Math.random() * 3000 + 100));
		shield.x = Math.floor(Math.random() * 700 + 50);
	}
	if (shield.x < player.x + 10 &&
		shield.x > player.x - 10 &&
		shield.y < player.y + 60 &&
		shield.y > player.y - 10 &&
		shield.on === true) {
		shield.count += 10;
  		shieldUp.play();	
		shield.y = -(Math.floor(Math.random()* 3000 + 100));
		shield.x = Math.floor(Math.random() * 700 + 50);
	}	
 	if(shield.y > canvas.height){
	shield.y = -(Math.floor(Math.random()* 3000 + 100));
	shield.x = Math.floor(Math.random() * 700 + 50);
}
}

function gameOver() {
	ctx.font = "40px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText('GAME OVER', 400, 120);
	ctx.font = "15px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(`Your highest score was ${highScore} and you got to level ${level}`, 400, 160);
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";	
	ctx.fillText("Press RESET to play again!", 400, 210);
}

function printHighScores(){
	let h = 220;
	for (let i = 0; i < topScores.length; i++) {
	h += 25;
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	ctx.fillText(`${i+1}. ${topScores[i].name} ${topScores[i].score}`, 280, h);
	}
}

function noName() {
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText('PLEASE ENTER', 400, 200);
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText('YOUR NAME', 400, 250);
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";	
	ctx.fillText("TO START THE GAME", 400, 300);
}

function numbers(){
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillText(lives.count, 46, 48);
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillText(time.count, 107, 48);
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.font = "20px 'Press Start 2P'";
	ctx.fillText(shield.count, 163, 48);
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
}

///////////////////////////LEVEL

function levelUp(){
	hard += 1;
	level += 1;	
	levelLive.innerText = level;
	border += 1000;	
}

function animateLevel() {
	levelNew.classList.add('animate__heartBeat', 'levelUp');
	levelNew.addEventListener('animationend', () => {
	levelNew.classList.remove('animate__heartBeat', 'levelUp');
});
}


///////////////////////////FPS

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
	fpsInterval = 1000/fps;
	then = Date.now();
	startTime = then;
	animate();
}


///////////////////////////ANIMATE


function animate(){
	ctx.drawImage(background, 0, 0 ,canvas.width, canvas.height);
	requestAnimationFrame(animate);

	if(!playerName){
		noName()
	} else {

		now = Date.now();
			elapsed = now - then;
			if(elapsed > fpsInterval){
				then = now - (elapsed % fpsInterval);
			
		if(enemies.length < hard) spawnEnemies();
		if(candies.length < 6) spawnCandy();

		if(electric.frameX < 3) electric.frameX++;
		else electric.frameX = 0;

		if(score > border) {
			levelUp();
			animateLevel();
		}

		if (lives.count){			
		if(lives.count < 3) moveLives();
		if(time.count < 3) moveTime();

		moveShield();

		if(shield.on)drawSprite(
			electricSprite, electric.width * electric.frameX, electric.height * electric.frameY, electric.width, electric.height,
			electric.x, electric.y, electric.width, electric.height
			);

		drawSprite(
			playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
			player.x, player.y, player.width, player.height
			);
		drawSprite(
			livesSprite, lives.width * lives.frameX, lives.height * lives.frameY, lives.width, lives.height,
			10, 10, 70, 50
			);
			
		drawSprite(
			timeSprite2, 0, 0, time.width, time.height,
			80, 10, 50, 50
			);

		drawSprite(
			shieldSprite, 0, 0, shield.width, shield.height,
			140, 10, 43, 55
			);

		numbers();

		drawSprite(
			livesSprite, 0, 0, lives.width, lives.height,
			lives.x, lives.y, 35, 25
			);

		drawSprite(
			timeSprite, 0, 0, time.width, time.height,
			time.x, time.y, 35, 35
			);

		drawSprite(
			shieldSprite, 0, 0, shield.width, shield.height,
			shield.x, shield.y, 35, 41
			);

		if(slowTime)drawSprite(
			timeSprite, 0, 0, time.width, time.height,
			player.x + 10, player.y - 20, 20, 20
			);

		
		for (var i = 0; i < candies.length; i++) {
			drawSprite(
			candies[i].sprite, 0, 0, candies[i].width, candies[i].height,
			candies[i].x, candies[i].y, candies[i].width, candies[i].height
			);
			moveCandy(candies[i], i);
		}
		for (var i = 0; i < enemies.length; i++) {
			drawSprite(
			enemies[i].sprite, enemies[i].width * enemies[i].frameX, enemies[i].height * enemies[i].frameY, enemies[i].width, enemies[i].height,
			enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height
			);	
			moveDetective(enemies[i], i);
		}

		movePlayer();
		walk();	
		} else {
		if(topScores.length) {
			printHighScores();
		}
		gameOver();	
		}
		}

	}

}


