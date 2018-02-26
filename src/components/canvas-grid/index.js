import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drawGrid } from '../../lib/drawing';

const defaultStyles = {
  // position: 'absolute',
  top: '0',
  left: '0',
  backgroundColor: 'white',
  zIndex: '100',
};

export class CanvasGrid extends Component {
  componentDidMount() {
    // temp test
    const { id, cell, showGrid } = this.props;

    if (showGrid !== false) {
      const canvas = document.getElementById(`${id}-grid`);

      drawGrid(canvas, cell);
    }
  }

  render() {
    const { showGrid, width, height, id } = this.props;

    if (showGrid === false) {
      return null;
    }

    return (
      <canvas
        className="canvas-grid"
        id={ `${id}-grid` }
        width={ width }
        height={ height }
        style={ defaultStyles }
      />
    );
  }
}

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
