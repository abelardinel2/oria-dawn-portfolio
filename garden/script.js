const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

const hud = document.getElementById('hud');
const status = document.getElementById('status');
const scoreDisplay = document.getElementById('scoreDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultySelect = document.getElementById('difficulty');
const plantSound = document.getElementById('plantSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const bgMusic = document.getElementById('bgMusic');

let oria = { x: 50, y: canvas.height / 2, width: 32, height: 32, frame: 0 };
let plants = [];
let flowers = [];
let smogWidth = 0;
let timeLeft = 30;
let waterUses = 0;
let seedsLeft = 5;
let score = 0;
let gameInterval;
let gameActive = false;
let difficulty = 'medium';
let smogSpeed = 1;

// Load Images with Error Handling
const oriaImg = new Image();
oriaImg.src = './Oria-pixel.png';
const flowerStage1Img = new Image();
flowerStage1Img.src = './flower-stage1.png';
const flowerStage2Img = new Image();
flowerStage2Img.src = './flower-stage2.png';
const flowerStage3Img = new Image();
flowerStage3Img.src = './flower-stage3.png';
const healthyTreeImg = new Image();
healthyTreeImg.src = './Healthy-trees.png';
const smogCloudImg = new Image();
smogCloudImg.src = './Smog-cloud.png';
const smogOverTreesImg = new Image();
smogOverTreesImg.src = './Smog-over-trees.png';
const bgForestImg = new Image();
bgForestImg.src = './bg-forest.png';

const images = [oriaImg, flowerStage1Img, flowerStage2Img, flowerStage3Img, healthyTreeImg, smogCloudImg, smogOverTreesImg, bgForestImg];
let imagesLoaded = 0;

images.forEach(img => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      status.textContent = 'All images loaded! Select Difficulty to Start';
    }
  };
  img.onerror = () => {
    console.error(`Failed to load image: ${img.src}`);
    status.textContent = `Error: Image ${img.src} failed to load. Check the path or file.`;
  };
});

// Background
let background = ctx.createLinearGradient(0, 0, 0, canvas.height);
background.addColorStop(0, '#c1e1c1');
background.addColorStop(1, '#e0f7e9');

difficultySelect.addEventListener('change', (e) => {
  difficulty = e.target.value;
  setDifficulty();
});

startBtn.addEventListener('click', () => {
  if (!gameActive) {
    startGame();
  }
});

resetBtn.addEventListener('click', () => {
  resetGame();
});

canvas.addEventListener('click', (e) => {
  if (gameActive) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    if (clickX > oria.x && clickX < oria.x + oria.width && Math.abs(clickY - oria.y) < oria.height / 2 && seedsLeft > 0) {
      plantSeed();
    }
  }
});

function setDifficulty() {
  switch (difficulty) {
    case 'easy':
      seedsLeft = 6;
      smogSpeed = 0.8;
      break;
    case 'medium':
      seedsLeft = 5;
      smogSpeed = 1;
      break;
    case 'hard':
      seedsLeft = 4;
      smogSpeed = 1.2;
      break;
  }
}

function startGame() {
  gameActive = true;
  setDifficulty();
  startBtn.classList.add('hidden');
  resetBtn.classList.add('hidden');
  status.textContent = `Time Left: ${timeLeft}s`;
  hud.textContent = `Seeds: ${seedsLeft} | Smog: 0%`;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  bgMusic.play();
  gameLoop();
}

function gameLoop() {
  gameInterval = setInterval(() => {
    timeLeft -= smogSpeed / 10;
    smogWidth = ((30 - timeLeft) / 30) * 100;
    if (Math.random() < 0.1) smogWidth += 5; // Random smog surge
    if (smogWidth > 100) smogWidth = 100;

    if (timeLeft <= 0 || (smogWidth >= 80 && seedsLeft === 0)) {
      endGame(false);
    } else if (flowers.length >= 3) {
      endGame(true);
    }

    updateHUD();
    draw();
  }, 100);
}

function plantSeed() {
  if (seedsLeft > 0) {
    plants.push({ x: oria.x + oria.width, y: oria.y, growth: 0, stage: 1 });
    seedsLeft--;
    plantSound.play();
    updateHUD();
  }
}

function waterPlant() {
  if (plants.length > 0 && waterUses < 3) {
    waterUses++;
    plants[plants.length - 1].growth += 0.33;
    plants[plants.length - 1].stage = Math.min(3, Math.floor(plants[plants.length - 1].growth * 3) + 1);
    if (waterUses === 3) {
      flowers.push({ x: plants[plants.length - 1].x, y: plants[plants.length - 1].y, stage: 3 });
      plants.pop();
    }
    updateHUD();
  }
}

function updateHUD() {
  hud.textContent = `Seeds: ${seedsLeft} | Smog: ${Math.floor(smogWidth)}%`;
  status.textContent = `Time Left: ${Math.ceil(timeLeft)}s`;
  score = Math.floor((3 - waterUses) * 100 + (30 - timeLeft) * 10 + flowers.length * 50);
  scoreDisplay.textContent = `Score: ${score}`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw looping background
  for (let x = 0; x < canvas.width; x += bgForestImg.width) {
    ctx.drawImage(bgForestImg, x - (smogWidth / 100) * canvas.width, 0);
  }

  // Draw Oria with frame animation
  oria.frame = (oria.frame + 0.1) % 3; // Simple frame cycle (assuming a 3-frame sprite sheet)
  ctx.drawImage(oriaImg, Math.floor(oria.frame) * oria.width, 0, oria.width, oria.height, oria.x, oria.y, oria.width, oria.height);

  // Draw Plants with growth stages
  plants.forEach((p) => {
    let img = flowerStage1Img;
    if (p.stage === 2) img = flowerStage2Img;
    else if (p.stage === 3) img = flowerStage3Img;
    ctx.drawImage(img, p.x, p.y, 16, 16);
  });

  // Draw Flowers
  flowers.forEach((f) => {
    ctx.drawImage(flowerStage3Img, f.x, f.y, 16, 16);
  });

  // Draw Trees (healthy on right, smog-affected on left)
  for (let x = 0; x < (smogWidth / 100) * canvas.width; x += 32) {
    ctx.drawImage(smogOverTreesImg, x, canvas.height - 32, 16, 16);
  }
  for (let x = (smogWidth / 100) * canvas.width; x < canvas.width; x += 32) {
    ctx.drawImage(healthyTreeImg, x, canvas.height - 32, 16, 16);
  }

  // Draw Smog overlay
  ctx.globalAlpha = 0.7;
  for (let x = 0; x < (smogWidth / 100) * canvas.width; x += 32) {
    ctx.drawImage(smogCloudImg, x, 0, 32, 32);
  }
  ctx.globalAlpha = 1;
}

function endGame(won) {
  clearInterval(gameInterval);
  gameActive = false;
  bgMusic.pause();
  if (won) {
    winSound.play();
    status.textContent = `You won! Score: ${score} 🌸`;
  } else {
    loseSound.play();
    status.textContent = `Smog won... Score: ${score} 🌫️`;
  }
  resetBtn.classList.remove('hidden');
}

function resetGame() {
  timeLeft = 30;
  waterUses = 0;
  seedsLeft = 5;
  smogWidth = 0;
  plants = [];
  flowers = [];
  gameActive = false;
  startBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  status.textContent = 'Select Difficulty to Start';
  hud.textContent = '';
  draw();
}

// Initial draw
draw();