import React from 'react';
import Preview from './preview';
import FormInput from '../form/input';

import './layer-name-input.css';

const handleChange = (change, layer) => (name, value) => {
  const updatedLayer = Object.assign({}, layer, {
    label: value,
  });

  return change(updatedLayer);
};

const Layer = ({ layer, width, height, updateLayer }) => (
  <section id={ `layer-${layer.id}-preview` } className="flex-container layer-preview">
    <Preview layer={ layer } width={ width } height={ height } className="flex-item" />
    <FormInput
      name={ `${layer.id}-form` }
      value={ (layer.label) ? layer.label : `Layer ${layer.priority}` }
      className="layer-name-input flex-item"
      onChange={ handleChange(updateLayer, layer) }
    />
  </section>
);

export default Layer;
