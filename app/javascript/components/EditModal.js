import React, { useState } from 'react';
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

const EditModal = ({ dbInfo, peopleTabInfo, ...restProps }) => {
  const [form, updateForm] = useState({});
  const update = (key, value) => updateForm({ ...form, [key]: value });

  const getValue = id => dbInfo[id];

  return (
    <Modal title={peopleTabInfo.btn} {...restProps}>
      {peopleTabInfo.headings.map(({ name, id }) => (
        <Form.Group>
          <Form.Label>{name}</Form.Label>
          <Form.Control type={name == "Email" ? "Email" : ""} value={getValue(id)} onChange={event => update(id, event.target.value)} />
        </Form.Group>
      ))}

      <StyledButton className="py-2" type="submit" onClick={() => { restProps.onSubmit(peopleTabInfo.title, form); restProps.onHide(); }}>
        Submit
      </StyledButton>
    </Modal>
  );
};

export default EditModal;