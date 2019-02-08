import React, { useEffect } from 'react';
import { drawCanvasData } from '../../lib/drawing';

export const Preview = (props) => {
  const { layer: { id, dataURL }, width, height } = props;

  useEffect(() => {
    const canvas = document.getElementById(`${id}-layer-preview`);

    if (dataURL) {
      drawCanvasData(canvas, dataURL);
    }
  });

  return (
    <canvas
      id={ `${id}-layer-preview` }
      className="canvas-layer"
      width={ width }
      height={ height }
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default Preview;
