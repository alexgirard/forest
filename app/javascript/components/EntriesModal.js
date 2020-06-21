import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

const StyledTable = styled(Table)`
  th {
    background-color: rgba(14, 103, 23, 0.2);
    font-weight: 500;
  }
`;

const EntriesModal = ({ entries, modalTitle, peopleTabInfo, ...props }) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="entry-modal"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="entry-modal">{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body id="entry-modal">
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            {peopleTabInfo.entries.map(({ name }) => <th>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {entries.map(s => (
            <tr key={s.id}>
              {peopleTabInfo.entries.map(({ id }) => <td>{s[id]}</td>)}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Modal.Body>
  </Modal>
);

export default EntriesModal;