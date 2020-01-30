// Fluid Simulation
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html
// https://youtu.be/alhpH6ECFvQ

// This would not be possible without:
// Real-Time Fluid Dynamics for Games by Jos Stam
// http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
// Fluid Simulation for Dummies by Mike Ash
// https://mikeash.com/pyblog/fluid-simulation-for-dummies.html

let N = 54;
let iter = 5;
let SCALE = 10;
let t = 0;

let fluid;

function setup() {
    createCanvas(N * SCALE, N * SCALE)
    fluid = new Fluid(1, 0, 0.0000001);
}

//void mouseDragged() {
//}

function draw() {
    background(0);
    // let cx = int(0.5 * width / SCALE);
    // let cy = int(0.5 * height / SCALE);
    // for (let i = -1; i <= 1; i++) {
    //  for (let j = -1; j <= 1; j++) {
    //    fluid.addDensity(cx+i, cy+j, random(50, 150));
    //  }
    // }
    // for (let i = 0; i < 1; i++) {
    //     let angle = noise(t) * TWO_PI * 2;
    //     let v = p5.Vector.fromAngle(angle);
    //     v.mult(0.2);
    //     t += 0.01;
    //     fluid.addVelocity(cx, cy, v.x, v.y);
    // }


    fluid.step();
    fluid.renderD();
    //fluid.renderV();
    fluid.fadeD();
}

function mouseDragged() {
    let x = floor(mouseX / SCALE);
    let y = floor(mouseY / SCALE);
    let px = floor(pmouseX / SCALE);
    let py = floor(pmouseY / SCALE);
    fluid.addDensity(x, y, 500);
    fluid.addVelocity(x, y, x - px, y - py);
}