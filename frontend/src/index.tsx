import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import styled from 'styled-components';

import './index.css';
import ApplicationList from './component/list/application-list';
import AddApplication from './component/form/add-application';
import EditApplication from './component/form/edit-application';
import Navbar from './component/navbar/navbar';
import ErrorPage from './component/error/error';
import Footer from './component/footer/footer';

const AppBody = styled.div`
  background: #babdbf;
  height: 100%;
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AppBody className="App">
      <RouterProvider router={router} />
    </AppBody>
  </React.StrictMode>
);
