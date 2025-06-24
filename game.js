// === Init Variables ===
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let flowerCount = localStorage.getItem("flowers") || 0;
let flower = { x: 50, y: 50, size: 20 };
let sparkles = [];

// === Sound ===
let popSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/26/audio_b39c8414f7.mp3?filename=pop-94319.mp3");

// === Draw Flower ===
function drawFlower() {
  ctx.fillStyle = "#ff69b4";
  ctx.fillRect(flower.x, flower.y, flower.size, flower.size);
}

// === Draw Sparkles ===
function drawSparkles() {
  sparkles.forEach((s, index) => {
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fillRect(s.x, s.y, 2, 2);
    s.y -= 1;
    s.alpha -= 0.02;
    if (s.alpha <= 0) sparkles.splice(index, 1);
  });
}

// === Show Note ===
function showColorNote(x, y) {
  const note = document.createElement("div");
  note.textContent = "🎵";
  note.style.position = "absolute";
  note.style.left = `${canvas.offsetLeft + x}px`;
  note.style.top = `${canvas.offsetTop + y}px`;
  note.style.fontSize = "20px";
  note.style.animation = "popUp 1s ease-out forwards";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 1000);
}

// === On Click Event ===
canvas.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  if (
    clickX > flower.x &&
    clickX < flower.x + flower.size &&
    clickY > flower.y &&
    clickY < flower.y + flower.size
  ) {
    flowerCount++;
    localStorage.setItem("flowers", flowerCount);
    document.querySelector("p").innerText = `Flowers: ${flowerCount}`;
    flower.x = Math.random() * (canvas.width - flower.size);
    flower.y = Math.random() * (canvas.height - flower.size);
    popSound.play();

    // Add sparkles
    for (let i = 0; i < 10; i++) {
      sparkles.push({
        x: flower.x + flower.size / 2,
        y: flower.y + flower.size / 2,
        alpha: 1
      });
    }

    // Show color note
    showColorNote(clickX, clickY);
  }
});

// === Animate Loop ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFlower();
  drawSparkles();
  requestAnimationFrame(draw);
}

draw();