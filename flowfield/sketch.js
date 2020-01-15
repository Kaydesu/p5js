let flowfield;
let particles = [];
let magnetfield;


function setup() {
  createCanvas(576, 576, WEBGL);
  // camera(0, 0, (height / 2) / tan(PI / 6) + 90, 0, 0, 0, 0, 1, 0);
  flowfield = new Flowfield(24);
  magnetfield = new MagnetField(24);
  magnetfield.init();
  for (let i = 0; i < 100; i++) {
    particles.push(new Magnet(width/2, height/2))

  }
}

function mouseDragged() {
  camera(mouseX, mouseY, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
}

function draw() {
  background(200);

  // flowfield.initPerlinNoise();
  magnetfield.drawField();
  magnetfield.deMagnetized();

  for (let i = 0; i < particles.length; i++) {
    particles[i].run(particles);
    magnetfield.magnetized(particles[i]);
  }

}