import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {
  GetApplicationRequest,
  GetApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
} from '../../generated/report_pb';
import {ReportClient} from '../../generated/ReportServiceClientPb';
import {AppStatusOptions, CriticalityOptions} from '../../enum/criticalityEnum';

const EditApplicationForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Seperator = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5vw auto;
`;
const AppNameLabel = styled.label`
  width: 25vw;
  text-align: right;
`;
const AppNameField = styled.input`
  width: 25vw;
`;
const AppStatusLabel = styled.label`
  width: 25vw;
  text-align: right;
`;
const AppStatusField = styled.select`
  width: 25vw;
`;
const ResponsibleLabel = styled.label`
  width: 25vw;
  text-align: right;
`;
const ResponsibleField = styled.input`
  width: 25vw;
`;
const CriticalityLabel = styled.label`
  width: 25vw;
  text-align: right;
`;
const CriticalityField = styled.select`
  width: 25vw;
`;
const LastUpdatedLabel = styled.label`
  width: 25vw;
  text-align: right;
`;
const LastUpdatedText = styled.span`
  width: 25vw;
`;
const SubmitEmptyDiv = styled.div`
  width: 25vw;
`;
const SubmitButton = styled.button`
  text-align: center;
  padding: 1vw;
  justify-content: center;
  align-items: start;
`;
function EditApplication() {
  const [appId, setAppid] = useState(0);
  const [appname, setAppname] = useState('');
  const [appstatus, setAppstatus] = useState(0);
  const [person, setPerson] = useState('');
  const [criticality, setCriticality] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('');
  const client = new ReportClient('http://localhost:8080', null, {});
  const params = useParams();
  const navigate = useNavigate();

  const changeAppname = (event: ChangeEvent<{value: string}>) => {
    setAppname(event.target.value);
  };

  const changePerson = (event: ChangeEvent<{value: string}>) => {
    setPerson(event.target.value);
  };

  const changeCriticality = (event: ChangeEvent<{value: number}>) => {
    console.log(event.target.value);
    setCriticality(event.target.value);
  };

  const changeAppstatus = (event: ChangeEvent<{value: number}>) => {
    setAppstatus(event.target.value);
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const request = new UpdateApplicationRequest();
    request.setAppid(appId);
    request.setAppname(appname);
    request.setAppstatus(appstatus);
    request.setCriticalityid(criticality);
    request.setResponsiblepersonname(person);

    client.updateApplication(
      request,
      {},
      (err: Error, res: UpdateApplicationResponse) => {
        if (res.getSuccess()) {
          navigate('/');
        }
      }
    );
  };

  useEffect(() => {
    const appId = Number.parseInt(params.Id as string);
    if (isNaN(appId)) {
      navigate('/');
    }
    const request = new GetApplicationRequest();
    request.setAppid(appId);
    client.getApplication(
      request,
      {},
      (err: any, res: GetApplicationResponse) => {
        const app = res.getApp();
        if (!app) {
          navigate('/');
        }
        setAppid(appId);
        setAppname(app?.getAppname() as string);
        setCriticality(app?.getCriticalityid() as number);
        setPerson(app?.getResponsiblepersonname() as string);
        setAppstatus(app?.getAppstatus() as number);
        setLastUpdated(
          app
            ?.getLastupdated()
            ?.toDate()
            .toLocaleString()
            .replace(',', ' at') as string
        );
      }
    );
  }, []);

  return (
    <EditApplicationForm onSubmit={handleSubmit}>
      <Seperator>
        <AppNameLabel>Application Name: </AppNameLabel>
        <AppNameField value={appname} onChange={changeAppname} />
      </Seperator>
      <Seperator>
        <ResponsibleLabel>Person Responsible: </ResponsibleLabel>
        <ResponsibleField value={person} onChange={changePerson} />
      </Seperator>
      <Seperator>
        <AppStatusLabel>Application Status: </AppStatusLabel>
        <AppStatusField value={appstatus} onChange={changeAppstatus}>
          {Object.keys(AppStatusOptions).map(key => (
            <option key={key} value={AppStatusOptions[key].id}>
              {AppStatusOptions[key].name}
            </option>
          ))}
        </AppStatusField>
      </Seperator>
      <Seperator>
        <CriticalityLabel>Criticality: </CriticalityLabel>
        <CriticalityField value={criticality} onChange={changeCriticality}>
          {Object.keys(CriticalityOptions).map(key => (
            <option key={key} value={CriticalityOptions[key].id}>
              {CriticalityOptions[key].name}
            </option>
          ))}
        </CriticalityField>
      </Seperator>
      <Seperator>
        <LastUpdatedLabel>Last Updated:</LastUpdatedLabel>
        <LastUpdatedText>{lastUpdated}</LastUpdatedText>
      </Seperator>
      <Seperator>
        <SubmitEmptyDiv></SubmitEmptyDiv>
        <SubmitButton>Submit</SubmitButton>
      </Seperator>
    </EditApplicationForm>
  );
}

export default EditApplication;
