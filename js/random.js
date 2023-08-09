class Random {
  constructor(seed, isOffset = false) {
    this.max = 2 ** 31 - 1;
    this.mult = Math.floor(Math.PI * 10 ** String(this.max).length);

    this.offset = isOffset ? new Date().getTime() : 1953;
    this.setSeed(seed);
  }

  setSeed(seed) {
    this.seed = seed;
    while (this.seed <= 0) this.seed += this.max - 1;

    this.seed += this.offset;
    this.seed %= this.max;

    this.int();
  }

  int() {
    this.seed *= this.mult;
    this.seed %= this.max;
    return this.seed;
  }

  intRange(min, max) {
    return Math.round(this.floatRange(min, max));
  }

  float() {
    return (this.int() - 1) / (this.max - 1);
  }

  floatRange(min, max) {
    return min + (max - min) * this.float();
  }

  bool() {
    return this.int() % 2 === 0;
  }
}
