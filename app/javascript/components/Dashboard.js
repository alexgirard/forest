import React, { useState } from 'react';
import styled from 'styled-components';

import SideBar from './SideBar';
import People from './People';
import Outbreaks from './Outbreaks';
import Overview from './Overview';

const Logo = require('../../assets/images/logo.png');

const TopBarContainer = styled.div`
  border-bottom: 1px solid rgba(199, 199, 199, 0.5);
`;

const Circle = styled.div`
  width: 40px;
  margin-left: 0.5rem;
  height: 40px;
  border-radius: 50%;
  font-size: 34px;
  color: white;
  line-height: 38px;
  text-align: center;
  background: rgba(14, 103, 23, 0.5)
`;

const TopBar = ({ user }) => {
  const email = user[0].email;
  const letter = email.slice(0,1);
  return (
    <TopBarContainer className="py-2 px-3 d-flex justify-content-between align-items-center">
      <img src={Logo} />
      <div className="d-flex justify-content-center align-items-center">
        <h5 className="m-0">{email}</h5>
        <Circle>{letter}</Circle>
      </div>
    </TopBarContainer>
  );
};

const Dashboard = ({staff, patients, rooms, infections, entries, user}) => {
  const [curTab, switchTab] = useState("Dashboard");

  const tabs = [
    { icon: "fa-table",  name: "Dashboard", component: <Overview staff={staff} patients={patients} rooms={rooms} infections={infections} /> },
    { icon: "fa-user",   name: "Information",    component: <People staff={staff} patients={patients} rooms={rooms} infections={infections} entries={entries}/> },
    { icon: "fa-fire",   name: "Log Infection",  component: <Outbreaks infections={infections} /> },
  ];

  const TabContent = ({ curTab }) => tabs.find(tab => tab.name === curTab).component || null;

  return ( 
    <div className="d-flex flex-column h-100">
      <TopBar user={user} />
      <div className="d-flex h-100">
        <SideBar tabs={tabs} curTab={curTab} switchTab={switchTab}  />
        <div className="w-100">
          <TabContent curTab={curTab} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;