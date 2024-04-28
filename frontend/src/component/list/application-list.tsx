import React, {useEffect, useState} from 'react';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import styled from 'styled-components';

import ApplicationCard from '../card/application-card';
import {device} from '../media-query/media-query';
import {
  ApplicationInformation,
  GetApplicationsResponse,
} from '../../generated/report_pb';
import {ReportClient} from '../../generated/ReportServiceClientPb';

const ApplicationListing = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media ${device.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.sm} {
    grid-template-columns: 1fr;
  }
`;

const Apps = styled(ApplicationCard)`
  max-width: 20vw;
  max-height: 10vh;
`;

function ApplicationList() {
  const [monitorApps, setMonitorApps] = useState<ApplicationInformation[]>([]);
  const client = new ReportClient(
    'localhost:8080',
    null,
    {}
  );

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

  useEffect(() => {
    const intervalId = setInterval(getApps, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ApplicationListing>
      {monitorApps.length === 0 && <p>No Apps Found</p>}
      {monitorApps.length > 0 &&
        monitorApps.map(app => <Apps key={app.getAppid()} app={app} />)}
    </ApplicationListing>
  );
}

export default ApplicationList;
