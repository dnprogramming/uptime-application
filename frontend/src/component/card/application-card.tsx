import React from "react";
import { styled } from "styled-components";

import { ApplicationInformation } from '../../generated/report_pb';

const ApplicationCard = ({ app }: { app: ApplicationInformation}) => {
  const appId = app.getAppid();
  const appName = app.getAppname();
  const appStatus = app.getAppstatus();
  const responsiblePerson = app.getResponsiblepersonname();
  const lastUpdated = app.getLastupdated();
  return (
    <div>
      "Hi"
    </div>
  );
};

export default ApplicationCard;
