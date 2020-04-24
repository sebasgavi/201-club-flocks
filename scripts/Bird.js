
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

    this.vel = p5.Vector.random2D().mult(5);
  }

  update() {
    this.count += .01;
    const random = this.app.noise(this.count) - .5;
    
    const angle = random * Math.PI * .01;
    this.vel.rotate(angle);

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
    this.app.noStroke();
    if(this.selected) {
      this.app.fill(255, 30);
      //this.app.arc(0, 0, this.radius*2, this.radius*2, this.behindAngle/2 + Math.PI/2, Math.PI * 2.5 - this.behindAngle/2);
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

      if(dist < this.radius){

        const v2 = p5.Vector.sub(this.pos, bird.pos);
        v2.normalize();
  
        const v1 = this.vel.copy().normalize();
        
        const dot = p5.Vector.dot(v1, v2);
        const ang = Math.acos(dot/1);

        const cross = Math.sign((v1.x * v2.y) - (v1.y * v2.x));

        const close = 1 - dist / this.radius;

        this.vel.rotate( (ang/5) * cross * close*close*close );

        if(ang > this.behindAngle / 2){

          if(false && this.selected){
            this.app.stroke(this.color);
            this.app.line(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y);
            this.app.noStroke();
            this.app.fill(this.app.color(255,255,0));
            this.app.text(close.toFixed(3), bird.pos.x + 10, bird.pos.y);
          }
        }
      }
    });
  }
}