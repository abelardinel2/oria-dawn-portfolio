document.querySelectorAll('.plant').forEach(plant => {
  plant.onclick = () => useTool('watering-can', plant);
});

document.getElementById('waterBtn').onclick = () => waterAll();

function useTool(tool, plant) {
  if (tool === 'watering-can' && plant.classList.contains('stage-seed')) {
    waterPlant(plant);
  }
}

function waterPlant(plant) {
  plant.classList.remove('stage-seed');
  plant.classList.add('stage-bloom');
  plant.innerHTML = '🌻';
}

function waterAll() {
  const seeds = document.querySelectorAll('.plant.stage-seed');
  seeds.forEach(plant => useTool('watering-can', plant));
}
