export const snapToGrid = ({ x, y }, { width, height }) => {
  const snapX = Math.floor(x / width) * width;
  const snapY = Math.floor(y / height) * height;

  return { x: snapX, y: snapY };
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

export default {
  snapToGrid,
  drawGrid,
  clearGrid,
  drawPixel,
};
