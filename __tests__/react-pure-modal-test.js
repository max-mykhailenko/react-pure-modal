import React from 'react';
import Modal from '../dist/react-pure-modal.min.js';
import renderer from 'react-test-renderer';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

it('Should be null without props', () => {
  const component = renderer.create(<Modal />);
  expect(component.toJSON()).toBeNull();
});

it('Should be closed', () => {
  const component = renderer.create(<Modal isOpen={false} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('Should show content', () => {
  const component = renderer.create(
    <Modal isOpen>
      <span>Some content of modal</span>
    </Modal>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('Should show only content', () => {
  const component = renderer.create(
    <Modal replace isOpen>
      <span>Some content of modal</span>
    </Modal>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('Should contain width attribute', () => {
  const component = renderer.create(
    <Modal replace width="400px" isOpen>
      <span>Some content of modal</span>
    </Modal>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
