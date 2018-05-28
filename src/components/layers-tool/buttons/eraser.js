import React from 'react';
import ToolButton from './tool';

export const EraserButton = ({ setSelectedTool }) => (
  <ToolButton
    tool="eraser"
    setSelectedTool={ setSelectedTool }
  />
);

export default EraserButton;
