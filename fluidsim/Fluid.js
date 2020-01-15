function IX(x, y) {
    x = constrain(x, 0, N - 1);
    y = constrain(y, 0, N - 1)
    return x + y * N;
}

class Fluid {
    constructor(dt, diffusion, viscosity) {
        this.size = N;
        this.dt = dt;
        this.diff = diffusion;
        this.vis = viscosity;

        this.s = [];
        this.density = [];

        this.Vx = [];
        this.Vy = [];

        this.Vx0 = [];
        this.Vy0 = [];

    }

    init() {
        for (let i = 0; i < N; i++) {
            this.s.push(0);
            this.density.push(0);

            this.Vx.push(0);
            this.Vy.push(0);

            this.Vx0.push(0);
            this.Vy0.push(0);
        }
    }

    addDensity(x, y, amount) {
        let index = IX(x, y);
        this.density[index] = this.density[index] + amount;
    }

    addVelocity(x, y, amountX, amountY) {
        let index = IX(x, y);
        this.Vx[index] += amountX;
        this.Vy[index] += amountY;
    }

    step() {
        let visc = this.visc;
        let diff = this.diff;
        let dt = this.dt;
        let Vx = this.Vx;
        let Vy = this.Vy;
        let Vx0 = this.Vx0;
        let Vy0 = this.Vy0;
        let s = this.s;
        let density = this.density;

        diffuse(1, Vx0, Vx, visc, dt);
        diffuse(2, Vy0, Vy, visc, dt);


        project(Vx0, Vy0, Vx, Vy);

        advect(1, Vx, Vx0, Vx0, Vy0, dt);
        advect(2, Vy, Vy0, Vx0, Vy0, dt);


        project(Vx, Vy, Vx0, Vy0);

        diffuse(0, s, density, diff, dt);
        advect(0, density, s, Vx, Vy, dt);
    }

    renderD() {
        colorMode(HSB, 255);

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                let x = i * SCALE;
                let y = j * SCALE;
                let d = this.density[IX(i, j)];
                fill((d + 50) % 255, 200, d);
                noStroke();
                square(x, y, SCALE);
            }
        }
    }

}

