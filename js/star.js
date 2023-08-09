class Star {
  constructor(i, j, k, x, y, r, parentChunk) {
    this.i = i;
    this.j = j;
    this.k = k;

    this.x = x;
    this.y = y;
    this.r = r;

    this.parentChunk = parentChunk;

    this.initHTML();
  }

  initHTML() {
    this.html = document.createElement("div");
    this.html.classList.add("star");
    this.parentChunk.html.append(this.html);

    this.html.style.setProperty("--r", `${this.r}px`);
    this.html.style.left = `${this.x}px`;
    this.html.style.top = `${this.y}px`;
  }
}
