let angle = 0;
class Flowfield {

    constructor(res) {
        this.resolution = res;
        this.cols = width / this.resolution;
        this.rows = height / this.resolution;
        // A flow field is a two dimensional array of p5Vectors

        this.time = 0;

        this.field = new Array(this.cols);
        for (let c = 0; c < this.cols; c++) {
            this.field[c] = new Array(this.rows);
        }

        // this.initPerlinNoise();
    }

    initPerlinNoise() {
        // Reseed noise so we get a new flow field every time
        //   noiseSeed(random(10000));
        let xoff = 0;
        for (let i = 0; i < this.cols; i++) {
            let yoff = 0;
            for (let j = 0; j < this.rows; j++) {
                let theta = map(noise(xoff, yoff, this.time), 0, 1, 0, TWO_PI);
                // Polar to cartesian coordinate transformation to get x and y components of the vector
                this.field[i][j] = createVector(cos(theta), sin(theta));
                // this.field[i][j] = theta;
                yoff += 0.1;
            }
            xoff += 0.1;
            this.time += 0.00012
        }
    }



    // Draw every vector
    display() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution);
            }
        }
    }

    // Renders a vector object 'v' as an arrow and a position 'x,y'
    drawVector(v, x, y, scayl) {
        push();
        let arrowsize = 4;
        // Translate to position to render vector
        translate(x - width / 2 + this.resolution / 2, y - width / 2 + this.resolution / 2, v / 2);
        stroke(50, 100);
        // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
        rotate(v.heading());
        // Calculate length of vector & scale it to be bigger or smaller if necessary
        let len = v.mag() * scayl;
        // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
        line(0, 0, len, 0);
        //line(len,0,len-arrowsize,+arrowsize/2);
        //line(len,0,len-arrowsize,-arrowsize/2);
        pop();
    }

    lookup(lookup) {
        let column = floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
        let row = floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));

        return this.field[column][row]
    }


}