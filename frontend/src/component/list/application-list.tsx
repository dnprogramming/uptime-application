import React, {useEffect, useState} from 'react';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import styled from 'styled-components';

import ApplicationCard from '../card/application-card';
import {
  ApplicationInformation,
  GetApplicationsResponse,
} from '../../generated/report_pb';
import {ReportClient} from '../../generated/ReportServiceClientPb';

const ApplicationListing = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Apps = styled(ApplicationCard)`
  max-width: 25vw;
  max-height: 10vh;
`;

function ApplicationList() {
  const [monitorApps, setMonitorApps] = useState<ApplicationInformation[]>([]);
  const client = new ReportClient('http://localhost:8080', null, {});

  useEffect(() => {
    const intervalId = setInterval(getApps, 500);

    return () => clearInterval(intervalId);
  }, []);

  const getApps = async () => {
    const request = new Empty();
    client.getApplications(
      request,
      {},
      (err: any, res: GetApplicationsResponse) => {
        const monitoredApplications = res.getAppsList();
        if (monitoredApplications.length > -1) {
          setMonitorApps(monitoredApplications);
        }
      }
    );
  };

  return (
    <ApplicationListing>
      {monitorApps.length === 0 && <p>No Apps Found</p>}
      {monitorApps.length > 0 &&
        monitorApps.map(app => <Apps key={app.getAppid()} app={app} />)}
    </ApplicationListing>
  );
}

export default ApplicationList;
