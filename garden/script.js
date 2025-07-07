let tools = ['watering-can'];

function useTool(tool, plant) {
  if (tool === 'watering-can' && plant.classList.contains('stage-seed')) {
    waterPlant(plant);
  }
}

function waterPlant(plant) {
  plant.classList.remove('stage-seed');
  plant.classList.add('stage-bloom');
  plant.innerHTML = '🌻';
  document.getElementById('bloom-sound').play();
}

function waterAll() {
  document.querySelectorAll('.plant.stage-seed').forEach(plant => {
    useTool('watering-can', plant);
  });
}