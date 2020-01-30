import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import './ui-menu.css';

const paddingDefaults = {
  top: 0,
  right: 8,
  bottom: 12,
  left: 8,
};

const defaultStyle = {
  position: 'relative',
  minWidth: '128px',
  backgroundColor: '#818184',
  padding: '0px',
  top: '0px',
  left: '0px',
};

const flattenChildren = nodes => nodes.reduce((acc, curr) => acc.concat(
  (curr.childNodes.length)
    ? flattenChildren(Array.from(curr.childNodes))
    : curr), []);

const filterDOMElements = nodes => nodes.filter(node => node instanceof HTMLElement);
const getLargestValue = (nodes, prop = 'width') => nodes
  .map(child => child[prop])
  .reduce((acc, curr) => ((curr > acc) ? curr : acc), '');
const getHeaderHeight = nodes => nodes
  .filter(child => (child.nodeName === 'H1'))
  .map(child => (window.getComputedStyle(child, null).height))
  .reduce((acc, curr) => parseInt(curr.replace(/\D/g, ''), 10), 0);

export const UiContainer = (props) => {
  const parentContainer = useRef(props.width);
  const [width, setWidth] = useState(props.width || defaultStyle.width);
  const [mouseDown, setMousePressed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(24);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);

  const getWidth = (node) => {
    if (!node) {
      return;
    }

    const childNodes = Array.from(node.childNodes);
    const flatNodes = filterDOMElements(flattenChildren(childNodes));
    const maxWidth = getLargestValue(flatNodes, 'offsetWidth');
    const nodeHeaderHeight = getHeaderHeight(childNodes);

    setWidth(`${maxWidth + paddingDefaults.right + paddingDefaults.left}px`);
    setHeaderHeight(nodeHeaderHeight + paddingDefaults.top);
  };

  useEffect(() => {
    getWidth(parentContainer.current);
  }, []);

  const handleMouseMove = (e) => {
    const { id, draggable, setElementPosition } = props;
    const { x: shiftX, y: shiftY } = shift;
    const { target: { parentElement } } = e;

    if (!parentElement.id || parentElement.id !== id) {
      setMousePressed(false);
      setIsDragging(false);
      return undefined;
    }

    if (mouseDown && draggable) {
      const calcLeft = `${e.pageX - shiftX}px`;
      const calcTop = `${e.pageY - shiftY}px`;

      setElementPosition(id, { top: calcTop, left: calcLeft });
    }

    return parentElement;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();

    const { target: { parentElement } } = e;
    const { id, draggable, setElementPosition } = props;

    setMousePressed(true);

    if (draggable) {
      const { top, left } = parentElement.getBoundingClientRect();
      const shiftX = (e.clientX - left);
      const shiftY = (e.clientY - top);

      setIsDragging(true);
      setDragStarted(true);
      setShift({ x: shiftX, y: shiftY });

      const calcLeft = `${e.pageX - shiftX}px`;
      const calcTop = `${e.pageY - shiftY}px`;

      setElementPosition(id, { left: calcLeft, top: calcTop });
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();

    setMousePressed(false);
    setIsDragging(false);
  };

  const {
    id,
    draggable,
    contextMenu,
    title,
    uiButton,
    children,
    height,
    relative,
    styles,
    layout,
  } = props;
  const totalHeight = height + headerHeight;
  const { top, left } = (layout) ? layout[id] || {} : { top: '0px', left: '0px' };
  const containerClassNames = classnames('ui-container', { dragging: isDragging });
  const menuBarClassNames = classnames('ui-menu-bar', { draggable });

  const currentStyle = Object.assign({},
    defaultStyle,
    styles,
    (relative) ? { position: 'relative' } : null,
    { top, left },
    (dragStarted || (layout && layout[id])) ? { position: 'absolute' } : { position: 'relative' },
    { width },
    (height)
      ? { height: `${totalHeight}px` }
      : null);

  return (
    <section
      id={ id }
      className={ containerClassNames }
      data-draggable={ draggable }
      style={ currentStyle }
      ref={ parentContainer }
    >
      { contextMenu }
      <section
        className={ menuBarClassNames }
        onMouseMove={ handleMouseMove }
        onMouseUp={ handleMouseUp }
        onMouseDown={ handleMouseDown }
      >
        <span>
          { title }
        </span>
        { uiButton }
      </section>
      <section className="ui-container-body">
        { children }
      </section>
    </section>
  );
};

export default UiContainer;

