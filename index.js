$.ready(() => {
  let html = ''
  for (let y = 1; y <= 4; y++) {
    for (let x = 1; x <= 8; x++) {
      html += `<div id="plant-${y}-${x}"><div class="pot"></div><div class="plant"></div></div>`
    }
  }

  $('#plant-container').innerHTML = html

  setupPlant('Pot', 'anim_zengarden', '#plant-1-1 .pot')
  setupPlant('PeaShooterSingle', 'anim_full_idle', '#plant-1-1 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-1-2 .pot')
  setupPlant('SunFlower', 'anim_idle', '#plant-1-2 .plant')
  
  setupPlant('Pot', 'anim_zengarden', '#plant-1-3 .pot')
  setupPlant('CherryBomb', 'anim_idle', '#plant-1-3 .plant')
  
  setupPlant('Pot', 'anim_zengarden', '#plant-1-4 .pot')
  setupPlant('Wallnut', 'anim_idle', '#plant-1-4 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-1-5 .pot')
  setupPlant('PotatoMine', 'anim_armed', '#plant-1-5 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-1-6 .pot')
  setupPlant('SnowPea', 'anim_full_idle', '#plant-1-6 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-1-7 .pot')
  setupPlant('Chomper', 'anim_idle', '#plant-1-7 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-1-8 .pot')
  setupPlant('PeaShooter', 'anim_full_idle', '#plant-1-8 .plant')

  setupPlant('Pot', 'anim_waterplants', '#plant-2-1 .pot')
  setupPlant('LilyPad', 'anim_idle', '#plant-2-1 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-2-2 .pot')
  setupPlant('Squash', 'anim_idle', '#plant-2-2 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-2-3 .pot')
  // setupPlant('ThreePeater', 'anim_idle', '#plant-2-3 .plant')
  setupPlant('GoldMagnet', 'anim_idle', '#plant-2-3 .plant')

  setupPlant('Pot', 'anim_waterplants', '#plant-2-4 .pot')
  setupPlant('Tanglekelp', 'anim_idle', '#plant-2-4 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-2-5 .pot')
  setupPlant('Jalapeno', 'anim_idle', '#plant-2-5 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-2-6 .pot')
  setupPlant('Caltrop', 'anim_idle', '#plant-2-6 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-2-7 .pot')
  setupPlant('Torchwood', 'anim_idle', '#plant-2-7 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-2-8 .pot')
  setupPlant('Tallnut', 'anim_idle', '#plant-2-8 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-1 .pot')
  setupPlant('Plantern', 'anim_idle', '#plant-3-1 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-2 .pot')
  setupPlant('Cactus', 'anim_idle', '#plant-3-2 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-3 .pot')
  setupPlant('Blover', 'anim_idle', '#plant-3-3 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-4 .pot')
  // setupPlant('SplitPea', 'anim_idle', '#plant-3-4 .plant')
  setupPlant('FumeShroom', 'anim_idle', '#plant-3-4 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-5 .pot')
  setupPlant('Starfruit', 'anim_idle', '#plant-3-5 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-6 .pot')
  setupPlant('Pumpkin', 'anim_idle', '#plant-3-6 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-7 .pot')
  setupPlant('Magnetshroom', 'anim_idle', '#plant-3-7 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-3-8 .pot')
  setupPlant('Cabbagepult', 'anim_idle', '#plant-3-8 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-1 .pot')
  setupPlant('Cornpult', 'anim_full_idle', '#plant-4-1 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-2 .pot')
  setupPlant('Coffeebean', 'anim_idle', '#plant-4-2 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-3 .pot')
  setupPlant('Garlic', 'anim_idle', '#plant-4-3 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-4 .pot')
  setupPlant('Umbrellaleaf', 'anim_idle', '#plant-4-4 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-5 .pot')
  setupPlant('Marigold', 'anim_idle', '#plant-4-5 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-6 .pot')
  setupPlant('Melonpult', 'anim_idle', '#plant-4-6 .plant')

  setupPlant('Pot', 'anim_zengarden', '#plant-4-7 .pot')
  setupPlant('TwinSunflower', 'anim_idle', '#plant-4-7 .plant')

  setupPlant('Pot', 'anim_waterplants', '#plant-4-8 .pot')
  setupPlant('Cattail', 'anim_idle', '#plant-4-8 .plant')

  $('html').style.overflow = 'hidden'

  $('html').on('click', () => {
    $('#audio').play()
  })
})