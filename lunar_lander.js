// All Variables
let starX = [];
let starY = [];
let starShine = [];
let colors = [];
let speed = 1200;
let craftObj = {
  x: 300,
  y: 100,
  velocity: 0.5,
  accelaration: 0.1,
};
let obstacleObj = {
  x1: 500,
  y1: 100,
  x2: 600,
  y2: 300,
};
let gameIsRunning = true;
let buttonIsClicked = false;
let state = "start";

function setup() {
  createCanvas(600, 500);
}

// start Screen
function startButton(x, y, w, h, radius) {
  noStroke();
  fill(0, 0, 150);
  rect(x, y, w, h, radius);
  textSize(20);
  fill(255);
  text("Start Game", 270, 230);
}
function mousePressed() {
  if (mouseX > 245 && mouseX < 245 + 150 && mouseY > 200 && mouseY < 200 + 50) {
    buttonIsClicked = true;
  }
}
function mouseReleased() {
  buttonIsClicked = false;
}
function startScreen() {
  background(0);
  push();
  textSize(30);
  fill(255);
  text("Land Spacecraft on the Moon", 100, 100);
  pop();
  startButton(245, 200, 150, 50, 10);
  text("INSTRUCTIONS:", 100, 300);
  textSize(15);
  text("Use Down Arow Key to control the speed of rocket", 100, 330);
  text("Beware from other orbits....", 100, 360);
}

// Game Screen
for (i = 0; i < 200; i++) {
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
  push();
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starShine[index]) * 255));
    ellipse(starX[index], starY[index], 1);
    starShine[index] = starShine[index] + 0.02;
  }
  fill(200, 200, 200);
  ellipse(300, 500, 300);
  fill(150);
  ellipse(400, 450, 50, 30);
  ellipse(330, 470, 40, 20);
  ellipse(300, 400, 80, 40);
  ellipse(230, 460, 60, 30);
  pop();
}
function spaceCraft(x, y) {
  push();
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
function speedCal() {
  push();
  textSize(10);
  text("Speed:", 100, 100);
  text(speed, 150, 100);
  text("km/h", 180, 100);
  pop();
}
function gameScreen() {
  spaceBackground();
  flame(craftObj.x, craftObj.y);
  spaceCraft(craftObj.x, craftObj.y);
  obstacles(obstacleObj.x1, obstacleObj.y1);
  obstacles(obstacleObj.x2, obstacleObj.y2);
  speedCal();

  if (gameIsRunning === true) {
    obstacleObj.x1 = obstacleObj.x1 - 2;
    obstacleObj.x2 = obstacleObj.x2 - 4;
    speed = speed + Math.floor(craftObj.velocity);
    if (obstacleObj.x1 < 0) {
      obstacleObj.y1 = Math.floor((Math.random() * height) / 2);
      obstacleObj.x1 = 600;
    }
    if (obstacleObj.x2 < 0) {
      obstacleObj.y2 = Math.floor((Math.random() * height) / 2);
      obstacleObj.x2 = 600;
    }

    craftObj.y = craftObj.y + craftObj.velocity;
    craftObj.velocity = craftObj.velocity + craftObj.accelaration;
    if (craftObj.y >= 310 || craftObj.y < 0) {
      console.log("game over");
      console.log("crash");
      gameIsRunning = false;
    }
    if (keyIsDown(40)) {
      craftObj.velocity = craftObj.velocity - 0.2;
      speed = speed - Math.floor(craftObj.velocity);

      airPressure(craftObj.x, craftObj.y);
      console.log("landing...");
    }
    if (
      obstacleObj.x1 + 25 > craftObj.x - 20 &&
      obstacleObj.x1 - 25 < craftObj.x + 20
    ) {
      if (
        obstacleObj.y1 + 25 > craftObj.y - 50 &&
        obstacleObj.y1 - 25 < craftObj.y + 50
      ) {
        gameIsRunning = false;
      }
    }
    if (
      obstacleObj.x2 + 25 > craftObj.x - 20 &&
      obstacleObj.x2 - 25 < craftObj.x + 20
    ) {
      if (
        obstacleObj.y2 + 25 > craftObj.y - 50 &&
        obstacleObj.y2 - 25 < craftObj.y + 50
      ) {
        gameIsRunning = false;
        // console.log("lost");
      }
    }
  }
}

// Result Screen
for (i = 0; i < 200; i++) {
  const color = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
    light: Math.random(),
  };
  colors.push(color);
}
function dropColor() {
  for (let color of colors) {
    fill(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.abs(Math.sin(color.light) * 255)
    );

    ellipse(color.x, color.y, 8);
    color.light = color.light + 0.02;
    color.y = color.y + 10;
    if (color.y > height) {
      color.y = Math.floor(Math.random() * color.y);
    } else if (color.x > width) {
      color.x = Math.floor(Math.random() * color.x);
    }
  }
}
function resultButton(x, y, w, h, radius) {
  noStroke();
  fill(0, 0, 150);
  rect(x, y, w, h, radius);
  textSize(20);
  fill(255);
  text("Play Again", 270, 230);
}
function resultScreen() {
  background(0);
  textSize(30);
  if (craftObj.velocity < 2 && craftObj.y > 310) {
    dropColor();
    fill(255);
    text("You Win", 260, 100);
    resultButton(245, 200, 150, 50, 10);
  } else if (craftObj.velocity > 3 || craftObj.y < 0 || craftObj.y > 310) {
    text("You Lost", 260, 100);
    resultButton(245, 200, 150, 50, 10);
  } else if (
    obstacleObj.x1 + 25 > craftObj.x - 20 &&
    obstacleObj.x1 - 25 < craftObj.x + 20 &&
    obstacleObj.y1 + 25 > craftObj.y - 50 &&
    obstacleObj.y1 - 25 < craftObj.y + 50
  ) {
    text("You Lost", 260, 100);
    resultButton(245, 200, 150, 50, 10);
  } else if (
    obstacleObj.x2 + 25 > craftObj.x - 20 &&
    obstacleObj.x2 - 25 < craftObj.x + 20 &&
    obstacleObj.y2 + 25 > craftObj.y - 50 &&
    obstacleObj.y2 - 25 < craftObj.y + 50
  ) {
    text("You Lost", 260, 100);
    resultButton(245, 200, 150, 50, 10);
  }
  // else {
  //   text("You Lost", 260, 100);
  //   resultButton(245, 200, 150, 50, 10);
  // }
}

// states
function draw() {
  if (state === "start") {
    startScreen();
    if (buttonIsClicked) {
      state = "game";
    }
  } else if (state === "game") {
    gameScreen();
    if (craftObj.y > 350 || gameIsRunning === false) {
      state = "result";
    }
  } else if (state === "result") {
    resultScreen();
    if (buttonIsClicked) {
      craftObj.x = 300;
      craftObj.y = 100;
      craftObj.velocity = 0.5;
      craftObj.accelaration = 0.1;
      obstacleObj.x1 = 500;
      obstacleObj.y1 = 100;
      obstacleObj.x2 = 600;
      obstacleObj.y2 = 300;
      speed = 1200;
      gameIsRunning = true;
      state = "game";
    }
  }
}
