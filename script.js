// Prompt tool
const generateBtn = document.getElementById("generateBtn");
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    const prompt = document.getElementById("promptInput").value;
    document.getElementById("result").textContent = `Oria’s AI says: "${prompt}" bloomed!`;
  });
}

// Garden canvas (basic example)
const canvas = document.getElementById("gardenCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = "#d63384";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  });
}