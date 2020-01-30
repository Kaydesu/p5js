let offset = 5;
let angle = 0;
class Lightning {
    constructor(start, end) {
        if (start != null) this.start = start;
        else this.start = createVector(width / 2, height / 2);
        if (end != null) this.end = end;
        else this.end = createVector(450, 450);

        this.power = 100;
        this.res = 25;
        this.bolts = [];

        this.oldEnd = new p5.Vector(this.end.x, this.end.y);
    }

    strike() {

        this.update();
        this.draw();
        this.endChange();
        this.clean();
    }

    draw() {
        noFill();
        for (let i = 100; i > 0; i--) {
            let weight = map(i, 100, 0, 25, 1);
            let s = i;
            let b = map(i, 100, 0, 0, 100);
            let a = map(i, 100, 0, 0, 100);
            stroke(240, s, b, a);
            strokeWeight(weight);
            beginShape();
            for (let i = 0; i < this.bolts.length; i++) {
                vertex(this.bolts[i].x, this.bolts[i].y);
            }
            endShape();
        }


        // stroke(240, 0, 100, 100);
        // strokeWeight(1);
        // beginShape();
        // for (let i = 0; i < this.bolts.length; i++) {
        //     let x = this.bolts[i].x;
        //     let y = this.bolts[i].y;
        //     vertex(x, y);
        // }
        // endShape();
        // strokeWeight(0.3);

        // for (let i = 1; i < this.bolts.length - 1; i++) {
        //     let x = this.bolts[i].x;
        //     let y = this.bolts[i].y;
        //     circle(x, y, 6);
        // }
    }



    update() {

        let direction = new p5.Vector.sub(this.end, this.start);
        direction.normalize();
        direction.setMag(15);
        let len = dist(this.end.x, this.end.y, this.start.x, this.start.y);
        let alpha = direction.heading();
        let avr_len = len / this.res;
        let bolt_len = 0;

        this.bolts.push(new p5.Vector(this.start.x, this.start.y));
        let xoff = random(10000);
        for (let i = 1; i < this.res; i++) {
            bolt_len += random(avr_len - 1, avr_len + 1);
            bolt_len += avr_len;
            let ns = noise(xoff);
            
            ns = map(ns, 0, 1, -PI/8, PI/8);
            let random_alpha = alpha + ns;
            let x = bolt_len * cos(random_alpha) + this.start.x;
            let y = bolt_len * sin(random_alpha) + this.start.y;    
            this.bolts.push(new p5.Vector(x, y));
            xoff += 0.08;
            
        }
        // this.bolts.push(new p5.Vector(this.end.x, this.end.y));
    }

    endChange() {
        if (this.oldEnd.equals(this.end.x, this.end.y) == false) {
            this.bolts = [];
        }
    }

    clean() {
        if (this.bolts.length > this.res-15) {
            this.bolts.splice(this.res, 1);
        }
        this.bolts = [];
    }

    propotional_update(ver1, ver2) {
        let ds = dist(ver1.x, ver1.y, ver2.x, ver2.y);
        let update_val = ds * ds;
        return update_val;
    }

    propotional() {
        for(i = 1; i < this.bolts.length - 1; i++) {
            
        }
    }
}