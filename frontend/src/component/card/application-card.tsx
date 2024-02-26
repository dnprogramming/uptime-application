import React from 'react';
import styled from 'styled-components';

import {ApplicationInformation} from '../../generated/report_pb';

const AppCard = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem;
  background: rgba(20, 20, 20, 0.2);
  border-radius: 1rem;
  text-decoration: none;
`;
const StatusDiv = styled.div`
  shape-outside: circle(50%);
  clip-path: circle(2dvw);
  width: 25%;
  height: 100%;
`;
const StatusCircle = styled.div<{status: Number}>`
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.status === 0 ? 'Green' : props.status === 1 ? 'Yellow' : 'Red'};
`;
const AppDiv = styled.div`
  text-align: left;
`;
const AppName = styled.div`
  font-size: 2rem;
`;
const CriticalityLevel = styled.div`
  font-size: 1.5rem;
`;
const PersonResponsible = styled.div`
  font-size: 1.1rem;
`;
const Updated = styled.div`
  font-size: 1rem;
`;

function ApplicationCard({app}: {app: ApplicationInformation}) {
  const appName = app.getAppname();
  const appStatus = app.getAppstatus();
  const criticalityLevel = app.getCriticalitylevel();
  const lastUpdated = app.getLastupdated();
  const updated = lastUpdated?.toDate().toLocaleString().replace(',', ' at');
  const responsible = app.getResponsiblepersonname();
  const appId = app.getAppid();
  const link = '/edit/' + appId;
  return (
    <AppCard href={link} key={appId}>
      <StatusDiv>
        <StatusCircle status={appStatus} />
      </StatusDiv>
      <AppDiv>
        <AppName>{appName}</AppName>
        <CriticalityLevel>{criticalityLevel}</CriticalityLevel>
        <PersonResponsible>
          Person Responsible:
          <br />
          {responsible}
        </PersonResponsible>
        <Updated>
          Last Updated:
          <br />
          {updated}
        </Updated>
      </AppDiv>
    </AppCard>
  );
}

export default ApplicationCard;
