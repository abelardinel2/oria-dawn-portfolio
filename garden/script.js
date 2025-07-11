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

// Audio Setup
const plantSound = document.getElementById('plantSound') || new Audio('./bloom-chime.mp3'); // Fallback to bloom-chime.mp3
const winSound = document.getElementById('winSound') || new Audio('./win.wav'); // Placeholder, replace with actual file if available
const loseSound = document.getElementById('loseSound') || new Audio('./lose.wav'); // Placeholder, replace with actual file if available
const bgMusic = document.getElementById('bgMusic') || new Audio('./bgm.mp3'); // Placeholder, replace with actual file if available

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
oriaImg.src = './images/oria-pixel.png';
const flowerStage1Img = new Image();
flowerStage1Img.src = './images/flower-stage1.png';
const flowerStage2Img = new Image();
flowerStage2Img.src = './images/flower-stage2.png';
const flowerStage3Img = new Image();
flowerStage3Img.src = './images/flower-stage3.png';
const healthyTreeImg = new Image();
healthyTreeImg.src = './images/healthy-trees.png';
const smogCloudImg = new Image();
smogCloudImg.src = './images/smog-cloud.png';
const smogOverTreesImg = new Image();
smogOverTreesImg.src = './images/smog-over-trees.png';
const bgForestImg = new Image();
bgForestImg.src = './images/bg-forest.png';

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
      smogSpeed =