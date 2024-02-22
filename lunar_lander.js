// All Variables
let starX = [];
let starY = [];
let starShine = [];
let colors = [];
let speed = 1200;
let w = 1000;
let h = 500;
let craftObj = {
  x: 500,
  y: 100,
  velocity: 0.5,
  accelaration: 0.1,
};
let obstacleObj = {
  x1: 1000,
  y1: 100,
  x2: 1000,
  y2: 300,
};
let gameIsRunning = true;
let buttonIsClicked = false;
let state = "start";

function setup() {
  const cnv = createCanvas(w, h);
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
  cnv.parent("canvas-container");
  frameRate(30);
}
// start Screen
function startButton(x, y, s, h, radius) {
  noStroke();
  fill(0, 0, 150);
  rect(x, y, s, h, radius);
  textSize(20);
  fill(255);
  text("Start Game", w / 2 - 50, 230);
}
function mousePressed() {
  if (
    mouseX > w / 2 - 75 &&
    mouseX < w / 2 - 75 + 150 &&
    mouseY > 200 &&
    mouseY < 200 + 50
  ) {
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
  text("Land Spacecraft on the Moon", w / 2 - 200, 100);
  pop();
  startButton(w / 2 - 75, 200, 150, 50, 10);
  text("INSTRUCTIONS:", w / 2 - 200, 300);
  textSize(15);
  text("Use Down Arow Key to control the speed of rocket", w / 2 - 200, 330);
  text("Beware from other orbits....", w / 2 - 200, 360);
}

// Game Screen
for (i = 0; i < 200; i++) {
  const x = Math.floor(Math.random() * w);
  const y = Math.floor(Math.random() * h);
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
  ellipse(w / 2, 500, 300);
  fill(150);
  ellipse(w / 2 + 20, 450, 50, 30);
  ellipse(w / 2 + 100, 470, 40, 20);
  ellipse(w / 2 - 30, 400, 80, 40);
  ellipse(w / 2 - 70, 460, 60, 30);
  pop();
}
function earthBackground() {
  noStroke();
  background(135, 206, 235);
  push();
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starShine[index]) * 255));
    ellipse(starX[index], starY[index], 1);
    starShine[index] = starShine[index] + 0.02;
  }
  fill(40, 122, 184);
  ellipse(w / 2, 500, 300);
  fill(52, 200, 111);
  rect(w / 2 - 50, 370, 100, 50);

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
      obstacleObj.y1 = Math.floor((Math.random() * h) / 2);
      obstacleObj.x1 = w;
    }
    if (obstacleObj.x2 < 0) {
      obstacleObj.y2 = Math.floor((Math.random() * h) / 2);
      obstacleObj.x2 = w;
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
      obstacleObj.x1 - 25 < craftObj.x + 20 &&
      obstacleObj.y1 + 25 > craftObj.y - 50 &&
      obstacleObj.y1 - 25 < craftObj.y + 50
    ) {
      gameIsRunning = false;
    }
    if (
      obstacleObj.x2 + 25 > craftObj.x - 20 &&
      obstacleObj.x2 - 25 < craftObj.x + 20 &&
      obstacleObj.y2 + 25 > craftObj.y - 50 &&
      obstacleObj.y2 - 25 < craftObj.y + 50
    ) {
      gameIsRunning = false;
      // console.log("lost");
    }
  }
}

// Result Screen
for (i = 0; i < 200; i++) {
  const color = {
    x: Math.floor(Math.random() * w),
    y: Math.floor(Math.random() * h),
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
    if (color.y > h) {
      color.y = Math.floor(Math.random() * color.y);
    } else if (color.x > w) {
      color.x = Math.floor(Math.random() * color.x);
    }
  }
}
function resultButton(x, y, s, h, radius) {
  noStroke();
  fill(0, 0, 150);
  rect(x, y, s, h, radius);
  textSize(20);
  fill(255);
  text("Play Again", w / 2 - 50, 230);
}
function resultScreen() {
  background(0);
  textSize(30);
  if (craftObj.velocity < 2 && craftObj.y > 310) {
    dropColor();
    fill(255);
    text("You Win", w / 2 - 50, 100);
    resultButton(w / 2 - 75, 200, 150, 50, 10);
  } else if (craftObj.velocity > 3 || craftObj.y < 0 || craftObj.y > 310) {
    text("You Lost", w / 2 - 50, 100);
    resultButton(w / 2 - 75, 200, 150, 50, 10);
    push();
    spaceCraft(300, 200);
    spaceCraft(700, 200);
    fill(255);
    stroke(5);
    strokeWeight(10);
    line(350, 100, 250, 300);
    line(750, 100, 650, 300);
    pop();
  } else if (
    obstacleObj.x1 + 25 > craftObj.x - 20 &&
    obstacleObj.x1 - 25 < craftObj.x + 20 &&
    obstacleObj.y1 + 25 > craftObj.y - 50 &&
    obstacleObj.y1 - 25 < craftObj.y + 50
  ) {
    text("You Lost", w / 2 - 50, 100);
    resultButton(w / 2 - 75, 200, 150, 50, 10);
    push();
    spaceCraft(300, 200);
    spaceCraft(700, 200);
    fill(255);
    stroke(5);
    strokeWeight(10);
    line(350, 100, 250, 300);
    line(750, 100, 650, 300);
    pop();
  } else if (
    obstacleObj.x2 + 25 > craftObj.x - 20 &&
    obstacleObj.x2 - 25 < craftObj.x + 20 &&
    obstacleObj.y2 + 25 > craftObj.y - 50 &&
    obstacleObj.y2 - 25 < craftObj.y + 50
  ) {
    text("You Lost", w / 2 - 50, 100);
    resultButton(w / 2 - 75, 200, 150, 50, 10);
    push();
    spaceCraft(300, 200);
    spaceCraft(700, 200);
    fill(255);
    stroke(5);
    strokeWeight(10);
    line(350, 100, 250, 300);
    line(750, 100, 650, 300);
    pop();
  }
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
      craftObj.x = 500;
      craftObj.y = 100;
      craftObj.velocity = 0.5;
      craftObj.accelaration = 0.1;
      obstacleObj.x1 = 1000;
      obstacleObj.y1 = 100;
      obstacleObj.x2 = 1000;
      obstacleObj.y2 = 300;
      speed = 1200;
      gameIsRunning = true;
      state = "game";
    }
  }
}
