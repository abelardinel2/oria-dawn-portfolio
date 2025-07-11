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

// Load Images
const oriaImg = new Image();
oriaImg.src = '../images/Oria-pixel.png'; // 32x32 Oria holding flower
const flowerStage1Img = new Image();
flowerStage1Img.src = '../images/flower-stage1.png'; // 16x16 tiny sprout with soil
const flowerStage2Img = new Image();
flowerStage2Img.src = '../images/flower-stage2.png'; // 16x16 Oria holding blooming flower
const flowerStage3Img = new Image();
flowerStage3Img.src = '../images/flower-stage3.png'; // 16x16 big glowing flower
const healthyTreeImg = new Image();
healthyTreeImg.src = '../images/Healthy-trees.png'; // 16x16 healthy green trees
const smogCloudImg = new Image();
smogCloudImg.src = '../images/Smog-cloud.png'; // 32x32 dark smog cloud
const smogOverTreesImg = new Image();
smogOverTreesImg.src = '../images/Smog-over-trees.png'; // 16x16 smog-covered trees
const bgForestImg = new Image();
bgForestImg.src = '../images/bg-forest.png'; // Looping pixel forest backdrop

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

function