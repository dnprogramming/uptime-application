import React from 'react';
import styled from 'styled-components';

import {ApplicationInformation} from '../../generated/report_pb';

const AppCard = styled.div`
  display: flex;
`;

const AppName = styled.div`
  width: 100dvw;
`;

const Updated = styled.div`
  width: 100dvw;
`;

function ApplicationCard({app}: {app: ApplicationInformation}) {
  const appName = app.getAppname();
  const lastUpdated = app.getLastupdated();
  const updated = lastUpdated?.toDate().toLocaleString();
  return (
    <AppCard>
      <AppName>{appName}</AppName>
      <Updated>{updated}</Updated>
    </AppCard>
  );
}

export default ApplicationCard;
