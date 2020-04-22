
class Bird {

  constructor(app, birds, color, selected) {
    this.app = app;
    this.birds = birds;
    this.pos = new p5.Vector(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    this.vel = null;
    this.color = color;
    this.selected = selected;

    this.count = Math.random() * 10000;

    this.radius = 150;
    this.behindAngle = Math.PI / 2;
  }

  update() {
    this.count += .01;
    const random = this.app.noise(this.count);
    const angle = random * Math.PI * 2;

    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(5);

    this.pos.add(this.vel);

    const padding = 20;
    if(this.pos.x < -padding) this.pos.x = window.innerWidth + padding;
    if(this.pos.x > window.innerWidth + padding) this.pos.x = -padding;
    if(this.pos.y < -padding) this.pos.y = window.innerHeight + padding;
    if(this.pos.y > window.innerHeight + padding) this.pos.y = -padding;
  }

  draw() {
    const d = 10;
    this.app.push();
    this.app.translate(this.pos.x, this.pos.y);
    this.app.rotate(this.vel.heading() + Math.PI/2);
    if(this.selected) {
      this.app.fill(255, 30);
      this.app.arc(0, 0, this.radius*2, this.radius*2, this.behindAngle/2 + Math.PI/2, Math.PI * 2.5 - this.behindAngle/2);
      //this.app.ellipse(0, 0, this.radius);
    }
    this.app.fill(this.color);
    this.app.triangle(
      -d, d, // izquierda abajo
      d, d, // derecha abajo
      0, -d * 2,
    );
    this.app.pop();

    this.birds.forEach(bird => {
      if(bird === this) return;

      const dist = this.pos.dist(bird.pos);
      const angle = this.pos.angleBetween(bird.pos);
      if(dist < this.radius){


        if(this.selected){
          this.app.stroke(this.color);
          this.app.line(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y);
        }
      }
    });
  }
}