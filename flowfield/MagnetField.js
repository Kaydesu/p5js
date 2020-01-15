class MagnetField {

    constructor(res) {
        this.resolution = res;
        this.cols = width / this.resolution;
        this.rows = height / this.resolution;
        // A flow field is a two dimensional array of p5Vectors

        this.time = 0;

        this.magnet = new Array(this.cols);
        for (let c = 0; c < this.cols; c++) {
            this.magnet[c] = new Array(this.rows);
        }

    }

    init() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.magnet[i][j] = 50
            }
        }
    }

    drawField() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let x = i * this.resolution;
                let y = j * this.resolution;
                let v = this.magnet[i][j];
                push();
                // noStroke();
                // fill(74);
                pointLight(255, 255, 255, -200, 0, 500);
                pointLight(255, 0, 0, 200, 200, 500)
                ambientMaterial(255);
                translate(x - width / 2 + this.resolution / 2, y - width / 2 + this.resolution / 2, v / 2);
                box(this.resolution, this.resolution, v);
                pop();
            }
        }
    }

    magnetized(particle) {
        let x = particle.position.x;
        let y = particle.position.y;

        let gridX = floor(x / 24);
        let gridY = floor(y / 24);

        gridX = constrain(gridX, 0, 23);
        gridY = constrain(gridY, 0, 23);

        this.magnet[gridX][gridY] += 0.5;
        this.magnet[gridX][gridY] = constrain(this.magnet[gridX][gridY], 50, 80);

    }

    deMagnetized() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.magnet[i][j] -= 0.4;
                this.magnet[i][j] = constrain(this.magnet[i][j], 50, 80)
            }
        }
    }
}