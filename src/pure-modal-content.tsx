import React from 'react';

type Props = {
    replace: boolean,
    children: JSX.Element,
    onDragStart: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void,
    onDragEnd: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void,
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void,
    bodyClass: string,
    header: JSX.Element | string,
    footer: JSX.Element | string,
    closeButton: (JSX.Element & string),
    bottomCloseButton: boolean
} & typeof defaultProps;

const defaultProps = {
    closeButton: '×',
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
        bottomCloseButton
    } = props;

    const bottomButtonStyles = {
        left: '50%',
        bottom: '-50px',
        top: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    };

    return (
      replace ? (
        children
    ) : (
      <div className={`panel panel-default ${bottomCloseButton && 'scrollable-height'}`} style={bottomCloseButton && {position: 'relative'}}>
        <div
          className="panel-heading"
          style={bottomCloseButton && { position: 'static' }}
          onTouchStart={onDragStart}
          onMouseDown={onDragStart}
          onTouchEnd={onDragEnd}
          onMouseUp={onDragEnd}
        >
          {
            header &&
            (
              <h3 className="panel-title">
                {header}
              </h3>
            )
        }
          <div onClick={onClose} className="close" style={bottomCloseButton && bottomButtonStyles}>{closeButton}</div>
        </div>

        <div className={bodyClass}>
          {children}
        </div>
        {
          footer &&
          (
            <div className="panel-footer">
              {footer}
            </div>
          )
        }
    </div>
    )
  );
}

PureModalContent.defaultProps = defaultProps;

export default PureModalContent;
