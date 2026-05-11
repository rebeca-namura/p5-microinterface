let currentPage = 0;

let customers = [];
let approvedBars = [];

let loadingProgress = 0;

function setup() {

  createCanvas(700, 500);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);


  for (let i = 0; i < 40; i++) {

    customers.push({

      x: random(120, 580),
      y: random(180, 380),

      income: random(),
      risk: random()
    });
  }


  for (let i = 0; i < 7; i++) {

    approvedBars.push(random(4000, 20000));
  }
}

function draw() {

  background(15);


  loadingProgress += 0.4;

  
  if (loadingProgress >= 100) {

  loadingProgress = 0;

  currentPage++;

  if (currentPage > 2) {

    currentPage = 0;

    resetClusters();
  }
}



  if (currentPage === 0) {

    loadingText("Analisando Perfis de Clientes");

    loadingClusters();
  }

  if (currentPage === 1) {

    loadingText("Otimizando Política de Crédito");

    loadingOptimization();
  }

  if (currentPage === 2) {

    loadingText("Gerando Limites Recomendados");

    loadingResults();
  }

  drawProgressBar();
}


function loadingText(message) {

  fill(255);

  textStyle(BOLD);

  textSize(28);

  text(message, width / 2, 60);
}


function drawProgressBar() {

  noFill();

  stroke(80);

  rect(width / 2, 460, 420, 18);


  noStroke();

  fill(100, 255, 100);

  rect(
    140 + loadingProgress * 2,
    460,
    loadingProgress * 4,
    18
  );


  fill(180);

  textSize(14);

  textAlign(LEFT, CENTER);

  text(
    floor(loadingProgress) + "%",
    width / 2 + 230,
    460
  );


  textAlign(CENTER, CENTER);
}



function loadingClusters() {

  fill(180);

  textSize(15);

  text(
    "Agrupando clientes com perfis semelhantes",
    width / 2,
    100
  );


  let centers = [

    { x: 200, y: 260, color: [100, 255, 100] },
    { x: 350, y: 260, color: [255, 220, 100] },
    { x: 500, y: 260, color: [255, 120, 120] }
  ];


  let counts = [0, 0, 0];


  for (let customer of customers) {

    let clusterIndex;

    if (customer.risk < 0.3) {

      clusterIndex = 0;

    } else if (customer.risk < 0.6) {

      clusterIndex = 1;

    } else {

      clusterIndex = 2;
    }

    customer.cluster = clusterIndex;

    counts[clusterIndex]++;
  }


  for (let customer of customers) {

    let target = centers[customer.cluster];


    customer.x = lerp(customer.x, target.x, 0.025);

    customer.y = lerp(customer.y, target.y, 0.025);

    fill(
      target.color[0],
      target.color[1],
      target.color[2]
    );

    noStroke();

    circle(customer.x, customer.y, 8);
  }


  let clusterAppearance =
    map(loadingProgress, 40, 100, 0, 1);

  clusterAppearance =
    constrain(clusterAppearance, 0, 1);

  for (let i = 0; i < centers.length; i++) {

    let clusterSize =
      counts[i] * 6 * clusterAppearance;

    fill(
      centers[i].color[0],
      centers[i].color[1],
      centers[i].color[2],
      100
    );

    circle(
      centers[i].x,
      centers[i].y,
      clusterSize
    );
  }


  fill(180);

  textSize(14);

  text(
    "Clientes semelhantes convergem para os mesmos clusters",
    width / 2,
    430
  );
}


function resetClusters() {

  for (let customer of customers) {


    customer.x = random(120, 580);

    customer.y = random(180, 380);
  }
}

function loadingOptimization() {

  fill(180);

  textSize(15);

  text(
    "Resolvendo problema de otimização linear",
    width / 2,
    100
  );



  stroke(100);

  line(120, 380, 560, 380);
  line(120, 140, 120, 380);


  noStroke();

  fill(180);

  textSize(13);

  text("Risco", 560, 400);
  text("Retorno", 85, 140);


  strokeWeight(2);

  stroke(255, 120, 120);

  line(120, 340, 520, 180);

  stroke(100, 180, 255);

  line(180, 150, 540, 340);

  stroke(255, 220, 100);

  line(250, 380, 420, 150);


  noStroke();

  fill(100, 255, 120, 70);

  beginShape();

  vertex(260, 320);
  vertex(390, 230);
  vertex(470, 280);
  vertex(360, 340);

  endShape(CLOSE);


  stroke(255);

  strokeWeight(2);

  let lineOffset =
    map(loadingProgress, 0, 100, -80, 60);


  let optimalX =
    map(loadingProgress, 0, 100, 280, 390);

  let optimalY =
    map(loadingProgress, 0, 100, 320, 240);

  noStroke();

  fill(255);

  circle(optimalX, optimalY, 18);


  fill(180);

  textSize(14);

  text(
    "Explorando soluções viáveis até encontrar o melhor limite",
    width / 2,
    430
  );
}

function loadingResults() {

  fill(180);

  textSize(15);

  text(
    "Gerando recomendação final de limites",
    width / 2,
    100
  );

  for (let i = 0; i < approvedBars.length; i++) {


    let targetHeight = approvedBars[i] / 120;

    let animatedHeight =
      map(
        loadingProgress,
        0,
        100,
        0,
        targetHeight
      );

    if (animatedHeight < 80) {

      fill(100, 255, 100);

    } else if (animatedHeight < 120) {

      fill(255, 220, 100);

    } else {

      fill(255, 120, 120);
    }

    rect(
      170 + i * 55,
      360 - animatedHeight / 2,
      32,
      animatedHeight
    );

    fill(255);

    textSize(11);

    text(
      "R$" + floor(animatedHeight * 120),
      170 + i * 55,
      390
    );
  }
}