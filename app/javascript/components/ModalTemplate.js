import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalTemplate = props => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby={`contained-modal-title-vcenter-${props.title}`}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id={`contained-modal-title-vcenter-${props.title}`}>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.children}
    </Modal.Body>
    {!!props.footer && (
      <Modal.Footer>
        {props.footer}
      </Modal.Footer>
    )}
  </Modal>
);

export default ModalTemplate;