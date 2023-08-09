class Rocket {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.thrustAcc = 1;

    this.a = 0;
    this.aVel = 0;
    this.aAcc = 0.005;
    this.maxAVel = 0.1;

    this.w = 36;
    this.h = 52;

    this.particles = [];
    this.numParticles = 2;

    this.initHTML();
  }

  initHTML() {
    this.html = document.createElement("div");
    this.html.id = "rocket";
    Container.append(this.html);

    this.html.style.left = `${win.w / 2 - this.h / 3}px`;
    this.html.style.top = `${win.h / 2 - this.w / 2}px`;

    this.html.style.borderTopWidth = `${this.w / 2}px`;
    this.html.style.borderBottomWidth = `${this.w / 2}px`;
    this.html.style.borderLeftWidth = `${this.h}px`;
    this.html.style.rotate = `${this.a}rad`;
  }

  update() {
    this.moveAngle();
    this.movePosition();
    this.updateParticles();
  }

  moveAngle() {
    this.dir = 0;
    if (keyDown("ArrowLeft")) this.dir--;
    if (keyDown("ArrowRight")) this.dir++;

    if (this.dir == 0) this.aVel *= 0.92;
    this.aVel += this.dir * this.aAcc;

    if (this.aVel > this.maxAVel) this.aVel = this.maxAVel;
    if (this.aVel < -this.maxAVel) this.aVel = -this.maxAVel;
    this.a += this.aVel;

    this.html.style.rotate = `${this.a}rad`;
  }

  movePosition() {
    if (keyDown(" ") || keyDown("ArrowUp")) this.thrust();

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  thrust() {
    this.vel.x += this.thrustAcc * Math.cos(this.a);
    this.vel.y += this.thrustAcc * Math.sin(this.a);

    for (let i = 0; i < this.numParticles; i++) this.createParticle();
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--)
      this.particles[i].update();
  }

  createParticle() {
    const x = this.pos.x;
    const y = this.pos.y;

    const speedOff = 2;
    const speed = 5 + Math.random() * (2 * speedOff) - speedOff;
    const off = 0.3;
    const angle = this.a + Math.random() * (2 * off) - off;
    const relX = speed * Math.cos(angle);
    const relY = speed * Math.sin(angle);

    const vx = this.vel.x - relX;
    const vy = this.vel.y - relY;

    const p = new Particle(x, y, vx, vy);
    this.particles.push(p);
  }
}
