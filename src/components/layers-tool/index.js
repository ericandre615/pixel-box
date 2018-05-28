import React, { Fragment } from 'react';
import { UiContainer } from '../ui/ui-container';
import Layer from './layer';

const layerStyles = {
  maxWidth: '200px',
};

export const LayersTool = ({ layers, updateLayer }) => {
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
        id="layers-ui-container"
        title="Layers"
        styles={ layerStyles }
        relative
      >
        { Layers }
      </UiContainer>
    </Fragment>
  );
};

export default LayersTool;
