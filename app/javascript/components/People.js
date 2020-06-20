import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

import AddModal from './AddModal';

const roomEntries = { title: "room entries", btn: "add room", headings: ["room id", "staff id", "time"] };
const patients = { title: "patients", btn: "add patient", headings: ["patient id", "room id", "room admittance", "room discharge"] };
const staff = { title: "staff", btn: "add staff", headings: ["staff id", "last name", "first name", "email", "phone"] };
const peopleTabs = [roomEntries, patients, staff];

const TabUnderline = styled.div`
  border-bottom: ${props => props.active ? "3px solid black" : "none"};
  margin-right: 2rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
`;

const AddButton = styled.button`
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

const PeopleTabs = ({ tabs, peopleTabInfo, switchPeopleTab, setModalShow }) => (
  <div className="d-flex pb-4 justify-content-between align-items-center">
    <div className="d-flex">
      {tabs.map(({ title }) => (
        <TabUnderline active={peopleTabInfo.title == title} onClick={() => switchPeopleTab(title)}>
          <h4>{title}</h4>
        </TabUnderline>
      ))}
    </div>
    <AddButton onClick={() => setModalShow(true)}>
      <i className="fa fa-plus mr-2" />
      {peopleTabInfo.btn}
    </AddButton>
  </div>
);

const StyledTable = styled(Table)`
  th {
    background-color: rgba(14, 103, 23, 0.2);
    font-weight: 500;
  }
`;

const People = ({ patients, staff, rooms }) => {
  const [peopleTab, switchPeopleTab] = useState(peopleTabs[0].title);
  const [modalShow, setModalShow] = useState(false);
  const peopleTabInfo = peopleTabs.find(tab => tab.title == peopleTab);

  return (
    <div className="p-5 m-2">
      <PeopleTabs
        tabs={peopleTabs}
        peopleTabInfo={peopleTabInfo}
        switchPeopleTab={switchPeopleTab}
        setModalShow={setModalShow}
      />
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            {peopleTabInfo.headings.map(heading => <th>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* FIXME: add onClick Modal */}
          <tr> 
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </StyledTable>

      <AddModal show={modalShow} onHide={() => setModalShow(false)} peopleTabInfo={peopleTabInfo} />
    </div>
  );
};

export default People;