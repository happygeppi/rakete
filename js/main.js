const win = { w: innerWidth, h: innerHeight };

const chunkRadius = 1; // 1 gives 3x3, 2 gives 5x5, ...
const numChunks = 2 * chunkRadius + 1;
const chunkSize = { w: win.w / (numChunks - 1), h: win.h / (numChunks - 1) };
const numLayers = 10;

let random;

const stars = [];
let rocket;

const $ = (id) => document.getElementById(id);
const Container = $("container");

const keysDown = [];

let running = true;

function Init() {
  InitRandom();
  InitStars();
  InitRocket();
  InitHTML();

  Update();
}

function Update() {
  rocket.update();
  for (const layer of stars) layer.update();
  if (running) requestAnimationFrame(Update);
}

function InitRandom() {
  random = new Random(0, true);
}

function InitStars() {
  const density = (k) => 70 * (k / numLayers) ** 2 + 4;
  const distance = (k) => 20 * (k + 1);

  for (let k = 0; k < numLayers; k++)
    stars.push(new StarLayer(k, density(k), distance(k)));
}

function InitRocket() {
  rocket = new Rocket();
}

function InitHTML() {
  document.documentElement.style.setProperty("--num-chunks", numChunks);
  document.documentElement.style.setProperty(
    "--chunk-width",
    `${chunkSize.w}px`
  );
  document.documentElement.style.setProperty(
    "--chunk-height",
    `${chunkSize.h}px`
  );
}

function spiral(i, j) {
  if (i >= 0 && i >= Math.abs(j)) return 4 * i ** 2 - 3 * i + j + 1;

  if (j > 0 && j >= Math.abs(i)) return 4 * j ** 2 - j - i + 1;

  if (i < 0 && -i > Math.abs(j)) return 4 * i ** 2 - i - j + 3;

  if (j < 0 && -j >= Math.abs(i)) return 4 * j ** 2 - 3 * j + i + 3;

  return "not working";
}

function keyDown(key) {
  return keysDown.includes(key);
}

function map(val, inmin, inmax, outmin, outmax) {
  return outmin + ((outmax - outmin) * (val - inmin)) / (inmax - inmin);
}

document.addEventListener("keydown", (e) => {
  if (!keysDown.includes(e.key)) keysDown.push(e.key);
});
document.addEventListener("keyup", (e) => {
  keysDown.splice(keysDown.indexOf(e.key), 1);
});

Init();

/*

TODO:

change thrust --> slower particles

add planets on rocket layer --> gravity

zoom on mouse scroll --> smaller & "slower" rocket & planets (no change to stars)

*/
