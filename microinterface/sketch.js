let currentPage = 0;

let angle = 0;
let stackHeight = 0;

let points = [];

function setup() {
  createCanvas(600, 500);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // Create random points for clusters
  for (let i = 0; i < 40; i++) {
    points.push({
      x: random(100, 500),
      y: random(150, 420),
      targetX: random([180, 300, 420]),
      targetY: random([220, 320]),
    });
  }

  // Change page every 5 seconds
  setInterval(() => {
    currentPage++;

    if (currentPage > 2) {
      currentPage = 0;
    }
  }, 5000);
}

function draw() {
  background(15);

  if (currentPage === 0) {
    loadingClusters();
    loadingText("Ajustando Clusters");
  }

  if (currentPage === 1) {
    loadingFunction();
    loadingText("Fazendo Cálculo da Função");
  }

  if (currentPage === 2) {
    loadingResults();
    loadingText("Gerando Resultados");
  }
}

// -----------------------------------
// TITLE
// -----------------------------------

function loadingText(message) {
  fill(255);

  textStyle(BOLD);
  textSize(30);

  text(message, width / 2, 60);
}

// -----------------------------------
// PAGE 1 — CLUSTERS
// Points move toward groups
// Mouse attracts clusters
// -----------------------------------

function loadingClusters() {

  for (let p of points) {

    // Move slowly to cluster centers
    p.x = lerp(p.x, p.targetX + mouseX * 0.02, 0.02);
    p.y = lerp(p.y, p.targetY + mouseY * 0.01, 0.02);

    fill(255, 80, 80);

    circle(p.x, p.y, 12);
  }

  // Cluster centers
  fill(255);

  circle(180 + mouseX * 0.02, 220, 25);
  circle(300 + mouseX * 0.02, 320, 25);
  circle(420 + mouseX * 0.02, 220, 25);

  fill(180);

  textSize(18);
  text("Mouse changes cluster position", width / 2, 460);
}

// -----------------------------------
// PAGE 2 — FUNCTION CALCULATION
// Rotating operators + live graph
// Mouse controls complexity
// -----------------------------------

function loadingFunction() {

  stroke(255);
  noFill();

  beginShape();

  for (let x = 0; x < width; x++) {

    let y =
      height / 2 +
      sin(x * 0.02 + angle) *
      (50 + mouseY * 0.1);

    vertex(x, y);
  }

  endShape();

  push();

  translate(width / 2, height / 2);

  rotate(angle);

  fill(255);
  noStroke();

  textSize(60);

  text("+", 0, -90);
  text("-", 90, 0);
  text("%", -90, 0);

  pop();

  angle += 0.03;

  fill(180);

  textSize(18);
  text("Move mouse vertically to change calculation intensity", width / 2, 460);
}

// -----------------------------------
// PAGE 3 — RESULTS
// Squares become bars/data blocks
// Mouse changes generation speed
// -----------------------------------

function loadingResults() {

  let speed = floor(map(mouseX, 0, width, 10, 2));

  fill(255);

  for (let i = 0; i < stackHeight; i++) {

    let h = random(30, 120);

    rect(
      120 + i * 35,
      height - h / 2 - 60,
      25,
      h
    );
  }

  // Faster generation with mouse
  if (frameCount % speed === 0) {
    stackHeight++;
  }

  if (stackHeight > 10) {
    stackHeight = 0;
  }

  fill(180);

  textSize(18);
  text("Move mouse horizontally to speed up results", width / 2, 460);
}