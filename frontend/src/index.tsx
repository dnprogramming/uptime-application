import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import styled from 'styled-components';

import './index.css';
import ApplicationList from './component/list/application-list';
import AddApplication from './component/form/add-application';
import EditApplication from './component/form/edit-application';
import Navbar from './component/navbar/navbar';

const AppBody = styled.div`
  background: #cccccc;
  height: 100%;
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <ApplicationList />,
  },
  {
    path: '/add',
    element: <AddApplication />,
  },
  {
    path: '/edit/:Id',
    element: <EditApplication />,
  },
]);

root.render(
  <React.StrictMode>
    <AppBody className="App">
      <Navbar></Navbar>
      <RouterProvider router={router} />
    </AppBody>
  </React.StrictMode>
);
