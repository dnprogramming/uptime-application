import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  color: #000000;
  background: #ffffff;
  font-size: calc(1rem + 2vmin);
  text-align: center;
  width: 100vw;
  font-family: arial;
  display: flex;
  margin: 15vh auto;
  justify-content: center;
  align-items: center;
`;

const ErrorPage = () => {
  return (
    <>
      <ErrorContainer>Sorry, but that page is not found.</ErrorContainer>
    </>
  );
};

export default ErrorPage;
