import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { getMouse } from '../../state/mouse/selectors';
import { getLayers } from '../../state/layer/selectors';
import { getSelected } from '../../state/selected/selectors';
import { setMousePosition, toggleMouseDown } from '../../state/mouse/actions';
import { createLayer, removeLayer, updateLayer } from '../../state/layer/actions';
import { setSelected } from '../../state/selected/actions';
import EditorCanvas from '../editor-canvas';

export class Main extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleMouseMove(e) {
    const { dispatchSetMousePosition } = this.props;
    const {
      offsetX: x,
      offsetY: y,
    } = e.nativeEvent;

    dispatchSetMousePosition({ x, y });
  }

  handleMouseDown() {
    const { dispatchToggleMouseDown } = this.props;

    dispatchToggleMouseDown(true);
  }

  handleMouseUp() {
    const { dispatchToggleMouseDown } = this.props;

    dispatchToggleMouseDown(false);
  }

  render() {
    const {
      mouse,
      layers,
      selectedColor,
      dispatchCreateLayer,
      dispatchRemoveLayer,
      dispatchUpdateLayer,
      dispatchSetSelectedColor,
    } = this.props;

    return (
      <section
        role="main"
        onMouseDown={ this.handleMouseDown }
        onMouseUp={ this.handleMouseUp }
        onMouseMove={ this.handleMouseMove }
        style={{ backgroundColor: 'aliceblue' }}
      >
        <EditorCanvas
          mouse={ mouse }
          layers={ layers }
          pixel={{ color: selectedColor }}
          createLayer={ dispatchCreateLayer }
          removeLayer={ dispatchRemoveLayer }
          updateLayer={ dispatchUpdateLayer }
        />
        <SketchPicker
          color={ selectedColor }
          onChangeComplete={ dispatchSetSelectedColor }
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  mouse: getMouse(state),
  layers: getLayers(state),
  selectedColor: getSelected('color')(state),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetMousePosition: mouse => dispatch(setMousePosition(mouse)),
  dispatchToggleMouseDown: toggle => dispatch(toggleMouseDown(toggle)),
  dispatchCreateLayer: layer => dispatch(createLayer(layer)),
  dispatchRemoveLayer: id => dispatch(removeLayer(id)),
  dispatchUpdateLayer: layer => dispatch(updateLayer(layer)),
  dispatchSetSelectedColor: value => dispatch(setSelected('color', value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
