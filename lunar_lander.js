// Using States
function setup() {
  createCanvas(600, 500);
  background(255);
}
function startButton(x, y, w, h, radius) {
  noStroke();
  fill(0, 0, 150);
  rect(x, y, w, h, radius);
  textSize(20);
  fill(255);
  text("Start Game", 220, 230);
}
function resultButton(x, y, w, h, radius) {
  noStroke();
  fill(0, 0, 150);
  rect(x, y, w, h, radius);
  textSize(20);
  fill(255);
  text("Play Again", 220, 230);
}
let buttonIsClicked = false;
function mousePressed() {
  if (mouseX > 200 && mouseX < 200 + 150 && mouseY > 200 && mouseY < 200 + 50) {
    buttonIsClicked = true;
  }
}
function mouseReleased() {
  buttonIsClicked = false;
}

function startScreen() {
  spaceBackground();
  textSize(30);
  fill(255);
  text("Land Spacecraft on the Moon", 100, 100);
  startButton(200, 200, 150, 50, 10);
  // if (buttonIsClicked) {
  //   gameScreen();
  // }
}
let starX = [];
let starY = [];
let starShine = [];

for (i = 0; i < 600; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const shine = Math.random();
  starX.push(x);
  starY.push(y);
  starShine.push(shine);
}
function spaceBackground() {
  noStroke();
  background(0);
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starShine[index]) * 255));
    ellipse(starX[index], starY[index], 1);
    starShine[index] = starShine[index] + 0.02;
  }
  fill(200, 200, 200);
  rect(0, 402, 600, 100);
  // arc(200, 500, 900, 200, PI, 0);
}
function spaceCraft(x, y) {
  push();
  //   stroke(1);
  translate(x, y);
  //   body
  fill(255);
  ellipse(0, 0, 50, 100);
  //   tail
  fill(255, 0, 0);
  triangle(-30, 50, 0, 30, 30, 50);
  //   window
  fill(135, 206, 235);
  ellipse(0, 0, 30);
  //   top
  fill(255, 0, 0);
  beginShape();
  vertex(-20, -30);
  bezierVertex(-20, -40, 0, -90, 20, -30);
  endShape();
  //   wings
  fill(255, 0, 0);
  triangle(20, -10, 40, 20, 20, 20);
  fill(255, 0, 0);
  triangle(-20, -10, -40, 20, -20, 20);
  pop();
}
function flame(x, y) {
  push();
  translate(x, y);
  fill(255, 165, 0);
  ellipse(0, 0 + random(35, 55), 20, 60);
  fill(255, 234, 0);
  ellipse(0, 0 + random(35, 50), 10, 45);
  pop();
}
function airPressure(x, y) {
  push();
  noStroke();
  translate(x, y);
  fill(255, 255, 255);
  ellipse(-50, 70, 30);
  triangle(-10, 85, -50, 70, -50, 85);
  ellipse(50, 70, 30);
  triangle(10, 85, 50, 70, 50, 85);
  pop();
}
let obstacleX = 500;
let obstacleY = 100;
let obstacle2X = 300;
let obstacle2Y = 350;

function obstacles(x, y) {
  push();
  translate(x, y);
  fill(100);
  ellipse(0, 0, 50);
  fill(50);
  ellipse(5, 10, 4);
  ellipse(10, -10, 4);
  ellipse(-15, 0, 4);
  ellipse(-3, 7, 4);
  ellipse(-9, -6, 4);
  pop();
}
let craftX = 300;
let craftY = 200;
let velocity = 0.5;
let accelaration = 0.1;
let gameIsRunning = true;

function gameScreen() {
  spaceBackground();
  flame(craftX, craftY);
  spaceCraft(craftX, craftY);
  obstacles(obstacleX, obstacleY);
  obstacles(obstacle2X, obstacle2Y);
  if (gameIsRunning === true) {
    obstacleX = obstacleX - 2;
    obstacle2X = obstacle2X - 4;
    if (obstacleX < 0) {
      obstacleY = Math.floor((Math.random() * height) / 2);
      obstacleX = 600;
    }
    if (obstacle2X < 0) {
      obstacle2X = 600;
    }

    craftY = craftY + velocity;
    velocity = velocity + accelaration;

    if (keyIsDown(40)) {
      // flame(craftX, craftY);
      if (velocity > 2) {
        velocity = velocity * 0.4;
        craftY = craftY - velocity;
        airPressure(craftX, craftY);
      }
      if (craftY >= 350) {
        console.log("win");
        gameIsRunning = false;
      }
    } else if (craftY >= 350) {
      console.log("game over");
      console.log("crash");
      gameIsRunning = false;
    }
    if (keyIsDown(38)) {
      velocity = velocity - 0.2;
      console.log("fly");
    } else if (keyIsDown(37)) {
      velocity = 0;
      craftX = craftX - 3;
    } else if (keyIsDown(39)) {
      velocity = 0;
      craftX = craftX + 3;
    }
    if (obstacleX + 25 > craftX - 20 && obstacleX - 25 < craftX + 20) {
      if (obstacleY + 25 > craftY - 50 && obstacleY - 25 < craftY + 50) {
        gameIsRunning = false;
        // console.log("lost");
      }
    }
    if (obstacle2X + 25 > craftX - 20 && obstacle2X - 25 < craftX + 20) {
      if (obstacle2Y + 25 > craftY - 50 && obstacle2Y - 25 < craftY + 50) {
        gameIsRunning = false;
        // console.log("lost");
      }
    }
  }
  //  else {
  //   resultScreen();
  //   craftY = 200;
  //   obstacleX = 400;
  // }
}
function resultScreen() {
  spaceBackground();
  textSize(30);
  if (velocity < 2 && craftY > 350) {
    text("You Win", 200, 100);
    resultButton(200, 200, 150, 50, 10);
  } else if (velocity > 3) {
    text("You Lost", 200, 100);
    resultButton(200, 200, 150, 50, 10);
  } else if (obstacleX + 25 > craftX - 20 && obstacleX - 25 < craftX + 20) {
    if (obstacleY + 25 > craftY - 50 && obstacleY - 25 < craftY + 50) {
      text("You Lost", 200, 100);
      resultButton(200, 200, 150, 50, 10);
    }
  } else if (obstacle2X + 25 > craftX - 20 && obstacle2X - 25 < craftX + 20) {
    if (obstacle2Y + 25 > craftY - 50 && obstacle2Y - 25 < craftY + 50) {
      text("You Lost", 200, 100);
      resultButton(200, 200, 150, 50, 10);
    }
  }
}

let state = "start";
function draw() {
  if (state === "start") {
    startScreen();
    if (buttonIsClicked) {
      state = "game";
    }
  } else if (state === "game") {
    gameScreen();
    if (craftY > 350 || gameIsRunning === false) {
      state = "result";
    }
  } else if (state === "result") {
    resultScreen();
    if (buttonIsClicked) {
      obstacleY = 300;
      // obstacleX = 400;
      craftX = 300;
      craftY = 100;
      velocity = 0.5;
      accelaration = 0.1;
      gameIsRunning = true;
      state = "game";
    }
  }
}
