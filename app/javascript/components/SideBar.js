import React from 'react';
import styled from 'styled-components';

const SideItemContainer = styled.div`
  background-color: ${props => props.active ? "rgba(14, 103, 23, 0.2)" : "none"};
  color: ${props => props.active ? " rgba(14, 103, 23, 0.48)" : "rgba(0, 0, 0, 0.3)"};
`;

const FaContainer = styled.div`width: 30px;`

const SideItem = ({ icon, name, active, switchTab }) => (
  <SideItemContainer className="d-flex py-3 px-4 align-items-center" active={active} onClick={() => switchTab(name)}>
    <FaContainer className="mr-3"><i className={`fa ${icon} fa-2x`} /></FaContainer>
    <p>{name}</p>
  </SideItemContainer>
);

const SideBarContainer = styled.div`
  background-color: rgba(14, 103, 23, 0.1);
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
    <div className="d-flex justify-content-center p-3">logout</div>
  </SideBarContainer>
);

export default SideBar;