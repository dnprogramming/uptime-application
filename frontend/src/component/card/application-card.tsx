import React from 'react';
import styled from 'styled-components';

import {ApplicationInformation} from '../../generated/report_pb';

const AppCard = styled.div`
  display: flex;
  width: 100dvw;
`;
const StatusDiv = styled.div`
  width: 25dvw;
`;
const StatusCircle = styled.div<{status: Number}>`
  width: 80dvw;
  height: 80dvh;
  border-radius: 25%;
  background-color: ${props =>
    props.status === 0 ? 'Green' : props.status === 1 ? 'Yellow' : 'Red'};
`;
const AppDiv = styled.div`
  width: 75dvw;
`;
const AppName = styled.div`
  width: 100dvw;
`;
const PersonResponsible = styled.div`
  width: 100dvw;
`;
const Updated = styled.div`
  width: 100dvw;
`;

function ApplicationCard({app}: {app: ApplicationInformation}) {
  const appName = app.getAppname();
  const appStatus = app.getAppstatus();
  const lastUpdated = app.getLastupdated();
  const updated = lastUpdated?.toDate().toLocaleString().replace(',', ' at');
  const responsible = app.getResponsiblepersonname();
  const appId = app.getAppid();
  return (
    <AppCard key={appId}>
      <StatusDiv>
        <StatusCircle status={appStatus} />
      </StatusDiv>
      <AppDiv>
        <AppName>{appName}</AppName>
        <PersonResponsible>{responsible}</PersonResponsible>
        <Updated>Last Updated: {updated}</Updated>
      </AppDiv>
    </AppCard>
  );
}

export default ApplicationCard;
