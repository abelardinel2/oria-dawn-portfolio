const grid = document.getElementById('gardenGrid');
const flowerCount = document.getElementById('flowerCount');
const message = document.getElementById('message');
let blooms = JSON.parse(localStorage.getItem('blooms')) || new Array(25).fill(false);
const targetFlowers = 10;

// Initialize grid
for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (blooms[i]) tile.classList.add('bloom');
    tile.addEventListener('click', () => plantFlower(i));
    grid.appendChild(tile);
}

function plantFlower(index) {
    if (index >= 0) {
        blooms[index] = !blooms[index];
        const tile = grid.children[index];
        tile.classList.toggle('bloom');
        localStorage.setItem('blooms', JSON.stringify(blooms));

        // Play bloom sound
        const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
        audio.play().catch(() => console.log("Audio blocked"));
    }

    const count = blooms.filter(b => b).length;
    flowerCount.textContent = count;

    if (count >= targetFlowers) {
        message.textContent = "Garden Complete! 🌸 NFT Minting Soon...";
        message.style.color = '#a9dfbf';
        message.style.textShadow = '2px 2px #ff9999';
    } else {
        message.textContent = `Plant ${targetFlowers - count} more flowers!`;
    }
}

// Trigger initial update
plantFlower(-1);