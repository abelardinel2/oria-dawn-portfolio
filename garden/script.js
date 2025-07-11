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
oriaImg.src = '/garden/images/oria-pixel.png';
const flowerStage1Img = new Image();
flowerStage1Img.src = '/garden/images/flower-stage1.png';
const flowerStage2Img = new Image();
flowerStage2Img.src = '/garden/images/flower-stage2.png';
const flowerStage3Img = new Image();
flowerStage3Img.src = '/garden/images/flower-stage3.png';
const healthyTreeImg = new Image();
healthyTreeImg.src = '/garden/images/healthy-trees.png';
const smogCloudImg = new Image();
smogCloudImg.src = '/garden/images/smog-cloud.png';
const smogOverTreesImg = new Image();
smogOverTreesImg.src = '/garden/images/smog-over-trees.png';
const bgForestImg = new Image();
bgForestImg.src = '/garden/images/bg-forest.png';

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

canvas.addEventListener('click', (e