function createSketch (app) {

  const birds = [];

  var running = true;

  window.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) running = !running;
  })

  app.setup = () => {
    app.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);

    for(let i = 0; i < 100; i++){
      let color = app.color(255);
      if(i === 99) color = app.color(255, 0, 0);
      birds.push(new Bird(app, birds, color, i === 99));
    }
  }
  

  app.draw = () => {
    app.background(0);

    birds.forEach(bird => {
      if(running) bird.update();
      bird.draw();
    });
  }
}

new p5(createSketch);