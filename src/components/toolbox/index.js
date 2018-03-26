import React, { Fragment } from 'react';
import { UiContainer } from '../ui/ui-container';
import ToolButton from './tool-button';

export const ToolBox = ({ setSelectedTool }) => {
  const EraserButton = ToolButton;
  const PencilButton = ToolButton;
  return (
    <Fragment>
      <UiContainer
        id="toolbox-ui-container"
        title="Toolbox"
        relative
      >
        <EraserButton tool="eraser" setSelectedTool={ setSelectedTool } />
        <PencilButton tool="pencil" setSelectedTool={ setSelectedTool } />
      </UiContainer>
    </Fragment>
  );
};

export default ToolBox;
