class Particle {
  constructor(x, y, vx, vy) {
    this.pos = { x, y };
    this.vel = { x: vx, y: vy };
    this.r = 2;

    this.age = 0;
    this.lifespan = 50;

    this.hue = Math.random() * 50;

    this.initHTML();
  }

  initHTML() {
    this.html = document.createElement("div");
    this.html.classList.add("particle");
    Container.append(this.html);

    this.html.style.width = `${2 * this.r}px`;
    this.html.style.height = `${2 * this.r}px`;
    this.updateHTML();
  }

  update() {
    this.move();
    this.updateHTML();
    this.aging();
  }

  aging() {
    this.age++;
    if (this.age >= this.lifespan) this.die();
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.updateHTML();
  }

  updateHTML() {
    const sat = map(this.age, 0, this.lifespan, 100, -20);
    const alpha = map(this.age, 0, this.lifespan, 1, 0);
    this.html.style.backgroundColor = `hsla(${this.hue}, ${sat}%, 40%, ${alpha})`;

    this.html.style.left = `${win.w / 2 + this.pos.x - rocket.pos.x}px`;
    this.html.style.top = `${win.h / 2 + this.pos.y - rocket.pos.y}px`;
  }

  die() {
    this.html.remove();
    rocket.particles.splice(rocket.particles.indexOf(this), 1);
  }
}
