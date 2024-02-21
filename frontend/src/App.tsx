import React from 'react';
import styled from 'styled-components';
import './App.css';
import ApplicationList from './component/list/application-list';

const AppBody = styled.div`
  background: #cccccc;
  height: 100vh;
`;

function App() {
  return (
    <AppBody className="App">
      <ApplicationList />
    </AppBody>
  );
}

export default App;
