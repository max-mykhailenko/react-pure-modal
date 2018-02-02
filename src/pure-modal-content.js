import React from 'react';
import PropTypes from 'prop-types';

class PureModalContent extends React.PureComponent {
  render() {
    const {
      children,
      replace,
      bodyClass,
      header,
      footer,
      onDragStart,
      onDragEnd,
      onClose,
    } = this.props;

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
}

PureModalContent.defaultProps = {
  replace: false,
  draggable: false,
};

PureModalContent.propTypes = {
  replace: PropTypes.bool,
  children: PropTypes.node,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onClose: PropTypes.func,
  bodyClass: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default PureModalContent;
