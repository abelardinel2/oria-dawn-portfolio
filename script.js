// Petal animation
function createPetals() {
  for (let i = 0; i < 10; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(petal);
  }
}

// Typewriter effect for poems
function typeWriter(text, elementId, speed = 50) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Prompt demo
const responses = {
  "name yourself as a pixel-art character": "I’m Lumia, a glowing sprite with petal-like circuits, rooted in Oria’s Web3 garden!",
  "describe a pixel-art character": "A 16x16 sprite with pastel pink petals for hair, radiating creativity in a digital meadow.",
  "default": "A unique digital entity, shaped by your prompt, blooming in Oria’s Garden."
};
document.getElementById("generateBtn")?.addEventListener("click", () => {
  const prompt = document.getElementById("promptInput")?.value.toLowerCase();
  const result = responses[prompt] || responses["default"];
  document.getElementById("result")?.textContent = result;
});

// Wallet connect
const mintBtn = document.getElementById("mintBtn");
if (mintBtn && window.ethereum) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  mintBtn.addEventListener("click", async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      mintBtn.textContent = "Wallet Connected!";
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  });
} else if (mintBtn) {
  mintBtn.textContent = "Install MetaMask";
}

// Real-time date and time
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
  };
  const dateTimeString = now.toLocaleString('en-US', options).replace(/,/, '');
  document.getElementById("dateTime")?.textContent = `Current Time: ${dateTimeString} EDT`;
}
setInterval(updateDateTime, 1000);

// Garden flower counter
let flowerCount = 0;
const plantBtn = document.getElementById("plantBtn");
if (plantBtn) {
  plantBtn.addEventListener("click", () => {
    if (flowerCount < 10) {
      flowerCount++;
      document.getElementById("flowerCount").textContent = flowerCount;
    } else {
      alert("Garden is full! 🌸");
    }
  });
}

// Initialize on load
window.onload = () => {
  createPetals();
  if (document.getElementById("poem1")) {
    const poem1Text = document.getElementById("poem1").innerHTML;
    const poem2Text = document.getElementById("poem2").innerHTML;
    document.getElementById("poem1").innerHTML = "";
    document.getElementById("poem2").innerHTML = "";
    typeWriter(poem1Text, "poem1");
    setTimeout(() => typeWriter(poem2Text, "poem2"), 5000);
  }
  updateDateTime();
};