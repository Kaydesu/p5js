let lightnings = [];
let lightning;


function setup() {
    createCanvas(500, 500);
    background(0);
    for (let i = 0; i < 1; i++) {
        let dir = createVector(1, 1);
        let position = createVector(random(0, 20), random(-4));
        lightnings.push(new Lightning(dir, 800, position));
    }


}

function draw() {
    background(0, 10)
    for (let i = 0; i < lightnings.length; i++) {
        lightnings[i].strike();   
    }
}