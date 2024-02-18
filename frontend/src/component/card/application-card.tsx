import React from 'react';
import styled from 'styled-components';

import {ApplicationInformation} from '../../generated/report_pb';

const AppCard = styled.div`
  display: flex;
  background: #ff0000;
`;

function ApplicationCard({app}: {app: ApplicationInformation}) {
  const appName = app.getAppname();
  return <AppCard>{appName}</AppCard>;
}

export default ApplicationCard;
