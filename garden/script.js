// Garden Game Canvas code
const canvas = document.getElementById("gardenCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let flowers = [];

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    flowers.push({ x, y });
    ctx.fillStyle = "#d63384";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  });
}