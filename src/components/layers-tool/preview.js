import React, { useRef, useEffect } from 'react';
import { drawCanvasData } from '../../lib/drawing';

export const Preview = (props) => {
  const { layer: { id, dataURL }, width, height } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    if (dataURL) {
      drawCanvasData(canvasRef.current, dataURL);
    }
  }, [dataURL]);

  return (
    <canvas
      ref={ canvasRef }
      id={ `${id}-layer-preview` }
      className="canvas-layer"
      width={ width }
      height={ height }
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default Preview;
