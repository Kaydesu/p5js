let agents = [];

function setup() {
    createCanvas(500, 500);
    for (let i = 0; i < 150; i++) {
        agents.push(new Agent(random(width), random(height))); 
    }
}

function draw() {
    background(200);

    for (let i = 0; i < agents.length; i++) {
        agents[i].run(agents);
    }
}