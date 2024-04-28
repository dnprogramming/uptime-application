import React from 'react';
import styled from 'styled-components';

import {ApplicationInformation} from '../../generated/report_pb';

const AppCard = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem;
  background: #cacdcf;
  border-radius: 1rem;
  text-decoration: none;
  color: #404040;
`;

const StatusDiv = styled.div`
  shape-outside: circle(50%);
  clip-path: circle(2.45vw);
  width: 25%;
  height: 100%;
`;

const StatusCircle = styled.div<{status: Number}>`
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.status === 0
      ? '#3d7c47'
      : props.status === 1
        ? '#ffde22'
        : '#eb1736'};
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
  const appName = atob(app.getAppname());
  const appStatus = app.getAppstatus();
  const criticalityLevel = app.getCriticalitylevel();
  const lastUpdated = app.getLastupdated();
  const updated = lastUpdated?.toDate().toLocaleString().replace(',', ' at');
  const responsible = atob(app.getResponsiblepersonname());
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
