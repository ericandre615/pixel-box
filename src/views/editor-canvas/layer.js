import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import tools from './tools';
import {
  drawPixel,
  getPixel,
  drawLine,
  drawRectangle,
  getCanvasData,
  drawCanvasData,
} from '../../lib/drawing';

const toolFunctions = {
  [tools.pencil]: drawPixel,
  [tools.eraser]: drawPixel,
  [tools.eyedropper]: getPixel,
  [tools.line]: drawLine,
  [tools.rectangle]: drawRectangle,
};

const checkMouseStart = mouseStart => (
  mouseStart.x &&
  mouseStart.x >= 0 &&
  mouseStart.y &&
  mouseStart.y >= 0
);

export class Layer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseStart: { x: null, y: null },
      showPreview: false,
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.updateLayerData = this.updateLayerData.bind(this);
    this.setMouseStart = this.setMouseStart.bind(this);
    this.getPreviewCanvas = this.getPreviewCanvas.bind(this);
  }

  componentDidMount() {
    const { id, layer: { dataURL } } = this.props;

    this.canvas = document.getElementById(`${id}-layer`);
    this.ctx = this.canvas.getContext('2d');

    if (dataURL) {
      drawCanvasData(this.canvas, dataURL);
    }
  }

  getPreviewCanvas() {
    const { id } = this.props;

    this.previewCanvas = document.getElementById(`${id}-layer-preview`);
    this.previewCtx = this.previewCanvas.getContext('2d');

    return {
      canvas: this.previewCanvas,
      ctx: this.previewCtx,
    };
  }

  setMouseStart() {
    const { mouse } = this.props;
    const { mouseStart } = this.state;

    if (!checkMouseStart(mouseStart)) {
      this.setState({ mouseStart: { x: mouse.x, y: mouse.y } });
    }

    if (checkMouseStart(mouseStart)) {
      this.setState({ mouseStart: { x: null, y: null } });
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
    const { mouseStart, showPreview } = this.state;
    const activePixel = (tool === 'eraser') ? Object.assign({}, pixel, { color: tool }) : pixel;

    if (locked) {
      return false;
    }

    if (selected) {
      const draw = toolFunctions[tool];
      const { color } = toolFunctions[tools.eyedropper](this.ctx, mouse, activePixel);

      switch (tool) {
        case tools.pencil:
          return draw(this.ctx, mouse, activePixel);
        case tools.eraser:
          return draw(this.ctx, mouse, activePixel);
        case tools.eyedropper:
          return setSelectedColor(color);
        case tools.rectangle:
          this.setMouseStart();

          if (!showPreview) {
            return this.setState({ showPreview: true });
          }

          if (showPreview) {
            const rectMouse = Object.assign({}, mouse, {
              sx: mouseStart.x,
              sy: mouseStart.y,
            });

            draw(this.ctx, rectMouse, activePixel);

            return this.setState({ showPreview: false });
          }

          break;
        case tools.line:
          this.setMouseStart();

          if (!showPreview) {
            return this.setState({ showPreview: true });
          }

          if (showPreview) {
            const rectMouse = Object.assign({}, mouse, {
              sx: mouseStart.x,
              sy: mouseStart.y,
            });

            draw(this.ctx, rectMouse, activePixel);

            return this.setState({ showPreview: false });
          }

          break;
        default:
          break;
      }

      this.updateLayerData();
    }

    return true;
  }

  handleMouseMove(e) {
    e.preventDefault();
    const { mouse, pixel, tool, selected, layer: { locked } } = this.props;
    const { mouseStart } = this.state;
    const activePixel = (tool === 'eraser') ? Object.assign({}, pixel, { color: tool }) : pixel;
    const draw = toolFunctions[tool];

    if (locked) {
      return false;
    }

    if (selected) {
      switch (tool) {
        case tools.pencil:
          if (mouse.down) draw(this.ctx, mouse, activePixel);
          break;
        case tools.eraser:
          if (mouse.down) draw(this.ctx, mouse, activePixel);
          break;
        case tools.rectangle:
          if (checkMouseStart(mouseStart)) {
            const rectMouse = Object.assign({}, mouse, {
              sx: mouseStart.x,
              sy: mouseStart.y,
            });
            const { ctx, canvas } = this.getPreviewCanvas();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw(ctx, rectMouse, activePixel);
          }
          break;
        case tools.line:
          if (checkMouseStart(mouseStart)) {
            const rectMouse = Object.assign({}, mouse, {
              sx: mouseStart.x,
              sy: mouseStart.y,
            });
            const { ctx, canvas } = this.getPreviewCanvas();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw(ctx, rectMouse, activePixel);
          }
          break;
        default:
          break;
      }

      console.log('UPDATEMOUSEMOVE ', tool);

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
    const { showPreview } = this.state;

    const layerClassNames = classnames(
      'layer-canvas',
      {
        'layer-canvas-selected': selected,
        [tool]: tool,
        preview: showPreview,
      });

    const layerStyles = Object.assign({},
      (isBackground) ? { backgroundColor: 'white' } : null,
      (!selected) ? { pointerEvents: 'none' } : null);
    const previewStyles = Object.assign({}, layerStyles, {
      zIndex: '60',
    });

    return (
      <Fragment>
        {
          showPreview &&
          <canvas
            id={ `${id}-layer-preview` }
            className={ layerClassNames }
            width={ width }
            height={ height }
            style={ previewStyles }
            onMouseDown={ this.handleMouseDown }
            onMouseMove={ this.handleMouseMove }
          />
        }
        <canvas
          id={ `${id}-layer` }
          className={ layerClassNames }
          width={ width }
          height={ height }
          style={ layerStyles }
          onMouseDown={ this.handleMouseDown }
          onMouseMove={ this.handleMouseMove }
        />
      </Fragment>
    );
  }
}

export default Layer;
