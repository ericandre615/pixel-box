import React, { Component } from 'react';
import { UiContainer } from '../../components/ui/ui-container';
import CanvasGrid from '../../components/canvas-grid';
import Layer from './layer';

const editorId = 'editor-canvas';
const defaultPixel = {
  width: 4,
  height: 4,
  scale: 1,
  color: 'black',
};

export class EditorCanvas extends Component {
  componentDidMount() {
    const { layers } = this.props;
    this.layers = layers;
  }

  render() {
    const {
      showGrid,
      width,
      height,
      layers,
      updateLayer,
      mouse,
      pixel,
    } = this.props;

    const activePixel = Object.assign({}, defaultPixel, {
      color: pixel.color.hex,
    });

    const Layers = Object.keys(layers).map(key => (
      <Layer
        key={ `${key}-layer` }
        id={ key }
        width={ width }
        height={ height }
        updateLayer={ updateLayer }
        mouse={ mouse }
        pixel={ activePixel }
      />
    ));

    return (
      <section id={ editorId }>
        <UiContainer
          id="editor-ui-container"
          title="Main Canvas"
        >
          { Layers }
          <CanvasGrid
            id={ editorId }
            showGrid={ showGrid }
            width={ width }
            height={ height }
            cell={ activePixel }
          />
        </UiContainer>
      </section>
    );
  }
}

EditorCanvas.defaultProps = {
  showGrid: true,
  width: 600,
  height: 424,
  pixel: defaultPixel,
};

export default EditorCanvas;
