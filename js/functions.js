function mapValue(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return this.constrain(newval, start2, stop2);
  } else {
    return this.constrain(newval, stop2, start2);
  }
}

function restrain(val, min, max) {
  if (val > max) return max;
  if (val < min) return min;
  return val;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function rgbToHex(r, g, b) {
  return "#" + colorComponent(r) + colorComponent(g) + colorComponent(b);
  function colorComponent(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}

function getMs(fps) {
  return 1000 / fps;
}
