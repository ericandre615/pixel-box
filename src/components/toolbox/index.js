import React, { Fragment } from 'react';
import { UiContainer } from '../ui/ui-container';
import ToolButton from './tool-button';

const id = 'toolbox-ui-container';

export const ToolBox = ({ setSelectedTool, setElementPosition, mouse, layout }) => {
  const EraserButton = ToolButton;
  const PencilButton = ToolButton;
  return (
    <Fragment>
      <UiContainer
        id={ id }
        layout={ layout }
        title="Toolbox"
        mouse={ mouse }
        draggable
        relative
        setElementPosition={ setElementPosition }
      >
        <EraserButton tool="eraser" setSelectedTool={ setSelectedTool } />
        <PencilButton tool="pencil" setSelectedTool={ setSelectedTool } />
      </UiContainer>
    </Fragment>
  );
};

export default ToolBox;
