import React from 'react';
import styled from 'styled-components';

const Topnav = styled.div`
  width: 80vw;
  text-align: right;
`;

const TopnavLink = styled.a`
  font-size: 1rem;
  margin: 0 2vw;
`;
function Navbar() {
  return (
    <Topnav>
      <TopnavLink href="/">Home</TopnavLink>
      <TopnavLink href="/add">Add New Application</TopnavLink>
    </Topnav>
  );
}

export default Navbar;
