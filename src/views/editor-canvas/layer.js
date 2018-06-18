import React, { Component } from 'react';
import classnames from 'classnames';
import { drawPixel, getPixel, getCanvasData, drawCanvasData } from '../../lib/drawing';

export class Layer extends Component {
  constructor(props) {
    super(props);

    this.toolFunctions = {
      pencil: drawPixel,
      eraser: drawPixel,
      droplet: getPixel,
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.updateLayerData = this.updateLayerData.bind(this);
  }

  componentDidMount() {
    const { id, layer: { dataURL } } = this.props;

    this.canvas = document.getElementById(`${id}-layer`);
    this.ctx = this.canvas.getContext('2d');

    // const dataURL = getCanvasData(this.canvas);

    // updateLayer(Object.assign({}, layer, { dataURL }));

    if (dataURL) {
      drawCanvasData(this.canvas, dataURL);
    }
  }

  updateLayerData() {
    const { updateLayer, layer } = this.props;
    const dataURL = getCanvasData(this.canvas);

    updateLayer(Object.assign({}, layer, { dataURL }));
  }

  handleMouseDown(e) {
    e.preventDefault();
    const { mouse, pixel, tool, selected, layer: { locked }, setSelectedColor } = this.props;
    const activePixel = (tool === 'eraser') ? Object.assign({}, pixel, { color: tool }) : null;

    if (locked) {
      return false;
    }

    if (selected) {
      const { color } = this.toolFunctions[tool](this.ctx, mouse, activePixel || pixel);

      if (tool === 'droplet') {
        setSelectedColor(color);
      }

      this.updateLayerData();
    }

    return true;
  }

  handleMouseMove(e) {
    e.preventDefault();
    const { mouse, pixel, tool, selected, layer: { locked } } = this.props;
    const activePixel = (tool === 'eraser') ? Object.assign({}, pixel, { color: tool }) : null;

    if (locked) {
      return false;
    }

    if (mouse.down && selected) {
      drawPixel(this.ctx, mouse, activePixel || pixel);
      this.updateLayerData();
    }

    return true;
  }

  render() {
    const {
      id,
      width,
      height,
      selected,
      isBackground,
      tool,
    } = this.props;

    const layerClassNames = classnames(
      'layer-canvas',
      {
        'layer-canvas-selected': selected,
        [tool]: tool,
      });

    const layerStyles = Object.assign({},
      (isBackground) ? { backgroundColor: 'white' } : null,
      (!selected) ? { pointerEvents: 'none' } : null);

    return (
      <canvas
        id={ `${id}-layer` }
        className={ layerClassNames }
        width={ width }
        height={ height }
        style={ layerStyles }
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
      />
    );
  }
}

export default Layer;
