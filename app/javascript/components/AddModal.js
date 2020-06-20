import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

import Modal from './Modal';

const StyledButton = styled.button`
  unset: all;
  padding: 0.5rem 1rem;
  background-color: rgba(14, 103, 23, 0.2);
  border: none;
  color: rgba(14, 103, 23, 0.5);
  border-radius: 40px;

  :focus {
    outline: none;
  }
`;

const AddModal = ({ peopleTabInfo, ...restProps }) => (
  <Modal title={peopleTabInfo.btn} {...restProps}>
    <Form>
      {peopleTabInfo.headings.map(heading => (
        <Form.Group controlId={`form${heading}`}>
          <Form.Label>{heading}</Form.Label>
          <Form.Control type={heading == "email" ? "email" : ""} />
        </Form.Group>
      ))}

      <StyledButton className="py-2" type="submit" onClick={restProps.onHide}>
        Submit
      </StyledButton>
    </Form>
  </Modal>
);

export default AddModal;