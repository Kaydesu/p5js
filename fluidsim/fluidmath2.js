function diffuse(b, x, x0, diff, dt) {
    let i, j, k;
    let a = dt * diff * N * N;
    for (k = 0; k < iter; k++) {
        for (i = 1; i <= N; i++) {
            for (j = 1; j <= N; j++) {
                x[IX(i, j)] = (x0[IX(i, j)] + a * (x[IX(i - 1, j)] + x[IX(i + 1, j)] +
                    x[IX(i, j - 1)] + x[IX(i, j + 1)])) / (1 + 4 * a);
            }
        }
        set_bnd(b, x);
    }
}

function advect(b, d, d0, u, v, dt) {
    let i, j, i0, j0, i1, j1;
    let x, y, s0, t0, s1, t1, dt0;
    dt0 = dt * N;
    for (i = 1; i <= N; i++) {
        for (j = 1; j <= N; j++) {
            x = i - dt0 * u[IX(i, j)]; y = j - dt0 * v[IX(i, j)];
            if (x < 0.5) x = 0.5; if (x > N + 0.5) x = N + 0.5; i0 = floor(x); i1 = i0 + 1;
            if (y < 0.5) y = 0.5; if (y > N + 0.5) y = N + 0.5; j0 = floor(y); j1 = j0 + 1;
            s1 = x - i0; s0 = 1 - s1; t1 = y - j0; t0 = 1 - t1;
            d[IX(i, j)] = s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) +
                s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)]);
        }
    }
    set_bnd(b, d);
}

function project(u, v, p, div) {
    let i, j, k;
    let h;
    h = 1 / N;
    for (i = 1; i <= N; i++) {
        for (j = 1; j <= N; j++) {
            div[IX(i, j)] = -0.5 * h * (u[IX(i + 1, j)] - u[IX(i - 1, j)] +
                v[IX(i, j + 1)] - v[IX(i, j - 1)]);
            p[IX(i, j)] = 0;
        }
    }
    set_bnd(0, div);
    set_bnd(0, p);
    for (k = 0; k < 20; k++) {
        for (i = 1; i <= N; i++) {
            for (j = 1; j <= N; j++) {
                p[IX(i, j)] = (div[IX(i, j)] + p[IX(i - 1, j)] + p[IX(i + 1, j)] +
                    p[IX(i, j - 1)] + p[IX(i, j + 1)]) / 4;
            }
        }
        set_bnd(0, p);
    }
    for (i = 1; i <= N; i++) {
        for (j = 1; j <= N; j++) {
            u[IX(i, j)] -= 0.5 * (p[IX(i + 1, j)] - p[IX(i - 1, j)]) / h;
            v[IX(i, j)] -= 0.5 * (p[IX(i, j + 1)] - p[IX(i, j - 1)]) / h;
        }
    }
    set_bnd(1, u);
    set_bnd(2, v);
}


function set_bnd(b, x) {
    let i;
    for (i = 1; i <= N; i++) {
        x[IX(0, i)] = b == 1 ? -x[IX(1, i)] : x[IX(1, i)];
        x[IX(N + 1, i)] = b == 1 ? -x[IX(N, i)] : x[IX(N, i)];
        x[IX(i, 0)] = b == 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
        x[IX(i, N + 1)] = b == 2 ? -x[IX(i, N)] : x[IX(i, N)];
    }
    x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
    x[IX(0, N + 1)] = 0.5 * (x[IX(1, N + 1)] + x[IX(0, N)]);
    x[IX(N + 1, 0)] = 0.5 * (x[IX(N, 0)] + x[IX(N + 1, 1)]);
    x[IX(N + 1, N + 1)] = 0.5 * (x[IX(N, N + 1)] + x[IX(N + 1, N)]);
}

function dens_step(x, x0, u, v, diff, dt) {
    SWAP(x0, x);
    diffuse(0, x, x0, diff, dt);
    SWAP(x0, x);
    advect(0, x, x0, u, v, dt);
}

function vel_step(u, v, u0, v0, visc, dt) {
    SWAP(u0, u);
    diffuse(1, u, u0, visc, dt);
    SWAP(v0, v);
    diffuse(2, v, v0, visc, dt);
    project(u, v, u0, v0);
    SWAP(u0, u); 
    SWAP(v0, v);
    advect(1, u, u0, u0, v0, dt); 
    advect(2, v, v0, u0, v0, dt);
    project(u, v, u0, v0);
}

