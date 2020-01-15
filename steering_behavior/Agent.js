class Agent {

    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.position = createVector(x, y)
        this.r = 3.0;
        this.maxspeed = 3;
        this.maxforce = 0.05;
    }

    run(agents) {
        this.flock(agents);
        this.update();
        this.borders();
        this.render();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    // We accumulate a new acceleration each time based on three rules
    flock(agents) {
        let sep = this.separate(agents);   // Separation
        let ali = this.align(agents);      // Alignment
        let coh = this.cohesion(agents);   // Cohesion
        // Arbitrarily weight these forces
        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);
        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    }

    // Method to update position
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelertion to 0 each cycle
        this.acceleration.mult(0);
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        let desired = p5.Vector.sub(target, this.position);  // A vector pointing from the position to the target
        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus Velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        return steer;
    }

    render() {
        // Draw a triangle rotated in the direction of velocity
        let theta = this.velocity.heading() + radians(90);
        fill(175);
        stroke(0);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape(TRIANGLES);
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape();
        pop();
    }

    // Wraparound
    borders() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }

    // Separation
    // Method checks for nearby boids and steers away
    separate(agents) {
        let desiredseparation = 25;
        let steer = createVector(0, 0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < agents.length; i++) {
            let d = dist(this.position.x, this.position.y, agents[i].position.x, agents[i].position.y);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, agents[i].position);
                diff.normalize();
                diff.div(d);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }

    // Alignment
    // For every nearby boid in the system, calculate the average velocity
    align(agents) {
        let neighbordist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < agents.length; i++) {
            let d = dist(this.position.x, this.position.y, agents[i].position.x, agents[i].position.y);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(agents[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return new p5.Vector(0, 0);
        }
    }

    // Cohesion
    // For the average position (i.e. center) of all nearby boids, calculate steering vector towards that position
    cohesion(agents) {
        let neighbordist = 50;
        let sum = createVector(0, 0);   // Start with empty vector to accumulate all positions
        let count = 0;
        for (let i = 0; i < agents.length; i++) {
            let d = dist(this.position.x, this.position.y, agents[i].position.x, agents[i].position.y);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(agents[i].position); // Add position
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum);  // Steer towards the position
        } else {
            return new p5.Vector(0, 0);
        }
    }
}