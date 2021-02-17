/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas").getContext("2d");
const divRanges = document.getElementById("div");
const button = document.createElement("button");
const range = document.createElement("input");
const rangeLabel = document.createElement("label");
const width = window.screen.height / 1.8;
const height = window.screen.height / 1.8;
const point = new Vector(0, 0);
let repsFrame = 250;

const minX = -2.182;
const maxX = 2.6558;
const minY = 0;
const maxY = 9.9983;

function setup() {
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "green";
  divRanges.appendChild(rangeLabel);
  rangeLabel.textContent = "Rep/f";
  divRanges.appendChild(range);
  divRanges.appendChild(button);
  range.setAttribute("type", "range");
  range.setAttribute("min", "1");
  range.setAttribute("max", "1000");
  range.setAttribute("value", "250");
  button.innerHTML = "<span>Reset</span> Button";
  button.addEventListener("click", () => clear());
  range.addEventListener("input", () => {
    repsFrame = range.value;
  });
}

function draw() {
  ctx.fillRect(
    mapValue(point.x, minX, maxX, 0, width),
    mapValue(point.y, maxY, minY, 0, height),
    1,
    1
  );
}

function update() {
  point.assign(fractal(point));

  function fractal(vector) {
    const p = Math.random();
    const newVector = new Vector();

    if (p < 0.01) {
      newVector.x = 0;
      newVector.y = vector.y * 0.16;
    } else if (p < 0.86) {
      newVector.x = 0.85 * vector.x + 0.04 * vector.y;
      newVector.y = -0.04 * vector.x + 0.85 * vector.y + 1.6;
    } else if (p < 0.93) {
      newVector.x = 0.2 * vector.x - 0.26 * vector.y;
      newVector.y = 0.23 * vector.x + 0.22 * vector.y + 1.6;
    } else {
      newVector.x = -0.15 * vector.x + 0.28 * vector.y;
      newVector.y = 0.26 * vector.x + 0.24 * vector.y + 0.44;
    }
    return newVector;
  }
}

function clear() {
  point.assign(new Vector(0, 0));
  ctx.clearRect(0, 0, width, height);
}

setup();
setInterval(() => {
  for (let i = 0; i < repsFrame; i++) {
    update();
    draw();
  }
}, getMs(20));
