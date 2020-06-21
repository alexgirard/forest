import React, { useState } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

import ModalTemplate from './ModalTemplate';

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

const EditModal = ({ info, modalTitle, peopleTabInfo, ...restProps }) => {
  const [form, updateForm] = useState(info ? { ...info } : null);
  const update = (key, value) => updateForm({ ...form, [key]: value });

  const getValue = id => info ? info[id] : null;

  return (
    <ModalTemplate title={modalTitle} {...restProps}>
      {peopleTabInfo.headings.map(({ name, id, hideEdit }) => hideEdit ? null : (
        <Form.Group>
          <Form.Label>{name}</Form.Label>
          <Form.Control type={name == "Email" ? "Email" : ""} defaultValue={getValue(id)} onChange={event => update(id, event.target.value)} />
        </Form.Group>
      ))}

      <StyledButton className="py-2" type="submit" onClick={() => { restProps.onEditSubmit(info.id, peopleTabInfo.object, form); restProps.onHide(); }}>
        Submit
      </StyledButton>
    </ModalTemplate>
  );
};

export default EditModal;