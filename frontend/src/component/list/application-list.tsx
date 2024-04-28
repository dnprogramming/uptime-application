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
import ProxyHost from '../../utility/utility';

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

const ConnectionErrorWarning = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: calc(2rem + 2vmin);
  line-height: 10dvw;
`;

const Apps = styled(ApplicationCard)`
  max-width: 20vw;
  max-height: 10vh;
`;

function ApplicationList() {
  const [monitorApps, setMonitorApps] = useState<ApplicationInformation[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const client = new ReportClient(ProxyHost, null, {});

  const getApps = async () => {
    const request = new Empty();
    client.getApplications(
      request,
      {},
      (err: any, res: GetApplicationsResponse) => {
        if (res) {
          const monitoredApplications = res.getAppsList();
          if (monitoredApplications.length > -1) {
            setMonitorApps(monitoredApplications);
          }
          if (connectionError) {
            setConnectionError(false);
          }
        } else {
          setConnectionError(true);
        }
      }
    );
  };

  useEffect(() => {
    const intervalId = setInterval(getApps, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {connectionError && (
        <ConnectionErrorWarning>
          There is currently an issue in the connection between the Web
          Application and the API
        </ConnectionErrorWarning>
      )}
      {!connectionError && (
        <ApplicationListing>
          {!connectionError && monitorApps.length === 0 && <p>No Apps Found</p>}
          {monitorApps.length > 0 &&
            monitorApps.map(app => <Apps key={app.getAppid()} app={app} />)}
        </ApplicationListing>
      )}
    </>
  );
}

export default ApplicationList;
