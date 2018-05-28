import React, { Component } from 'react';
import { drawPixel, getCanvasData } from '../../lib/drawing';

export class Layer extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.updateLayerData = this.updateLayerData.bind(this);
  }

  componentDidMount() {
    const { id, updateLayer, layer } = this.props;

    this.canvas = document.getElementById(`${id}-layer`);
    this.ctx = this.canvas.getContext('2d');

    const dataURL = getCanvasData(this.canvas);

    updateLayer(Object.assign({}, layer, { dataURL }));
  }

  updateLayerData() {
    const { updateLayer, layer } = this.props;
    const dataURL = getCanvasData(this.canvas);

    updateLayer(Object.assign({}, layer, { dataURL }));
  }

  handleMouseDown(e) {
    e.preventDefault();
    const { mouse, pixel, tool } = this.props;
    const activePixel = (tool === 'eraser') ? Object.assign({}, pixel, { color: tool }) : null;

    drawPixel(this.ctx, mouse, activePixel || pixel);
    this.updateLayerData();
  }

  handleMouseMove(e) {
    e.preventDefault();
    const { mouse, pixel, tool } = this.props;
    const activePixel = (tool === 'eraser') ? Object.assign({}, pixel, { color: tool }) : null;

    if (mouse.down) {
      drawPixel(this.ctx, mouse, activePixel || pixel);
      this.updateLayerData();
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
        className="layer-canvas"
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
