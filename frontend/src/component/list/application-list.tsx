import React, {useEffect, useState} from 'react';
import {ReportClient} from '../../generated/ReportServiceClientPb';
import {
  ApplicationInformation,
  GetApplicationsRequest,
  GetApplicationsResponse,
} from '../../generated/report_pb';
import ApplicationCard from '../card/application-card';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';

function ApplicationList() {
  const [monitorApps, setMonitorApps] = useState<ApplicationInformation[]>([]);
  const client = new ReportClient('http://localhost:8080', null, {});

  useEffect(() => {
    const intervalId = setInterval(getApps, 2000); // Call getApps every 2 seconds

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, []);

  const getApps = async () => {
    const request = new Empty();
    client.getApplications(
      request,
      {},
      (err: any, res: GetApplicationsResponse) => {
        const monitoredApplications = res.getAppsList();
        if (monitoredApplications.length > 0) {
          setMonitorApps(monitoredApplications);
        }
      }
    );
  };

  return (
    <div>
      {monitorApps.length === 0 && <p>No Apps Found</p>}
      {monitorApps.length > 0 &&
        monitorApps.map(app => (
          <ApplicationCard key={app.getAppid()} app={app} />
        ))}
    </div>
  );
}

export default ApplicationList;
