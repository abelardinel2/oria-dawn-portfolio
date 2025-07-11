const gameCanvas = document.getElementById('gameCanvas');
const oria = document.getElementById('oria');
const plant = document.getElementById('plant');
const flower = document.getElementById('flower');
const smog = document.getElementById('smog');
const hud = document.getElementById('hud');
const status = document.getElementById('status');
const plantBtn = document.getElementById('plantBtn');
const waterBtn = document.getElementById('waterBtn');
const resetBtn = document.getElementById('resetBtn');

let timeLeft = 30;
let waterUses = 0;
let seedsLeft = 5;
let gameInterval;
let gameActive = false;

plantBtn.addEventListener('click', () => {
  if (!gameActive && seedsLeft > 0) {
    gameActive = true;
    seedsLeft--;
    hud.textContent = `Seeds Left: 🌱 x ${seedsLeft}\nSmog Approaching → ${100 - ((30 - timeLeft) / 30) * 100}%`;
    plantBtn.classList.add('hidden');
    waterBtn.classList.remove('hidden');
    plant.style.fontSize = '30px';
    startGame();
  } else if (seedsLeft === 0) {
    endGame(false); // End game if no seeds left
  }
});

waterBtn.addEventListener('click', () => {
  if (waterUses < 3 && gameActive) {
    waterUses++;
    status.textContent = `Time Left: ${timeLeft}s | Water Uses: ${waterUses}/3`;
    flower.style.opacity = waterUses / 3;
    flower.style.fontSize = `${30 + waterUses * 10}px`;
    if (waterUses === 3) {
      endGame(true); // Win condition
    }
  }
});

resetBtn.addEventListener('click', () => {
  resetGame();
});

function startGame() {
  gameInterval = setInterval(() => {
    timeLeft--;
    const smogWidth = ((30 - timeLeft) / 30) * 100;
    smog.style.width = `${smogWidth}%`;
    hud.textContent = `Seeds Left: 🌱 x ${seedsLeft}\nSmog Approaching → ${100 - smogWidth}%`;
    status.textContent = `Time Left: ${timeLeft}s | Water Uses: ${waterUses}/3`;

    // Check lose condition: smog overtakes and no seeds left
    if (timeLeft <= 0 || (smogWidth >= 80 && seedsLeft === 0)) {
      endGame(false);
    }
  }, 1000);
}

function endGame(won) {
  clearInterval(gameInterval);
  gameActive = false;
  waterBtn.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  if (won) {
    status.textContent = "You saved the garden! 🌸 Play again?";
    flower.style.opacity = 1;
    smog.style.width = '0%'; // Clear smog on win
  } else {
    status.textContent = "The smog won... 🌫️ Try again?";
    flower.style.opacity = 0;
  }
}

function resetGame() {
  timeLeft = 30;
  waterUses = 0;
  seedsLeft = 5;
  gameActive = false;
  plant.style.fontSize = '20px';
  flower.style.opacity = 0;
  flower.style.fontSize = '30px';
  smog.style.width = '0%';
  hud.textContent = `Seeds Left: 🌱 x ${seedsLeft}\nSmog Approaching →`;
  status.textContent = `Time Left: ${timeLeft}s | Water Uses: ${waterUses}/3`;
  plantBtn.classList.remove('hidden');
  waterBtn.classList.add('hidden');
  resetBtn.classList.add('hidden');
}