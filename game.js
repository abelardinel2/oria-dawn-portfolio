const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let flower = { x: 20, y: 50, size: 20 };
let score = 0;

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  if (mouseX > flower.x && mouseX < flower.x + flower.size &&
      mouseY > flower.y && mouseY < flower.y + flower.size) {
    score++;
    flower.x = Math.random() * (canvas.width - flower.size);
    flower.y = Math.random() * (canvas.height - flower.size);
    draw();
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff69b4";
  ctx.fillRect(flower.x, flower.y, flower.size, flower.size);
  ctx.fillStyle = "#000";
  ctx.fillText("Flowers: " + score, 10, 10);
}

draw();