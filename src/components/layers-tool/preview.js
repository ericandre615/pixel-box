import React, { Component } from 'react';
import { drawCanvasData } from '../../lib/drawing';

export class Preview extends Component {
  componentDidMount() {
    const { layer: { id, dataURL } } = this.props;

    this.canvas = document.getElementById(`${id}-layer-preview`);
    this.ctx = this.canvas.getContext('2d');

    if (dataURL) {
      drawCanvasData(this.canvas, dataURL);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { layer: { dataURL } } = this.props;
    const { layer: { dataURL: nextDataURL } } = nextProps;

    if (dataURL && dataURL !== nextDataURL) {
      drawCanvasData(this.canvas, nextDataURL);
    }
  }

  render() {
    const {
      layer: { id },
      width,
      height,
    } = this.props;

    return (
      <canvas
        id={ `${id}-layer-preview` }
        className="canvas-layer"
        width={ width }
        height={ height }
        style={{ backgroundColor: 'white' }}
      />
    );
  }
}

export default Preview;
