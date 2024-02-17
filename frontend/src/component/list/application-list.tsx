import { ReactNode, useState } from "react";
import { ReportClient } from "../../generated/ReportServiceClientPb";
import { GetApplicationsRequest } from "../../generated/report_pb";
import ApplicationCard from "../card/application-card";

const ApplicationList: React.FC = () => {
    const [ monitorApps, setMonitorApps ] = useState();
}

export default ApplicationList;