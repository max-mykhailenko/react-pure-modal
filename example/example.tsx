import React, { useState } from 'react';
import { render } from 'react-dom';
import PureModal from '../dist/react-pure-modal.min.js';
import { smallContent, largeContent } from './content';
import '../dist/react-pure-modal.min.css';

function ModalContainer() {
  const [modal, setModal] = useState(false);
  const [modalInnerScroll, setModalInnerScroll] = useState(false);
  const [modalCenter, setModalCenter] = useState(false);
  const [modalDrag, setModalDrag] = useState(false);
  const [modalNoScrollable, setModalNoScrollable] = useState(false);

  return (
    <div>
      <button type="button" className="button" onClick={() => setModal(true)}>
        Open simple modal
      </button>
      <button type="button" className="button" onClick={() => setModalInnerScroll(true)}>
        Open modal with inner scroll
      </button>
      <button type="button" className="button" onClick={() => setModalCenter(true)}>
        Open small modal on center scrollable or not
      </button>
      <button type="button" className="button" onClick={() => setModalDrag(true)}>
        Draggable
      </button>
      <button type="button" className="button" onClick={() => setModalNoScrollable(true)}>
        Open large modal on center without scroll
      </button>
      <PureModal
        header="Custom header with a lot of symbols. It's very important to have a dynamic header height and this modal supports it"
        footer="Buttons?"
        isOpen={modalInnerScroll}
        closeButtonPosition="bottom"
        onClose={() => {
          setModalInnerScroll(false);
          return true;
        }}
      >
        <input type="text" placeholder="with input" value="" />
        {largeContent}
      </PureModal>
      <PureModal
        header="Custom heading"
        footer="Buttons?"
        width="800px"
        scrollable={false}
        isOpen={modal}
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        {largeContent}
      </PureModal>
      <PureModal
        header="Custom heading"
        footer="Buttons?"
        scrollable={false}
        isOpen={modalCenter}
        closeButtonPosition="bottom"
        portal
        closeButton={<div>&#10007;</div>}
        onClose={() => {
          setModalCenter(false);
          return true;
        }}
      >
        <p>Center</p>
      </PureModal>

      <PureModal
        header="Custom heading"
        draggable
        footer="Buttons?"
        scrollable={false}
        isOpen={modalDrag}
        closeButtonPosition="bottom"
        portal
        closeButton={<div>&#10007;</div>}
        onClose={() => {
          setModalDrag(false);
          return true;
        }}
      >
        <p>Center</p>
      </PureModal>

      <PureModal
        header="Custom heading"
        footer="Buttons?"
        isOpen={modalNoScrollable}
        closeButtonPosition="bottom"
        scrollable={false}
        portal
        closeButton={<div>&#10007;</div>}
        onClose={() => {
          setModalNoScrollable(false);
          return true;
        }}
      >
        {largeContent}
      </PureModal>
    </div>
  );
}

render(<ModalContainer />, document.getElementById('js--modals'));
