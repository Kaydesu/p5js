let offset = 5;
class Lightning {
    constructor(direction, distance, start) {
        this.direction = direction.normalize();
        this.bolts = [];
        if (start != null) {
            this.location = start;
            this.start = new p5.Vector(start.x, start.y);
        }
        else this.location = createVector(0, 0);
        this.lightnings = [];
        this.distance = distance;
    }

    strike() {
        this.update();
        this.splitStrike();
        this.display();
    }

    update() {
        let x = this.location.x;
        let y = this.location.y;
        if (dist(x, y, this.start.x, this.start.y) < abs(this.distance)) {
            this.location.add(this.direction);
            let random_dir = createVector(random(this.direction.x * 15), random(this.direction.y * 15))
            this.location.add(random_dir)
            let newpos = createVector(this.location.x, this.location.y);
            this.bolts.push(newpos);
        }

        else {
            noLoop()
        }
    }

    splitStrike() {

        let n = this.bolts.length;

        if (n > 2) {
            let last = createVector(this.bolts[n - 1].x, this.bolts[n - 1].y);
            let toLast = createVector(this.bolts[n - 2].x, this.bolts[n - 2].y);
            let latestBolt = new p5.Vector.sub(last, toLast);
            let angle = this.direction.angleBetween(latestBolt);




            if (abs(degrees(angle)) > 30) {
                let direction = latestBolt;
                let distance = random(this.distance / 6);

                let newStart = new p5.Vector(last.x, last.y)

                this.lightnings.push(new Branch(direction, distance, newStart));
            }
        }
    }


    display() {
        let x = this.location.x;
        let y = this.location.y;

        stroke(0,0,255);
        noFill();
        strokeWeight(0.5);
        beginShape();
        for (let i = 0; i < this.bolts.length; i++) {
            // if (dist(x, y, this.start.x, this.start.y) < abs(this.distance)) {
                this.bolts[i].x += random(-1, 1);
                this.bolts[i].y += random(-1, 1);
            // }
            vertex(this.bolts[i].x, this.bolts[i].y)
        }
        endShape();
        
        stroke(0,0,255,5);
        noFill();
        strokeWeight(25);
        beginShape();
        for (let i = 0; i < this.bolts.length; i++) {
            vertex(this.bolts[i].x, this.bolts[i].y)
        }
        endShape();

        for (let i = 0; i < this.lightnings.length; i++) {
            this.lightnings[i].branchStrike();
        }
    }
}