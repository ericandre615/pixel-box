import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { drawGrid } from '../../lib/drawing';

const defaultStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  backgroundColor: 'none',
  zIndex: '100',
  pointerEvents: 'none', // allow click through to below layers
};

export const CanvasGrid = (props) => {
  const { showGrid, width, height, id, style, cell } = props;
  useEffect(() => {
    const canvas = document.getElementById(`${id}-grid`);

    drawGrid(canvas, cell);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userStyle = style ? Object.assign({}, defaultStyles, style) : defaultStyles;
  const currentStyle = Object.assign({},
    userStyle,
    { display: (showGrid) ? 'initial' : 'none' });

  return (
    <canvas
      className="canvas-grid"
      id={ `${id}-grid` }
      width={ width }
      height={ height }
      style={ currentStyle }
    />
  );
};

CanvasGrid.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  cell: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number,
  }),
  showGrid: PropTypes.bool,
};

CanvasGrid.defaultProps = {
  id: 'default',
  width: 200,
  height: 200,
  cell: { width: 2, height: 2, scale: 1 },
  showGrid: true,
};


export default CanvasGrid;
