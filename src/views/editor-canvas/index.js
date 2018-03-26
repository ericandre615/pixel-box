import React, { Component } from 'react';
import { UiContainer } from '../../components/ui/ui-container';
import CanvasGrid from '../../components/canvas-grid';
import Layer from './layer';
import GridViewButton from './grid-view-button';

const editorId = 'editor-canvas';
const defaultPixel = {
  width: 4,
  height: 4,
  scale: 1,
  color: {
    hex: '#000000',
    rgb: { r: 0, g: 0, b: 0, a: 1 },
  },
};

export class EditorCanvas extends Component {
  componentWillMount() {
    const { toggleGrid } = this.props;

    toggleGrid(editorId);
  }

  componentDidMount() {
    const { layers } = this.props;
    this.layers = layers;
  }

  render() {
    const {
      showGrid,
      toggleGrid,
      width,
      height,
      layers,
      updateLayer,
      mouse,
      pixel,
      tool,
    } = this.props;
    const { r, g, b, a } = pixel.color.rgb;

    const activePixel = Object.assign({}, defaultPixel, {
      color: `rgba(${r}, ${g}, ${b}, ${a})`,
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
        tool={ tool }
      />
    ));

    return (
      <section id={ editorId }>
        <UiContainer
          id="editor-ui-container"
          title="Main Canvas"
          relative
          uiButton={
            <GridViewButton
              showGrid={ showGrid }
              toggleGrid={ () => toggleGrid(editorId) }
            />
          }
        >
          { Layers }
          <CanvasGrid
            id={ editorId }
            showGrid={ showGrid }
            width={ width }
            height={ height }
            cell={ activePixel }
            style={{ /* temporary positioning */
              position: 'absolute',
              top: '29px',
              left: '8px',
            }}
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
