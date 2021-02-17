import { mapValue, restrain, getRandomInt, getMs } from "./helpers.js";
import Vector from "./Vector.js";
import coefficients from "./coefficients.js";

/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas").getContext("2d");
const optionsDiv = document.getElementById("optionsDiv");
const rangeLabel = document.createElement("label");
const range = document.createElement("input");
const button = document.createElement("button");
const listLabel = document.createElement("label");
const dropDownList = document.createElement("select");
const width = window.screen.height / 1.8;
const height = window.screen.height / 1.8;

const point = new Vector(0, 0);
let coefficientsTable = coefficients[0];
let repsFrame = 250;

function setup() {
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "rgb(249, 38, 114,0.5)";
  rangeLabel.textContent = "Rep/f";
  listLabel.textContent = "Ferns";
  optionsDiv.appendChild(rangeLabel);
  optionsDiv.appendChild(range);
  optionsDiv.appendChild(button);
  for (const coefficient of coefficients) {
    const newItem = document.createElement("option");
    newItem.setAttribute("value", coefficient.index);
    newItem.textContent = coefficient.name;
    newItem.className="lol"
    dropDownList.appendChild(newItem);
  }
  dropDownList.addEventListener("change", (evt) => {
    coefficientsTable = coefficients[evt.target.value];
    clear();
  });
 // dropDownList.className="custom-select";
  optionsDiv.appendChild(listLabel);
  optionsDiv.appendChild(dropDownList);
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
    mapValue(
      point.x,
      coefficientsTable.range.xRange[0],
      coefficientsTable.range.xRange[1],
      0,
      width
    ),
    mapValue(
      point.y,
      coefficientsTable.range.yRange[1],
      coefficientsTable.range.yRange[0],
      0,
      height
    ),
    1,
    1
  );
}

function update() {
  point.assign(fractal(point, coefficientsTable));

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
