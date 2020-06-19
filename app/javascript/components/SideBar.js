import React from 'react';
import styled from 'styled-components';

const SideItemContainer = styled.div`
  background-color: ${props => props.active ? "rgba(14, 103, 23, 0.2)" : "none"};
  color: ${props => props.active ? " rgba(14, 103, 23, 0.48)" : "rgba(0, 0, 0, 0.3)"};
`;

const SideItem = ({ icon, name, active, switchTab }) => (
  <SideItemContainer className="d-flex py-3 px-4" active={active} onClick={() => switchTab(name)}>
    <p className="pr-2">{icon}</p>
    <p>{name}</p>
  </SideItemContainer>
);

const SideBarContainer = styled.div`
  background-color: rgba(14, 103, 23, 0.06);
  border-right: 1px solid rgba(199, 199, 199, 0.5);
  color: rgba(0, 0, 0, 0.3);

  :hover {
    cursor: pointer;
  }
`;

const SideBar = ({ tabs, curTab, switchTab }) => (
  <SideBarContainer className="h-100 d-flex flex-column justify-content-between">
    <div>
      {tabs.map(tab => (
        <SideItem {...tab} active={curTab === tab.name} switchTab={switchTab} />
      ))}
    </div>
    <div className="d-flex justify-content-center">logout</div>
  </SideBarContainer>
);

export default SideBar;