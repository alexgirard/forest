import React from 'react';
import { Modal as BModal } from 'react-bootstrap';

const Modal = props => (
  <BModal
    {...props}
    size="lg"
    aria-labelledby={`contained-modal-title-vcenter-${props.title}`}
    centered
  >
    <BModal.Header closeButton>
      <BModal.Title id={`contained-modal-title-vcenter-${props.title}`}>{props.title}</BModal.Title>
    </BModal.Header>
    <BModal.Body>
      {props.children}
    </BModal.Body>
    {!!props.footer && (
      <BModal.Footer>
        {props.footer}
      </BModal.Footer>
    )}
  </BModal>
);

export default Modal;