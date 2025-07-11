// garden.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const flowerCountDisplay = document.getElementById('flowerCount');
const waterCountDisplay = document.getElementById('waterCount');
const scoreDisplay = document.getElementById('score');
const healthFill = document.getElementById('healthFill');
const levelDisplay = document.getElementById('level');
const plantBtn = document.getElementById('plantBtn');
const waterBtn = document.getElementById('waterBtn');
const bgMusic = document.getElementById('bgMusic');
const plantSound = document.getElementById('plantSound');
const waterSound = document.getElementById('waterSound');
const bloomChime = document.getElementById('bloomChime');

const images = {
  bg: new Image(),
  plant: new Image(),
  flower1: new Image(),
  flower2: new Image(),
  flower3: new Image(),
  smog: new Image(),
  healthyTrees: new Image(),
  smogOverTrees: new Image(),
  waterDrop: new Image()
};

images.bg.src = '/garden/images/bg-forest.png';
images.plant.src = '/garden/images/oria-pixel.png';
images.flower1.src = '/garden/images/flower-stage1.png';
images.flower2.src = '/garden/images/flower-stage2.png';
images.flower3.src = '/garden/images/flower-stage3.png';
images.smog.src = '/garden/images/smog-cloud.png';
images.healthyTrees.src = '/garden/images/healthy-trees.png';
images.smogOverTrees.src = '/garden/images/smog-over-trees.png';
images.waterDrop.src = '/garden/images/water-drop.png';

let imagesLoaded = 0;
const totalImages = Object.keys(images).length;
let flowerCount = 0;
let waterCount = 0;
let score = 0;
let smogLevel = 100; // 0-100 scale
let health = 100; // 0-100 scale
let level = 1;
const maxFlowers = 10;

function loadImage(img) {
  return new Promise((resolve) => {
    img.onload = () => {
      imagesLoaded++;
      console.log(`Loaded ${img.src}`);
      status.textContent = `Loading images... (${imagesLoaded}/${totalImages})`;
      resolve();
    };
    img.onerror = () => {
      console.error(`Failed to load ${img.src}`);
      status.textContent = `Error loading ${img.src}`;
      resolve();
    };
  });
}

async function loadAllImages() {
  const loadPromises = Object.values(images).map(loadImage);
  await Promise.all(loadPromises);
  if (imagesLoaded === totalImages) {
    status.textContent = 'Images loaded! Starting game...';
    bgMusic.play(); // Start background music
    startGame();
  } else {
    status.textContent = 'Some images failed to load. Check console.';
  }
}

function startGame() {
  drawGame();
  plantBtn.addEventListener('click', plantFlower);
  waterBtn.addEventListener('click', collectWater);
  gameLoop();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(images.bg, 0, 0, canvas.width, canvas.height);

  // Draw trees based on smogLevel
  if (smogLevel > 50) {
    ctx.drawImage(images.smogOverTrees, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(images.healthyTrees, 0, 0, canvas.width, canvas.height);
  }

  // Draw plant
  ctx.drawImage(images.plant, 50, 150);

  // Draw flowers
  if (flowerCount >= 1) ctx.drawImage(images.flower1, 100, 150);
  if (flowerCount >= 5) ctx.drawImage(images.flower2, 150, 150);
  if (flowerCount >= 10) ctx.drawImage(images.flower3, 200, 150);

  // Draw smog
  const smogWidth = (smogLevel / 100) * canvas.width;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, smogWidth, canvas.height);
  ctx.drawImage(images.smog, smogWidth - 50, 50, 50, 50);

  // Draw water drop if available
  if (waterCount > 0) ctx.drawImage(images.waterDrop, 300, 150);

  // Update UI
  flowerCountDisplay.textContent = flowerCount;
  waterCountDisplay.textContent = waterCount;
  scoreDisplay.textContent = score;
  healthFill.style.width = `${health}%`;
  levelDisplay.textContent = level;

  // Game over or win check
  if (health <= 0) {
    status.textContent = 'Game Over! Refresh to restart.';
    plantBtn.disabled = true;
    waterBtn.disabled = true;
    bgMusic.pause();
  } else if (flowerCount >= maxFlowers) {
    status.textContent = `Level ${level} Complete! Score: ${score}`;
    plantBtn.disabled = true;
    waterBtn.disabled = true;
    bloomChime.play(); // Play chime for level completion
    setTimeout(nextLevel, 2000);
  }
}

function plantFlower() {
  if (flowerCount < maxFlowers && waterCount > 0) {
    flowerCount++;
    waterCount--;
    smogLevel = Math.max(0, smogLevel - 15);
    score += 10;
    plantSound.play();
    drawGame();
  } else if (flowerCount < maxFlowers) {
    status.textContent = 'Need water to plant!';
  }
}

function collectWater() {
  waterCount++;
  score += 5;
  waterSound.play();
  drawGame();
}

function gameLoop() {
  if (health > 0 && flowerCount < maxFlowers) {
    smogLevel = Math.min(100, smogLevel + 0.2 * level);
    health = Math.max(0, health - 0.1 * level);
    drawGame();
    requestAnimationFrame(gameLoop);
  }
}

function nextLevel() {
  level++;
  flowerCount = 0;
  waterCount = 0;
  smogLevel = 100;
  health = 100;
  status.textContent = `Level ${level} Started!`;
  plantBtn.disabled = false;
  waterBtn.disabled = false;
  bgMusic.play(); // Resume music
  drawGame();
}

loadAllImages();