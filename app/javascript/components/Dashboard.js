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

const TopBar = () => (
  <TopBarContainer className="py-2 px-3 d-flex justify-content-between align-items-center">
    <img src={Logo} />
    <h3>User</h3>
  </TopBarContainer>
);

const Dashboard = ({staff, patients, rooms, infections, entries}) => {
  const [curTab, switchTab] = useState("Dashboard");

  const tabs = [
    { icon: "fa-table",  name: "Dashboard", component: <Overview staff={staff} patients={patients} rooms={rooms} infections={infections} /> },
    { icon: "fa-user",   name: "People",    component: <People staff={staff} patients={patients} rooms={rooms} infections={infections}/> },
    { icon: "fa-fire",   name: "Log Infection",  component: <Outbreaks /> },
  ];

  const TabContent = ({ curTab }) => tabs.find(tab => tab.name === curTab).component || null;

  return ( 
    <>
      <TopBar />
      <div className="d-flex h-100">
        <SideBar tabs={tabs} curTab={curTab} switchTab={switchTab}  />
        <div className="w-100">
          <TabContent curTab={curTab} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;