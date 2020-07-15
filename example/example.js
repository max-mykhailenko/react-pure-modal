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
        <button onClick={ this.openModal }>Open simple modal</button>
        <PureModal
          header="1111111111111113333333333333333333333333333333333333333333333111111111111111111111111111111111111111"
          footer="1111111111111111111111111111112222222222222222222222222222222222222222222222111111111111111111111111"
          isOpen
          ref={(k) => this.modal = k}
        >
          <p>test</p>
          <p style={{ backgroundColor: 'red'}}>test2 asdmfkasdm flkasmd fasdkfm ; asdkfn;asldkf masd</p>
          <p>fasdfjasknd;f aslkdf ans'fk ams'df lasmdf adsasdf </p>
          <p>test</p>
          <p>test2 asdmfkasdm flkasmd fasdkfm ; asdkfn;asldkf masd</p>
          <p>fasdfjasknd;f aslkdf ans'fk ams'df lasmdf adsasdf </p>
          <p>test1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
          <p>test2 asdmfkasdm flkasmd fasdkfm ; asdkfn;asldkf masd</p>
          <p>fasdfjasknd;f aslkdf ans'fk ams'df lasmdf adsasdf </p>
          <p>fasdfjasknd;f aslkdf ans'fk ams'df lasmdf adsasdf </p>
          <p>test</p>
          <p>test2 asdmfkasdm flkasmd fasdkfm ; asdkfn;asldkf masd</p>
          <p>fasdfjasknd;f aslkdf ans'fk ams'df lasmdf adsasdf </p>
          <p>test</p>
          <p>test2 asdmfkasdm flkasmd fasdkfm ; asdkfn;asldkf masd</p>
          <p>fasdfjasknd;f aslkdf ans'fk ams'df lasmdf adsasdf </p>
        </PureModal>
      </div>
    );
  }
}

render(<ModalContainer />, document.getElementById('js--modals'));
