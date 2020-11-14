import React from 'react';

type Props = {
  replace: boolean;
  children: JSX.Element;
  onDragStart: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
  bodyClass: string;
  header: JSX.Element | string;
  footer: JSX.Element | string;
  closeButton: JSX.Element & string;
  closeButtonPosition: string;
} & typeof defaultProps;

const defaultProps = {
  closeButton: '×',
  closeButtonPosition: 'header',
  replace: false,
  draggable: false,
};

function PureModalContent(props: Props): JSX.Element {
  const {
    children,
    replace,
    bodyClass,
    header,
    footer,
    onDragStart,
    onDragEnd,
    onClose,
    closeButton,
    closeButtonPosition,
  } = props;

  return replace ? (
    children
  ) : (
    <div
      className={`panel panel-default ${closeButtonPosition === 'bottom' ? 'additional-row' : ''}`}
    >
      <div
        className="panel-heading"
        onTouchStart={onDragStart}
        onMouseDown={onDragStart}
        onTouchEnd={onDragEnd}
        onMouseUp={onDragEnd}
      >
        {header && <h3 className="panel-title">{header}</h3>}
      </div>

      <div className={bodyClass}>{children}</div>
      {footer && <div className="panel-footer">{footer}</div>}
      <div
        className="close"
        onClick={onClose}
        style={{
          position: closeButtonPosition === 'header' ? 'absolute' : 'static',
          margin: closeButtonPosition === 'bottom' ? '10px auto' : '',
        }}
      >
        {closeButton}
      </div>
    </div>
  );
}

PureModalContent.defaultProps = defaultProps;

export default PureModalContent;
