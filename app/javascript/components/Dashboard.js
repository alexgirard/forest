import React, { useState } from 'react';
import styled from 'styled-components';

import SideBar from './SideBar';
import People from './People';
import Outbreaks from './Outbreaks';

const Dot = styled.span`color: rgba(14, 103, 23, 0.5);`;
const Logo = () => <h1>forest<Dot>.</Dot></h1>

const TopBarContainer = styled.div`
  border-bottom: 1px solid rgba(199, 199, 199, 0.5);
`;

const TopBar = () => (
  <TopBarContainer className="py-2 px-3 d-flex justify-content-between align-items-center">
    <Logo />
    <h3>User</h3>
  </TopBarContainer>
);

const tabs = [
  { icon: "fa-table",  name: "dashboard", component: <p>dash</p> },
  { icon: "fa-user",   name: "people",    component: <People /> },
  { icon: "fa-fire",   name: "outbreak",  component: <Outbreaks /> },
];

const TabContent = ({ curTab }) => tabs.find(tab => tab.name === curTab).component || null;

const Dashboard = () => {
  const [curTab, switchTab] = useState("outbreak");

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