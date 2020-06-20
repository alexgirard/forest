import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, FormData } from 'react-bootstrap';

import AddModal from './AddModal';

const rooms = { title: "Rooms", btn: "Add Room", headings: [
  { name: "Room Id", id: "room_id" },
  { name: "Identifer", id: "identifier" },
  { name: "Patient Id", id: "patient_id" },
]};
const patients = { title: "Patients", btn: "Add Patient", headings: [
  { name: "Patient Id", id: "patient_id" },
  { name: "Room Id", id: "identifier" },
  { name: "Room Admittance", id: "start_time" },
  { name: "Room Discharge", id: "end_time" },
]};
const staff = { title: "Staff", btn: "Add Staff", headings: [
  { name: "Badge #", id: "badge" },
  { name: "First Name", id: "first_name" },
  { name: "Last Name", id: "last_name" },
  { name: "Email", id: "email" },
  { name: "Phone", id: "phone" },
]};
const infections = { title: "Infections", headings: [
  { name: "Patient", id: "patient_id" },
  { name: "Notes", id: "notes" },
  { name: "Start", id: "start" },
  { name: "End", id: "end" },
  { name: "Incubation", id: "incubation" },
]};
const peopleTabs = [rooms, patients, staff, infections];

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
    {!!peopleTabInfo.btn && (
      <AddButton onClick={() => setModalShow(true)}>
        <i className="fa fa-plus mr-2" />
        {peopleTabInfo.btn}
      </AddButton>
    )}
  </div>
);

const StyledTable = styled(Table)`
  th {
    background-color: rgba(14, 103, 23, 0.2);
    font-weight: 500;
  }
`;

const StaffInfo = ({ staff }) => (
  <tbody>
    {staff.map(s => (
        <tr key={s.id}>
          <td>{`${s.badge}`}</td>
          <td>{`${s.first_name}`}</td>
          <td>{`${s.last_name}`}</td>
          <td>{`${s.email}`}</td>
          <td>{`${s.phone}`}</td>
        </tr>
    ))}
  </tbody>
);

const PatientInfo = ({ patients }) => (
  <tbody>
    {patients.map(p => (
        <tr key={p.id}>
          <td>{`${p.hospital_id}`}</td>
          <td>Room</td>
          <td>Start time</td>
          <td>End time</td>
        </tr>
    ))}
  </tbody>
);

const RoomInfo = ({ rooms }) => (
  <tbody>
    {rooms.map(r => (
        <tr key={r.id}>
          <td>{`${r.id}`}</td>
          <td>{`${r.identifer}`}</td>
          <td>Patient Hospital ID</td>
        </tr>
    ))}
  </tbody>
);

const InfectionInfo = ({ infections }) => (
  <tbody>
    {infections.map(i => (
        <tr key={i.id}>
          <td>{`${i.patient.hospital_id}`}</td>
          <td>{`${i.notes}`}</td>
          <td>{`${i.start}`}</td>
          <td>{`${i.end}`}</td>
          <td>{`${i.incubation}`}</td>
        </tr>
    ))}
  </tbody>
);

const People = ({ staff, patients, rooms, infections }) => {
  const [peopleTab, switchPeopleTab] = useState(peopleTabs[0].title);
  const [modalShow, setModalShow] = useState(false);
  const peopleTabInfo = peopleTabs.find(tab => tab.title == peopleTab);

  const submitForm = (title, form) => {
    const submitObject = { [title.toLowerCase()] : { ...form }};
    console.log(submitObject);
    event.preventDefault();
  }

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
            {peopleTabInfo.headings.map(({ name }) => <th>{name}</th>)}
          </tr>
        </thead>
        {
          {
            'patients': <PatientInfo patients={patients}/>,
            'staff': <StaffInfo staff={staff}/>,
            'rooms': <RoomInfo rooms={rooms}/>,
            'infections': <InfectionInfo infections={infections}/>
          }[peopleTab]
        }
      </StyledTable>

      <AddModal show={modalShow} onSubmit={submitForm} onHide={() => setModalShow(false)} peopleTabInfo={peopleTabInfo} type={peopleTab} />
    </div>
  );
};

export default People;