import React from 'react';
import styled from 'styled-components';

const Topnav = styled.div`
  width: 80vw;
  text-align: right;
`;

const TopnavLink = styled.a`
  font-size: 1rem;
`;
function Navbar() {
  return (
    <Topnav>
      <TopnavLink href="/add">Add New Application</TopnavLink>
    </Topnav>
  );
}

export default Navbar;
