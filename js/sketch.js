import { mapValue, restrain, getRandomInt, getMs } from "./functions.js";
import Vector from "./classes.js";
import { barnsley } from "./coefficients.js";

/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas").getContext("2d");
const divRanges = document.getElementById("optionsDiv");
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
  ctx.fillStyle = "rgb(0, 255, 0,0.25)";
  divRanges.appendChild(rangeLabel);
  rangeLabel.textContent = "Rep/f";
  divRanges.appendChild(range);
  divRanges.appendChild(button);
  range.setAttribute("type", "range");
  range.setAttribute("min", "1");
  range.setAttribute("max", "1000");
  range.setAttribute("value", "250");
  button.innerHTML = "<span>Reset</span> Button";
  button.addEventListener("click", clear);
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
  point.assign(fractal(point, barnsley));

  function fractal(vector, coefficient) {
    const p = Math.random();
    const newVector = new Vector();
    if (p < coefficient.f1.p) {
      newVector.x =
        coefficient.f1.multiplyMatrix[0] * vector.x +
        coefficient.f1.multiplyMatrix[1] * vector.y +
        coefficient.f1.sumMatrix[0];
      newVector.y =
        coefficient.f1.multiplyMatrix[2] * vector.x +
        coefficient.f1.multiplyMatrix[3] * vector.y +
        coefficient.f1.sumMatrix[1];
    } else if (p < coefficient.f1.p + coefficient.f2.p) {
      newVector.x =
        coefficient.f2.multiplyMatrix[0] * vector.x +
        coefficient.f2.multiplyMatrix[1] * vector.y +
        coefficient.f2.sumMatrix[0];
      newVector.y =
        coefficient.f2.multiplyMatrix[2] * vector.x +
        coefficient.f2.multiplyMatrix[3] * vector.y +
        coefficient.f2.sumMatrix[1];
    } else if (p < coefficient.f1.p + coefficient.f2.p + coefficient.f3.p) {
      newVector.x =
        coefficient.f3.multiplyMatrix[0] * vector.x +
        coefficient.f3.multiplyMatrix[1] * vector.y +
        coefficient.f3.sumMatrix[0];
      newVector.y =
        coefficient.f3.multiplyMatrix[2] * vector.x +
        coefficient.f3.multiplyMatrix[3] * vector.y +
        coefficient.f3.sumMatrix[1];
    } else {
      newVector.x =
        coefficient.f4.multiplyMatrix[0] * vector.x +
        coefficient.f4.multiplyMatrix[1] * vector.y +
        coefficient.f4.sumMatrix[0];
      newVector.y =
        coefficient.f4.multiplyMatrix[2] * vector.x +
        coefficient.f4.multiplyMatrix[3] * vector.y +
        coefficient.f4.sumMatrix[1];
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
}, getMs(60));
