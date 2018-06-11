import React, { Fragment } from 'react';
import { UiContainer } from '../ui/ui-container';
import Button from '../elements/button';
import Layer from './layer';

const layerStyles = {
  maxWidth: '200px',
};

const buttonStyles = {
  fontSize: '.75em',
};

const id = 'layers-ui-container';

export const LayersTool = ({
  layers,
  selectedLayer,
  createLayer,
  updateLayer,
  mouse,
  layout,
  setElementPosition,
  setSelectedLayer,
}) => {
  const Layers = Object.keys(layers)
    .filter(key => (key !== 'backgroundLayer'))
    .map(key => (
      <Layer
        key={ `${key}-layer` }
        id={ key }
        layer={ layers[key] }
        selected={ selectedLayer === key }
        updateLayer={ updateLayer }
        setSelectedLayer={ setSelectedLayer }
        width={ 60 }
        height={ 40 }
      />
    ));

  const newLayerLabel = `Layer ${(Layers.length + 1)}`;

  return (
    <Fragment>
      <UiContainer
        id={ id }
        title="Layers"
        styles={ layerStyles }
        layout={ layout }
        mouse={ mouse }
        draggable
        relative
        setElementPosition={ setElementPosition }
      >
        <div id="layer-toolbar">
          <Button
            id="new-layer-btn"
            type="menu"
            onClick={ () => createLayer({
              label: newLayerLabel,
              type: 'pixel',
            }) }
          >
            <span className="icon-plus" style={ buttonStyles } />
          </Button>
        </div>
        { Layers }
      </UiContainer>
    </Fragment>
  );
};

export default LayersTool;
