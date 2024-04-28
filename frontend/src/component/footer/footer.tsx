import React from 'react';
import styled from 'styled-components';

const AppFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  flex-flow: column;
  color: #000000;
  position: absolute;
  bottom: 0;
`;

const Footer = () => {
  return <AppFooter>&copy; {new Date().getFullYear()}</AppFooter>;
};

export default Footer;
