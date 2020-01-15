let N = 64;
let SCALE = 10;
let iter = 0.1;
let fluid;

function setup() {
    createCanvas(N * SCALE, N * SCALE);
    fluid = new Fluid(0.1, 0, 0);
    fluid.init();
}

function mouseDragged() {
    fluid.addDensity(mouseX/SCALE, mouseY/SCALE, 100);
    let amtX = mouseX - pmouseX;
    let amtY = mouseY - pmouseY;
    fluid.addVelocity(mouseX/SCALE, mouseY/SCALE, amtX, amtY);
}


function draw() {
    background(0);
    fluid.step();
    fluid.renderD();
}