import React from 'react';
import classnames from 'classnames';
import Preview from './preview';
import FormInput from '../form/input';

import './layer-name-input.css';

const handleChange = (change, layer) => (name, value) => {
  const updatedLayer = Object.assign({}, layer, {
    label: value,
  });

  return change(updatedLayer);
};

const Layer = ({
  layer,
  selected,
  width,
  height,
  updateLayer,
  setSelectedLayer
}) => {
  const { id, label, priority } = layer;
  const layerClassNames = classnames(
    'flex-container',
    'layer-preview',
    {
      'layer-selected': !!selected,
    });

  return (
    <section
      id={ `layer-${id}-preview` }
      className={ layerClassNames }
      onClick={ () => setSelectedLayer(id) }
    >
      <Preview layer={ layer } width={ width } height={ height } className="flex-item" />
      <FormInput
        name={ `${id}-form` }
        value={ label || `Layer ${priority}` }
        className="layer-name-input flex-item"
        onChange={ handleChange(updateLayer, layer) }
      />
    </section>
  );
};

export default Layer;
