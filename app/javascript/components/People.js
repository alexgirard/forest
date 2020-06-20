import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

import AddModal from './AddModal';
import EditModal from './EditModal';

const rooms = { object: "room", title: "Rooms", btn: "Add Room", headings: [
  { name: "Identifer", id: "identifier" },
  { name: "Patient Id", id: "patient_id" },
]};
const patients = { object: "patient", title: "Patients", btn: "Add Patient", headings: [
  { name: "Hospital Id", id: "hospital_id" },
  { name: "Room Id", id: "room_id" },
  { name: "Room Admittance", id: "start_time" },
  { name: "Room Discharge", id: "end_time" },
]};
const staff = { object: "staff", title: "Staff", btn: "Add Staff", headings: [
  { name: "Badge #", id: "badge" },
  { name: "First Name", id: "first_name" },
  { name: "Last Name", id: "last_name" },
  { name: "Email", id: "email" },
  { name: "Phone", id: "phone" },
]};
const infections = { title: "Infections", headings: [
  { name: "Patient", id: "patient_id" },
  { name: "Notes", id: "notes" },
  { name: "Status", id: "status" },
  { name: "Hai", id: "hai" },
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



const StaffInfo = ({ staff, ...props }) => {
  const [editInfo, setEditInfo] = useState(null);

  const handleStaffDelete = id => {
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/staffs/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
    })
  }

  return(
    <tbody>
      {staff.map(s => (
          <tr key={s.id}>
            <td>{`${s.badge}`}</td>
            <td>{`${s.first_name}`}</td>
            <td>{`${s.last_name}`}</td>
            <td>{`${s.email}`}</td>
            <td>{`${s.phone}`}</td>
            <td><button onClick={() => setEditInfo(s)}>Edit</button><button onClick={() => handleStaffDelete(s.id)}>Delete</button></td>
          </tr>
      ))}
      <EditModal modalTitle="Edit Staff" show={!!editInfo} onHide={() => setEditInfo(null)} info={editInfo} {...props} />
    </tbody>
  )
}

const PatientInfo = ({ patients, ...props }) => {
  const [editInfo, setEditInfo] = useState(false);

  const handlePatientDelete = id => {
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/patients/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
    })
  }

  return(
    <tbody>
      {patients.map(p => (
          <tr key={p.id}>
            <td>{`${p.hospital_id}`}</td>
            <td>{`${p.current_room}`}</td>
            <td>{`${p.entry_time}`}</td>
            <td>{`${p.exit_time}`}</td>
            <td><button onClick={() => setEditInfo(p)}>Edit</button><button onClick={() => handlePatientDelete(p.id)}>Delete</button></td>
          </tr>
      ))}
      <EditModal modalTitle="Edit Patient" show={!!editInfo} onHide={() => setEditInfo(null)} info={editInfo} {...props} />
    </tbody>
  )
}

const RoomInfo = ({ rooms, ...props }) => {
  const [editInfo, setEditInfo] = useState(false);
  const handleRoomDelete = id => {
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/rooms/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
    })
  }

  return (
    <tbody>
      {rooms.map(r => (
          <tr key={r.id}>
            <td>{`${r.identifier}`}</td>
            <td>{`${r.current_patient}`}</td>
            <td><button onClick={() => setEditInfo(r)}>Edit</button><button onClick={() => handleRoomDelete(r.id)}>Delete</button></td>
          </tr>
      ))}
      <EditModal modalTitle="Edit Room" show={!!editInfo} onHide={() => setEditInfo(null)} info={editInfo} {...props} />
    </tbody>
  )
}

const InfectionInfo = ({ infections, ...props }) => (
  <tbody>
    {infections.map(i => (
        <tr key={i.id}>
          <td>{`${i.patient_hospital_id}`}</td>
          <td>{`${i.notes}`}</td>
          <td>{`${i.status}`}</td>
          <td>{`${i.hai}`}</td>
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
    const submitObject = { [title] : { ...form }};
    console.log(submitObject);
    //event.preventDefault();
    var token = document.getElementsByName('csrf-token')[0].content
    switch(title) {
      case 'room': 
        fetch('http://localhost:3000/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
          },
          credentials: 'same-origin',
          body: JSON.stringify(submitObject),
        })
        break;
      case 'patient':
        fetch('http://localhost:3000/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
          },
          credentials: 'same-origin',
          body: JSON.stringify(submitObject),
        })
        break;
      case 'staff':
        fetch('http://localhost:3000/staffs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
          },
          credentials: 'same-origin',
          body: JSON.stringify(submitObject),
        })
        break;
    }

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
        {/* Change onSubmit below for edit */}
        {
          {
            'Patients': <PatientInfo patients={patients} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} />,
            'Staff': <StaffInfo staff={staff} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} />,
            'Rooms': <RoomInfo rooms={rooms} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} />,
            'Infections': <InfectionInfo infections={infections} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} />
          }[peopleTab]
        }
      </StyledTable>

      <AddModal show={modalShow} onSubmit={submitForm} onHide={() => setModalShow(false)} peopleTabInfo={peopleTabInfo} type={peopleTab} />
    </div>
  );
};

export default People;