import React, { Component, Fragment } from 'react';
import getProp from 'lodash/get';
import { UiContainer } from '../../components/ui/ui-container';
import CanvasGrid from '../../components/canvas-grid';
import Layer from './layer';
import GridViewButton from './grid-view-button';

import './editor.css';

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
      selectedLayer,
      layout,
      updateLayer,
      mouse,
      pixel,
      tool,
      setElementPosition,
      setSelectedColor,
    } = this.props;
    const { r, g, b, a } = pixel.color.rgb;

    const activePixel = Object.assign({}, defaultPixel, {
      color: `rgba(${r}, ${g}, ${b}, ${a})`,
    });

    const Layers = Object.keys(layers).map(key => (
      <Layer
        className="layer-canvas"
        key={ `${key}-layer` }
        id={ key }
        width={ width }
        height={ height }
        layer={ layers[key] }
        selected={ selectedLayer === key }
        isBackground={ (key === 'backgroundLayer') }
        updateLayer={ updateLayer }
        setSelectedColor={ setSelectedColor }
        mouse={ mouse }
        pixel={ activePixel }
        tool={ tool }
      />
    ));

    return (
      <Fragment>
        <UiContainer
          id="editor-ui-container"
          title={ getProp(layers[selectedLayer], 'label') || 'Main Canvas' }
          layout={ layout }
          draggable
          relative
          mouse={ mouse }
          setElementPosition={ setElementPosition }
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
      </Fragment>
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
