class StarLayer {
  constructor(k, den, dist) {
    this.k = k;
    this.den = den;
    this.dist = dist;
    this.offset = { i: 0, j: 0 };
    this.init();
  }

  init() {
    this.initHTML();
    this.initChunks();
  }

  initHTML() {
    this.html = document.createElement("div");
    this.html.classList.add("layer");
    Container.append(this.html);
    this.html.style.zIndex = 100 - this.k;
  }

  initChunks() {
    this.chunks = [];

    let j = -chunkRadius;
    for (let a = 0; a < numChunks; a++) {
      this.chunks.push([]);

      let i = -chunkRadius;
      for (let b = 0; b < numChunks; b++) {
        this.chunks[a].push(new Chunk(i, j, this.k, this.den, this));
        i++;
      }

      j++;
    }
  }

  update() {
    this.checkChunks();
    this.move();
  }

  move() {
    this.x = -rocket.pos.x / this.dist + this.offset.i * chunkSize.w;
    this.y = -rocket.pos.y / this.dist + this.offset.j * chunkSize.h;

    this.html.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  checkChunks() {
    const topLeft = this.chunks[0][0].html.getBoundingClientRect();
    const bottomRight =
      this.chunks[numChunks - 1][numChunks - 1].html.getBoundingClientRect();

    if (topLeft.top > 0) this.loadChunksTop();
    if (topLeft.left > 0) this.loadChunksLeft();
    if (bottomRight.bottom < win.h) this.loadChunksBottom();
    if (bottomRight.right < win.w) this.loadChunksRight();
  }

  loadChunksTop() {
    this.offset.j--;
    this.chunks.unshift([]);

    for (let a = numChunks - 1; a >= 0; a--) {
      this.chunks[numChunks][a].html.remove();
      const i = this.chunks[1][0].i + a;
      const j = this.chunks[1][0].j - 1;
      this.chunks[0].unshift(
        new Chunk(i, j, this.k, this.den, this, this.html.firstChild)
      );
    }

    this.chunks.splice(numChunks, 1);
  }

  loadChunksLeft() {
    this.offset.i--;

    for (let b = 0; b < numChunks; b++) {
      this.chunks[b][numChunks - 1].html.remove();
      this.chunks[b].splice(numChunks - 1, 1);

      const i = this.chunks[0][0].i - 1;
      const j = this.chunks[0][0].j + b;

      this.chunks[b].unshift(
        new Chunk(i, j, this.k, this.den, this, this.chunks[b][0].html)
      );
    }
  }

  loadChunksBottom() {
    this.offset.j++;
    this.chunks.push([]);

    for (let a = 0; a < numChunks; a++) {
      this.chunks[0][a].html.remove();

      const i = this.chunks[numChunks - 1][0].i + a;
      const j = this.chunks[numChunks - 1][0].j + 1;

      this.chunks[numChunks].push(new Chunk(i, j, this.k, this.den, this));
    }

    this.chunks.splice(0, 1);
  }

  loadChunksRight() {
    this.offset.i++;

    for (let b = 0; b < numChunks; b++) {
      this.chunks[b][0].html.remove();
      this.chunks[b].splice(0, 1);

      const i = this.chunks[0][numChunks - 2].i + 1;
      const j = this.chunks[0][numChunks - 2].j + b;

      const before = b == numChunks - 1 ? false : this.chunks[b + 1][0].html;
      this.chunks[b].push(new Chunk(i, j, this.k, this.den, this, before));
    }
  }
}
