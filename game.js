
const grid = document.getElementById('gardenGrid');
for (let i = 0; i < 25; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.addEventListener('click', () => tile.classList.toggle('bloom'));
  grid.appendChild(tile);
}
