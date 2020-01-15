offset = 5;
class Branch {
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

    branchStrike() {
        this.update();
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
            // noLoop()
        }
    }




    display() {
        let x = this.location.x;
        let y = this.location.y;

        stroke(0,0,255);
        noFill();
        strokeWeight(0.3);
        beginShape();
        for (let i = 0; i < this.bolts.length; i++) {
            if (dist(x, y, this.start.x, this.start.y) < abs(this.distance)) {
                this.bolts[i].x += random(-1, 1);
                this.bolts[i].y += random(-1, 1);
            }
            vertex(this.bolts[i].x, this.bolts[i].y)
        }
        endShape();

        stroke(0,0,255, 10);
        noFill();
        strokeWeight(5);
        beginShape();
        for (let i = 0; i < this.bolts.length; i++) {
            vertex(this.bolts[i].x, this.bolts[i].y)
        }
        endShape();
    }
}