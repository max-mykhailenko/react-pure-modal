import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import PureModalContent from './pure-modal-content';
import './react-pure-modal.css';

import type { MouseOrTouch } from './types';

type Props = {
  children: JSX.Element;
  replace?: boolean;
  className?: string;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
  scrollable?: boolean;
  draggable?: boolean;
  width?: string;
  isOpen?: boolean;
  onClose?: Function;
  closeButton?: JSX.Element | string;
  closeButtonPosition?: string;
  portal?: boolean;
};

function PureModal(props: Props) {
  let hash = Math.random().toString();
  const [isDragged, setIsDragged] = useState(false);
  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [mouseOffsetX, setMouseOffsetX] = useState(0);
  const [mouseOffsetY, setMouseOffsetY] = useState(0);

  const { isOpen, onClose } = props;

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      close();
    }

    return () => {
      isOpen && close();
    };
  }, [isOpen]);

  const handleEsc = useCallback(event => {
    const allModals = document.querySelectorAll('.pure-modal');

    if (allModals.length && allModals[allModals.length - 1].classList.contains(hash)) return false;

    if (event.keyCode === 27 && document.activeElement) {
      close(event);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  function setModalContext() {
    document.addEventListener('keydown', handleEsc);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.body.classList.add('body-modal-fix');
  }

  function unsetModalContext() {
    document.removeEventListener('keydown', handleEsc);
    document.body.classList.remove('body-modal-fix');
    setX(null);
    setY(null);
    setDeltaX(0);
    setDeltaY(0);
    setMouseOffsetX(0);
    setMouseOffsetY(0);
  }

  function open(event?: MouseOrTouch) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    setModalContext();
  }

  function close(event?: MouseOrTouch) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (onClose) {
      onClose();
    }

    unsetModalContext();
  }

  function getCoords(e: MouseOrTouch) {
    if (e instanceof TouchEvent && e.changedTouches.length > 0) {
      return {
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY,
      };
    }
    if (e instanceof MouseEvent) {
      return {
        pageX: e.pageX,
        pageY: e.pageY,
      };
    }
    return {
      pageX: 0,
      pageY: 0,
    };
  }

  function handleStartDrag(e: MouseOrTouch) {
    if (e instanceof TouchEvent && e.changedTouches && e.changedTouches.length > 1) return;

    e.preventDefault();

    const { pageX, pageY } = getCoords(e);
    const { top, left } = e.currentTarget.getBoundingClientRect();

    setIsDragged(true);
    setX(typeof x === 'number' ? x : left);
    setY(typeof y === 'number' ? y : top);
    setMouseOffsetX(pageX - left);
    setMouseOffsetY(pageY - top);
  }

  function handleDrag(e: MouseOrTouch) {
    if (e instanceof TouchEvent && e.changedTouches && e.changedTouches.length > 1) {
      return handleEndDrag();
    }

    e.preventDefault();

    const { pageX, pageY } = getCoords(e);

    if (typeof x === 'number' && typeof y === 'number') {
      setDeltaX(pageX - x - mouseOffsetX);
      setDeltaY(pageY - y - mouseOffsetY);
    }
  }

  function handleEndDrag() {
    return setIsDragged(false);
  }

  function handleBackdropClick(event: MouseOrTouch) {
    if (event) {
      if (!(event.target as Element).classList.contains('pure-modal-backdrop')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }
    close(event);
  }

  const {
    children,
    replace = false,
    className,
    header,
    footer,
    scrollable = true,
    draggable = false,
    width,
    closeButton,
    closeButtonPosition,
    portal = false,
  } = props;

  let backdropclasses = ['pure-modal-backdrop'];
  let modalclasses = ['pure-modal', hash];
  let bodyClasses = ['panel-body'];

  if (className) {
    modalclasses = modalclasses.concat(className);
  }

  if (scrollable) {
    bodyClasses = bodyClasses.concat('scrollable');
  } else {
    backdropclasses = backdropclasses.concat('scrollable');
    modalclasses = modalclasses.concat('auto-height');
  }

  if (draggable) {
    backdropclasses = backdropclasses.concat('backdrop-overflow-hidden');
  }

  const modalContent = (
    <div
      className={backdropclasses.join(' ')}
      onMouseDown={handleBackdropClick}
      onTouchMove={isDragged ? handleDrag : undefined}
      onMouseMove={isDragged ? handleDrag : undefined}
    >
      <div
        className={modalclasses.join(' ')}
        style={{
          transform: `translate(${deltaX}px, ${deltaY}px)`,
          transition: 'none',
          width,
        }}
      >
        <PureModalContent
          replace={replace}
          header={header}
          footer={footer}
          onDragStart={draggable ? handleStartDrag : undefined}
          onDragEnd={draggable ? handleEndDrag : undefined}
          onClose={close}
          bodyClass={bodyClasses.join(' ')}
          closeButton={closeButton}
          closeButtonPosition={closeButtonPosition}
        >
          {children}
        </PureModalContent>
      </div>
    </div>
  );

  if (portal) {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}

export default PureModal;
