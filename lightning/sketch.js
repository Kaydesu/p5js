let lightnings = [];
let lightning;
let delay;


function setup() {
    createCanvas(500, 500);

    delay = new p5.Delay();
    let start = createVector(0, 0);
    let end = createVector(450, 450);

    lightning = new Lightning(start, end);

    colorMode(HSB, 360, 100, 100, 100);


}

function draw() {
    background(0);
    lightning.strike();
    delay.delayTime(1);

    // lightning.end = createVector(mouseX, mouseY)



}

function mousePressed() {
    lightning.start = createVector(mouseX, mouseY);
}

function mouseReleased() {
    lightning.end = createVector(mouseX, mouseY)
}