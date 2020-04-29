
class Bird {

  static followMouse = false;

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

    this.speed = 5;
    this.vel = p5.Vector.random2D().mult(this.speed);
  }

  update() {
    this.count += .01;
    const random = this.app.noise(this.count) - .5;
    
    const angle = random * Math.PI * .01;
    this.vel.rotate(angle);

    this.pos.add(this.vel);

    // aparecer al otro lado de la pantalla si sale
    const padding = 20;
    if(this.pos.x < -padding) this.pos.x = window.innerWidth + padding;
    if(this.pos.x > window.innerWidth + padding) this.pos.x = -padding;
    if(this.pos.y < -padding) this.pos.y = window.innerHeight + padding;
    if(this.pos.y > window.innerHeight + padding) this.pos.y = -padding;

    if(Bird.followMouse){
      // seguir posición del mouse
      const mouse = new p5.Vector(this.app.mouseX, this.app.mouseY);
      mouse.sub(this.pos);
      mouse.setMag(1);
      this.vel.add(mouse);
      this.vel.setMag(this.speed);
    }

    this.flockBehavior();
  }

  flockBehavior() {
    const heading = this.vel.copy();
    this.birds.forEach(bird => {
      if(bird === this) return;

      const dist = this.pos.dist(bird.pos);

      if(dist < this.radius){

        // calcular ángulo entre birds
        const v2 = p5.Vector.sub(this.pos, bird.pos);
        v2.normalize();
        const v1 = this.vel.copy().normalize();
        const dot = p5.Vector.dot(v1, v2);
        const ang = Math.acos(dot/1);

        // si el otro bird está en el área de visibilidad
        if(ang > this.behindAngle / 2){
          // alejarlo si está muy cerca
          const cross = Math.sign((v1.x * v2.y) - (v1.y * v2.x));
          const close = 1 - dist / this.radius;
          this.vel.rotate( (ang/5) * cross * close*close*close );
  
          // sumar vectores que están dentro del área al heading
          const headingMod = bird.vel.copy();
          headingMod.mult(close);
          heading.add(headingMod);
  
          // debe acercarse si está dentro del área, pero lo afecta más mientras esté más lejos
          const dir = p5.Vector.sub(bird.pos, this.pos);
          const far = 1 - close;
          dir.setMag(.2 * far*far*far);
          this.vel.add(dir);
          this.vel.setMag(this.speed);
        }
      }
    });

    // aplicar ángulo de heading
    heading.setMag(1);
    this.vel.add(heading);
    this.vel.setMag(this.speed);
  }

  draw() {
    const d = 10;
    this.app.push();
    this.app.translate(this.pos.x, this.pos.y);
    this.app.rotate(this.vel.heading() + Math.PI/2);
    this.app.noStroke();
    if(this.selected) {
      this.app.fill(255, 30);
      this.app.arc(0, 0, this.radius*2, this.radius*2, this.behindAngle/2 + Math.PI/2, Math.PI * 2.5 - this.behindAngle/2);
    }
    this.app.fill(this.color);
    this.app.triangle(
      -d, d, // izquierda abajo
      d, d, // derecha abajo
      0, -d * 2,
    );
    this.app.pop();
  }
}