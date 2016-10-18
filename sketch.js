var ball = [];
var bat = [];
var scoreL = 0;
var scoreR = 0;
var a = 0;
var b = 0;
var offset;
var r;
var start = false;
var end = false;
var f;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);
	rectMode(CENTER);
	offset = random(-2,2);
	for(var i = 0; i < 2; i++) {
		bat[i] = new Bat();
	}
	for(var i = 0; i < 1; i++) {
		ball[i] = new Ball();
	}
	bat[0].posX = 100;
	bat[0].posY = height/2;
	bat[1].posX = width - 100;
	bat[1].posY = height/2;
	ball[0].posX = width/2;
	ball[0].posY = height/2;
	r = new restart();
	f = new endGame();
}

function draw() {

	background(200);

	if (!start) {

		if (!end) {
			fill(100);

			textAlign(CENTER);
			textSize((width/height)*70);
			text("Click mouse to start", width/2, height/2);
			textSize((width/height)*20);
			text("W = up, S = down", width/4, height/4);
			text("Y = up, S = down", width*3/4, height/4);
			text("R to set off ball", width/2, height*3/4);

			if (mouseIsPressed) {
				background(100);
			}
		}

		if (end) {
			if (scoreL > scoreR) {
				fill(100);
				textAlign(CENTER);
				textSize((width/height)*70);
				text("Player 1 wins", width/2, height/2);
				textSize((width/height)*20);
				text("Click mouse to reset", width/2, height*3/4);

			}
			if (scoreL < scoreR) {
				fill(100);
				textAlign(CENTER);
				textSize((width/height)*70);
				text("Player 2 wins", width/2, height/2);
				textSize((width/height)*20);
				text("Click mouse to reset", width/2, height*3/4);

			}
			if (scoreL == scoreR) {
				fill(100)
				textAlign(CENTER);
				textSize((width/height)*70);
				text("DRAW", width/2, height/2);
				textSize((width/height)*20);
				text("Click mouse to reset", width/2, height*3/4);
			}
			if (mouseIsPressed) {
				background(100);
			}
		}
	}

	if (start) {
		for(var i = 0; i < bat.length; i++) {
	    bat[i].move();
	    bat[i].draw();
	 	}

		strokeWeight(3);	
		stroke(100);
		line(width/2, 0, width/2, height);

		fill(100);
		textAlign(CENTER);
		textSize((width/height)*100);
	 	text(scoreL, width/4, height/4);
	 	text(scoreR, width*3/4, height/4);

	 	textSize((width/height)*20);
		text("Press F to end the game", width/2, height-20);

	 	ball[0].move();
	 	ball[0].draw();

	 	if (key == 'r') {
	 		r.press();
	 	}
	 	if (key == 'f') {
	 		f.press();
	 	}
		
		if (key == 'w') {
			bat[0].posY -= height/100;
		}
		if (key == 's') {
			bat[0].posY += height/100;
		}
		if (key == 'y') {
			bat[1].posY -= height/100;
		}
		if (key == 'h') {
			bat[1].posY += height/100;
		}
	}
}

function mouseReleased() {
	if (end == false) {
		start = true;
		scoreR = 0;
		scoreL = 0;
	}
	if (end) {
		end = false;
	}
}

function Ball() {
	this.posX;
	this.posY;
	this.speedX;
	this.speedY;

	this.move = function() {
		this.posX += this.speedX;
		this.posY += this.speedY;

		if (this.posY < 0) {
			this.posY = 1;
			this.speedY = -this.speedY;
		}
		if (this.posY > height) {
			this.posY = height - 1;
			this.speedY = -this.speedY;
		}
		if (this.posX < 0) {
			scoreR++;
			this.posX = width/2;
			this.posY = height/2;
			this.speedX = 0;
			this.speedY = 0;
		}
		if (this.posX > width) {
			scoreL++;
			this.posX = width/2;
			this.posY = height/2;
			this.speedX = 0;
			this.speedY = 0;
		}
		if (this.posX < bat[0].posX && this.posY > bat[0].posY - bat[0].batLength/2 && this.posY < bat[0].posY + bat[0].batLength/2) {
			this.posX = bat[0].posX + 1;
			this.speedX = -this.speedX + 2;
			this.speedY = this.speedY + offset;
		}
		if (this.posX > bat[1].posX && this.posY > bat[1].posY - bat[1].batLength/2 && this.posY < bat[1].posY + bat[1].batLength/2) {
			this.posX = bat[1].posX - 1;
			this.speedX = -this.speedX - 2;
			this.speedY = this.speedY + offset;
		}


	}

	this.draw = function() {
		fill(0);
		stroke(0);
		rect(this.posX, this.posY, 20, 20);
	}

}

function Bat() {
	this.posX;
	this.posY;
	this.batWidth = 20;
	this.batLength = height/5;

	this.move = function() {
		if (this.posY < this.batLength/2) {
			this.posY = this.batLength/2;
		}
		if (this.posY > height - this.batLength/2) {
			this.posY = height - this.batLength/2;
		}


	}

	this.draw = function() {
		fill(0);
		noStroke();
		rect(this.posX, this.posY, this.batWidth, this.batLength);
	}
}

function restart() {
	this.press = function() {
		a = random(-1,1);
		b = random(-1,1);
		ball[0].posX = width/2;
		ball[0].posY = height/2;
		if (a < 0) {
			ball[0].speedX = 3;
		}
		if (a > 0) {
			ball[0].speedX = -3;
		}
		ball[0].speedY = random(-4, 4);
	}
}

function endGame() {
	this.press = function() {
		start = false;
		end = true;
	}
}