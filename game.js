const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let flowerCount = 0;
let flowers = [{ x: 50, y: 50, collected: false }];

const flowerSound = new Audio('const flowerSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-chimes-bling-2342.mp3');'); // <-- Replace with correct path

function drawFlower(flower) {
  if (!flower.collected) {
    ctx.fillStyle = '#ff69b4'; // pink square
    ctx.fillRect(flower.x, flower.y, 20, 20);
  }
}

function drawSparkle(x, y) {
  ctx.fillStyle = '#fffacd'; // soft yellow sparkle
  for (let i = 0; i < 6; i++) {
    const offsetX = Math.random() * 10 - 5;
    const offsetY = Math.random() * 10 - 5;
    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function updateFlowerCount() {
  const flowerLabel = document.querySelector('p');
  if (flowerLabel) {
    flowerLabel.innerHTML = `Flowers: ${flowerCount}`;
  }
}

canvas.addEventListener('click', function (event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  flowers.forEach((flower) => {
    if (
      !flower.collected &&
      clickX >= flower.x &&
      clickX <= flower.x + 20 &&
      clickY >= flower.y &&
      clickY <= flower.y + 20
    ) {
      flower.collected = true;
      flowerCount += 1;
      drawSparkle(flower.x, flower.y);
      flowerSound.play();
      updateFlowerCount();
    }
  });

  render();
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers.forEach(drawFlower);
}

render();
updateFlowerCount();