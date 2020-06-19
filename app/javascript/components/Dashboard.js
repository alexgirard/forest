import React from 'react';
import styled from 'styled-components';

const Fancy = styled.h1`
  background-color: #d74234;
`;

class Dashboard extends React.Component {
  render() {
    return (
      <Fancy>Dashboard</Fancy>
    );
  }
};

export default Dashboard;