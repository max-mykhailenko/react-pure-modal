import React from 'react';
import { render } from 'react-dom';
import PureModal from '../dist/react-pure-modal.min.js';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.modal.open();
  }

  render() {
    return (
      <div>
        <button onClick={ this.openModal }>Open modal</button>
        <PureModal
          ref={(k) => this.modal = k}
        >
          test
          test2
        </PureModal>
      </div>
    );
  }
}

render(<ModalContainer />, document.getElementById('js--modals'));
