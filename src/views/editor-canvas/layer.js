import React, { Component } from 'react';
import { drawPixel } from '../../lib/drawing';

export class Layer extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    this.canvas = document.getElementById(`${id}-layer`);
    this.ctx = this.canvas.getContext('2d');
  }

  handleMouseDown(e) {
    e.preventDefault();
    const { mouse, pixel } = this.props;

    drawPixel(this.ctx, mouse, pixel);
  }

  handleMouseMove(e) {
    e.preventDefault();
    const { mouse, pixel } = this.props;

    if (mouse.down) {
      drawPixel(this.ctx, mouse, pixel);
    }
  }

  render() {
    const {
      id,
      width,
      height,
    } = this.props;

    return (
      <canvas
        id={ `${id}-layer` }
        className="canvas-layer"
        width={ width }
        height={ height }
        style={{ backgroundColor: 'aliceblue' }}
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
      />
    );
  }
}

export default Layer;
