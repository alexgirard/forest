import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

import AddModal from './AddModal';
import EditModal from './EditModal';
import EntryModal from './EntryModal';

const rooms = { object: "room", title: "Rooms", btn: "Add Room", 
  entries: [{ name: "Time", id: "time"}, { name: "Badge #", id: "staff_id"}], // FIXME: should be badge
  headings: [
    { name: "Identifer", id: "identifier" },
    { name: "Patient Id", id: "patient_id", hideEdit: true },
  ],
};
const patients = { object: "patient", title: "Patients", btn: "Add Patient",
  entries: [{ name: "Time", id: "time"}, { name: "Badge #", id: "staff_id"}],
  headings: [
    { name: "Hospital Id", id: "hospital_id" },
    { name: "Room Identifier", id: "current_room" },
    { name: "Room Admittance", id: "entry_time" },
    { name: "Room Discharge", id: "exit_time", hide: true },
  ],
};
const staff = { object: "staff", title: "Staff", btn: "Add Staff",
  entries: [{ name: "Time", id: "time"}, { name: "Room Id", id: "room_id"}],
  headings: [
    { name: "Badge #", id: "badge" },
    { name: "First Name", id: "first_name" },
    { name: "Last Name", id: "last_name" },
    { name: "Exposure", id: "exposure", hideEdit: true },
    { name: "Email", id: "email" },
    { name: "Phone", id: "phone" },
  ],
};
const infections = { object: "infection", title: "Infections", headings: [
  { name: "Patient", id: "patient_id" },
  { name: "Type", id: "notes" },
  { name: "Status", id: "status" },
  { name: "HAI", id: "hai" },
  { name: "Start", id: "start" },
  { name: "Incubation", id: "incubation" },
]};
const peopleTabs = [rooms, patients, staff, infections];

const TabUnderline = styled.div`
  border-bottom: ${props => props.active ? "3px solid black" : "none"};
  margin-right: 2rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
`;

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
      <StyledButton onClick={() => setModalShow(true)}>
        <i className="fa fa-plus mr-2" />
        {peopleTabInfo.btn}
      </StyledButton>
    )}
  </div>
);

const StyledTable = styled(Table)`
  th {
    background-color: rgba(14, 103, 23, 0.2);
    font-weight: 500;
  }

  td {
    vertical-align: center;
  }

  tr.entries {
    :hover {
      cursor: pointer;
    }
  }

  .edit {
    width: 1px;
    white-space: nowrap;
  }
`;


const StaffInfo = ({ staff, entries, onSubmit, ...props }) => {
  const [editInfo, setEditInfo] = useState(null);
  const [entryInfo, setEntryInfo] = useState(null);

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

  const submitEdit = (id, title, form) => {
    const submitObject = { [title] : { ...form }};
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/staffs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
      body: JSON.stringify(submitObject),
    })
  }

  const staffEntries = entryInfo => !entryInfo ? [] : _.filter(entries, e => e.badge == entryInfo);

  return (
    <>
      <tbody>
        {staff.map(s => (
          <tr onClick={() => setEntryInfo(s.badge)} className="entries" key={s.id}>
            <td>{`${s.badge}`}</td>
            <td>{`${s.first_name}`}</td>
            <td>{`${s.last_name}`}</td>
            <td>{`${s.exposure}`}</td>
            <td>{`${s.email}`}</td>
            <td>{`${s.phone}`}</td>
            <td className="edit">
              <StyledButton onClick={e => { e.stopPropagation(); setEditInfo(s); }}>Edit</StyledButton>
              <StyledButton onClick={e => { e.stopPropagation(); handleStaffDelete(s.id); }}>Delete</StyledButton>
            </td>
          </tr>
        ))}
        <EditModal modalTitle="Edit Staff" show={!!editInfo} onEditSubmit={submitEdit} onHide={() => setEditInfo(null)} info={editInfo} onSubmit={onSubmit} {...props} />
        <EntryModal modalTitle={`Staff #${entryInfo} Room Entries`} show={!!entryInfo} onHide={() => setEntryInfo(null)} entries={staffEntries(entryInfo)} {...props} />
      </tbody>
    </>
  );
};

const PatientInfo = ({ patients, entries, ...props }) => {
  const [editInfo, setEditInfo] = useState(false);
  const [entryInfo, setEntryInfo] = useState(null);

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

  const submitEdit = (id, title, form) => {
    const submitObject = { [title] : { ...form }};
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
      body: JSON.stringify(submitObject),
    })
  }

  const staffEntries = entryInfo => !entryInfo ? [] : _.filter(entries, e => e.patient_id == entryInfo);

  return (
    <tbody>
      {patients.map(p => (
        <tr onClick={() => setEntryInfo(p.hospital_id)} className="entries" key={p.id}>
          <td>{`${p.hospital_id}`}</td>
          <td>{`${p.current_room}`}</td>
          <td>{`${p.entry_time}`}</td>
          <td className="edit">
            <StyledButton onClick={e => { e.stopPropagation(); setEditInfo(p); }}>Edit</StyledButton>
            <StyledButton onClick={e => { e.stopPropagation(); handleStaffDelete(p.id); }}>Delete</StyledButton>
          </td>
        </tr>
      ))}
      <EditModal modalTitle="Edit Patient" show={!!editInfo} onEditSubmit={submitEdit} onHide={() => setEditInfo(null)} info={editInfo} {...props} />
      <EntryModal modalTitle={`Patient #${entryInfo} Staff Room Entries`} show={!!entryInfo} onHide={() => setEntryInfo(null)} entries={staffEntries(entryInfo)} {...props} />
    </tbody>
  );
};

const RoomInfo = ({ rooms, entries, ...props }) => {
  const [editInfo, setEditInfo] = useState(false);
  const [entryInfo, setEntryInfo] = useState(null);
  
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

  const submitEdit = (id, title, form) => {
    const submitObject = { [title] : { ...form }};
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
      body: JSON.stringify(submitObject),
    })
  }

  const staffEntries = entryInfo => !entryInfo ? [] : _.filter(entries, e => e.room_id == entryInfo);

  return (
    <tbody>
      {rooms.map(r => (
        <tr onClick={() => setEntryInfo(r.identifier)} className="entries" key={r.id}>
          <td>{`${r.identifier}`}</td>
          <td>{`${r.current_patient}`}</td>
          <td className="edit">
            <StyledButton onClick={e => { e.stopPropagation(); setEditInfo(r); }}>Edit</StyledButton>
            <StyledButton onClick={e => { e.stopPropagation(); handleStaffDelete(r.id); }}>Delete</StyledButton>
          </td>
        </tr>
      ))}
      <EditModal modalTitle="Edit Room" show={!!editInfo} onEditSubmit={submitEdit} onHide={() => setEditInfo(null)} info={editInfo} {...props} />
      <EntryModal modalTitle={`Room #${entryInfo} Entries`} show={!!entryInfo} onHide={() => setEntryInfo(null)} entries={staffEntries(entryInfo)} {...props} />
    </tbody>
  )
}

const InfectionInfo = ({ infections, ...props }) => {
  const [editInfo, setEditInfo] = useState(false);
  const handleInfectionDelete = id => {
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/infections/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
    })
  }

  const submitEdit = (id, title, form) => {
    const submitObject = { [title] : { ...form }};
    var token = document.getElementsByName('csrf-token')[0].content
    fetch(`http://localhost:3000/infections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
      body: JSON.stringify(submitObject),
    })
  }

  return(
    <tbody>
      {infections.map(i => (
        <tr key={i.id}>
          <td>{`${i.patient_hospital_id}`}</td>
          <td>{`${i.notes}`}</td>
          <td>{`${i.status}`}</td>
          <td>{`${i.hai}`}</td>
          <td>{`${i.start}`}</td>
          <td>{`${i.incubation}`}</td>            
          <td className="edit">
            <StyledButton onClick={() => setEditInfo(i)}>Edit</StyledButton>
            <StyledButton onClick={() => handleInfectionDelete(i.id)}>Delete</StyledButton></td>
        </tr>
      ))}
      <EditModal modalTitle="Edit Infection" show={!!editInfo} onEditSubmit={submitEdit} onHide={() => setEditInfo(null)} info={editInfo} {...props} />
    </tbody>
  )
}

const People = ({ staff, patients, rooms, infections, entries }) => {
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
            {peopleTabInfo.headings.map(({ name, hide }) => hide ? null : <th>{name}</th>)}
            <th className="edit">Actions</th>
          </tr>
        </thead>
        {/* Change onSubmit below for edit */}
        {
          {
            'Patients': <PatientInfo patients={patients} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} entries={entries} />,
            'Staff': <StaffInfo staff={staff} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} entries={entries} />,
            'Rooms': <RoomInfo rooms={rooms} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} entries={entries} />,
            'Infections': <InfectionInfo infections={infections} peopleTabInfo={peopleTabInfo} onSubmit={submitForm} />
          }[peopleTab]
        }
      </StyledTable>

      <AddModal show={modalShow} onSubmit={submitForm} onHide={() => setModalShow(false)} peopleTabInfo={peopleTabInfo} type={peopleTab} />
    </div>
  );
};

export default People;