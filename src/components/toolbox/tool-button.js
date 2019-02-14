import React from 'react';
import classnames from 'classnames';
import Button from '../elements/button';

const toolStyles = {
  selected: {
    backgroundColor: '#a8a8ab',
  },
};

export const ToolButton = (props) => {
  const { setSelectedTool, tool, selectedTool } = props;
  const selected = tool && tool === selectedTool;
  const buttonClassnames = classnames(
    `icon-${tool}`,
    'tool-button',
    { selected });
  const setTool = () => {
    setSelectedTool(tool);
  };

  return (
    <Button
      className={ buttonClassnames }
      type="flat"
      style={ selected && toolStyles.selected }
      onClick={ setTool }
    />
  );
};

export default ToolButton;
