class Chunk {
  constructor(i, j, k, num, parentLayer, before = false) {
    this.i = i;
    this.j = j;
    this.k = k;
    this.num = num;
    this.parentLayer = parentLayer;

    this.initHTML(before);
    this.load();
  }

  initHTML(before) {
    this.html = document.createElement("div");
    this.html.classList.add("chunk");

    if (before == false) this.parentLayer.html.append(this.html);
    else this.parentLayer.html.insertBefore(this.html, before);
  }

  getSeed() {
    return numLayers * spiral(this.i, this.j) + this.k;
  }

  load() {
    this.stars = [];

    random.setSeed(this.getSeed());

    for (let s = 0; s < this.num; s++) {
      const x = random.intRange(0, chunkSize.w);
      const y = random.intRange(0, chunkSize.h);
      const r = (random.float() * 3) / (this.k + 1) + 1;

      this.stars.push(new Star(this.i, this.j, this.k, x, y, r, this));
    }
  }
}
