const grid = document.getElementById('gardenGrid');
const flowerCount = document.getElementById('flowerCount');
const message = document.getElementById('message');
let blooms = JSON.parse(localStorage.getItem('blooms')) || new Array(25).fill(false);
const targetFlowers = 10;

// Build the grid
for (let i = 0; i < 25; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  if (blooms[i]) tile.classList.add('bloom');
  tile.addEventListener('click', () => plantFlower(i));
  grid.appendChild(tile);
}

// Plant function
function plantFlower(index) {
  blooms[index] = !blooms[index];
  grid.children[index].classList.toggle('bloom');
  const count = blooms.filter(Boolean).length;
  flowerCount.textContent = count;
  localStorage.setItem('blooms', JSON.stringify(blooms));
  if (count >= targetFlowers) {
    message.textContent = "Garden Complete! 🌸 Mint coming soon!";
  } else {
    message.textContent = `${targetFlowers - count} flowers left to bloom!`;
  }
}

// Init message
plantFlower(-1);
