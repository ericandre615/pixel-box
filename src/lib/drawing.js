export const snapToGrid = ({ x, y }, { width, height }) => {
  const snapX = Math.floor(x / width) * width;
  const snapY = Math.floor(y / height) * height;

  return { x: snapX, y: snapY };
};

export const rgbToHex = (red, green, blue) => {
  const rgb = blue | (green << 8) | (red << 16); // eslint-disable-line no-bitwise

  return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
};

export const drawGrid = (
  canvas,
  cell = { width: 2, height: 2, scale: 1 },
  color = 'rgba(150, 150, 150, 0.75)') => {
  let x = 0;
  let y = 0;
  const pixelWidth = cell.width * cell.scale;
  const pixelHeight = cell.height * cell.scale;
  const ctx = canvas.getContext('2d');

  if (canvas.width % (cell.width * cell.scale) !== 0 || canvas.height % (cell.height * cell.scale) !== 0) {
    /* eslint-disable no-console */
    console.log('canvas width and height are not multiple of pixel width and height');
    console.log(`Canvas - width: ${canvas.width}, height: ${canvas.height}`);
    console.log(`Pixel - width: ${cell.width}, height: ${cell.height}, scale: ${cell.scale}`);
    console.log(`Suggest canvas size
      width: ${canvas.width + (canvas.width % (pixelWidth))}
      height ${canvas.height + (canvas.height % (pixelHeight))}
    `);
    /* eslint-enable no-console */

    return;
  }

  ctx.lineWidth = 1;
  ctx.translate(0.5, 0.5);
  ctx.beginPath();
  ctx.strokeStyle = color;

  while (x <= canvas.width) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    x += pixelWidth;
  }

  while (y <= canvas.height) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    y += pixelHeight;
  }

  ctx.stroke();
};

export const clearGrid = (canvas) => {
  const ctx = canvas.getContext('2d');

  ctx.lineWidth = 1;
  ctx.clearRect(-1, -1, canvas.width + 1, canvas.height + 1);

  return canvas;
};

export const getPixel = (ctx, mouse, pixel) => {
  const pixelWidth = pixel.width * pixel.scale;
  const pixelHeight = pixel.height * pixel.scale;
  const { x, y } = mouse;
  const { data } = ctx.getImageData(x, y, 1, 1);
  const [r, g, b, a] = data;

  return {
    x,
    y,
    pixelWidth,
    pixelHeight,
    color: { hex: rgbToHex(r, g, b), rgb: { r, g, b, a } } };
};

export const drawPixel = (ctx, mouse, pixel) => {
  const pixelWidth = pixel.width * pixel.scale;
  const pixelHeight = pixel.height * pixel.scale;
  const { x, y } = snapToGrid(mouse, { width: pixelWidth, height: pixelHeight });
  const drawRect = (pixel.color === 'eraser')
    ? 'clearRect'
    : 'fillRect';

  ctx.fillStyle = pixel.color;
  ctx[drawRect](x, y, pixelWidth, pixelHeight);

  return { x, y, pixelWidth, pixelHeight, color: pixel.color };
};

// bresenham line algorithm
export const drawLine = (ctx, mouse, pixel) => {
  const { sx, sy, x: mx, y: my } = mouse;
  const line = [];
  let steep = false;
  let a = { x: sx, y: sy };
  let b = { x: mx, y: my };
  let dx = b.x - a.x;
  let dy = b.y - a.y;

  if (!mx || !my || !sx || !sy) {
    return line;
  }

  if (Math.abs(dx) < Math.abs(dy)) {
    [dx, dy] = [dy, dx];
    [a.x, a.y] = [a.y, a.x];
    [b.x, b.y] = [b.y, b.x];

    steep = true;
  }

  if (dx < 0) {
    [a, b] = [b, a];

    dy *= -1;
    dx *= -1;
  }

  let error = -(dx);
  const errorStep = 2 * Math.abs(dy);
  const yStep = dy < 0 ? -1 : 1;

  let { y } = a;

  for (let x = a.x; x <= b.x; x += 1) { // eslint-disable-line prefer-destructuring
    if (error >= 0) {
      error -= 2 * dx;

      y += yStep;
    }

    error += errorStep;

    if (steep) {
      line.push({ x: y, y: x });
    } else {
      line.push({ x, y });
    }
  }

  if (line && line.length) {
    line.forEach(coords => drawPixel(ctx, {
      x: coords.x, y: coords.y,
    }, pixel));
  }

  return line;
};

export const drawRectangle = (ctx, mouse, pixel) => {
  const { sx, sy, x, y } = mouse;
  const topMouse = Object.assign({}, mouse, { sx, sy, x, y: sy });
  const rightMouse = Object.assign({}, mouse, { sx: x, sy, x, y });
  const bottomMouse = Object.assign({}, mouse, { sx: x, sy: y, x: sx, y });
  const leftMouse = Object.assign({}, mouse, { sx, sy: y, x: sx, y: sy });
  const top = drawLine(ctx, topMouse, pixel);
  const right = drawLine(ctx, rightMouse, pixel);
  const bottom = drawLine(ctx, bottomMouse, pixel);
  const left = drawLine(ctx, leftMouse, pixel);

  return { top, right, bottom, left };
};

export const getCanvasData = (canvas = document.createElement('canvas')) => canvas.toDataURL();

export const drawCanvasData = (canvas = document.createElement('canvas'), dataURL) => {
  const img = new Image();
  const ctx = canvas.getContext('2d');
  img.src = dataURL;

  const drawListener = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.removeEventListener('load', drawListener);
  };

  img.addEventListener('load', drawListener);

  return { canvas, dataURL };
};

export default {
  snapToGrid,
  rgbToHex,
  drawGrid,
  clearGrid,
  getPixel,
  drawPixel,
  drawLine,
  drawRectangle,
  getCanvasData,
  drawCanvasData,
};
