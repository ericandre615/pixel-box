import React, { Fragment } from 'react';
import { UiContainer } from '../ui/ui-container';
import Layer from './layer';

const layerStyles = {
  maxWidth: '200px',
};

const id = 'layers-ui-container';

export const LayersTool = ({ layers, updateLayer, mouse, layout, setElementPosition }) => {
  const Layers = Object.keys(layers).map(key => (
    <Layer
      key={ `${key}-layer` }
      id={ key }
      layer={ layers[key] }
      updateLayer={ updateLayer }
      width={ 60 }
      height={ 40 }
    />
  ));

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
        { Layers }
      </UiContainer>
    </Fragment>
  );
};

export default LayersTool;
