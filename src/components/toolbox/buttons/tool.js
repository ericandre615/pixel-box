import React from 'react';
import { Button } from '../../elements/button';

export const ToolButton = (props) => {
  const setTool = () => {
    const { setSelectedTool, tool } = props;

    setSelectedTool(tool);
  };

  const { tool } = props;

  return (
    <Button
      classNames={ `icon-${tool}` }
      onClick={ setTool }
    />
  );
};

export default ToolButton;
