import React from 'react';

type Props = {
    replace: boolean,
    children: Node,
    onDragStart: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void,
    onDragEnd: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void,
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void,
    bodyClass: string,
    header: Node | string,
    footer: Node | string
} & typeof defaultProps;

const defaultProps = {
    replace: false,
    draggable: false,
};

const PureModalContent = (props: Props) => {
  const {
        children,
        replace,
        bodyClass,
        header,
        footer,
        onDragStart,
        onDragEnd,
        onClose,
    } = props;

  return (
      replace ? (
        children
    ) : (
      <div className="panel panel-default">
        <div
          className="panel-heading"
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
          <div onClick={onClose} className="close">&times;</div>
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
