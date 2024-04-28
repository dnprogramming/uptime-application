// @ts-nocheck
import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {CriticalityOptions} from '../../enum/criticalityEnum';
import {ReportClient} from '../../generated/ReportServiceClientPb';
import {useNavigate} from 'react-router-dom';
import {
  AddApplicationRequest,
  AddApplicationResponse,
} from '../../generated/report_pb';
import ProxyHost from '../../utility/utility';

const AddApplicationForm = styled.form`
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
const HostsLabel = styled.label`
  width: 25vw;
  text-align: right;
`;
const HostsField = styled.textarea`
  width: 25vw;
`;
const SubmitEmptyDiv = styled.div`
  width: 25vw;
`;
const SubmitButton = styled.button`
  text-align: center;
  padding: 1rem;
  justify-content: center;
  align-items: start;
`;
function AddApplication() {
  const [appname, setAppname] = useState('');
  const [person, setPerson] = useState('');
  const [criticality, setCriticality] = useState(1);
  const [hosts, setHosts] = useState('');
  const client = new ReportClient(ProxyHost, null, {});
  const navigate = useNavigate();

  const changeAppname = (event: ChangeEvent<{value: string}>) => {
    setAppname(event.target.value);
  };

  const changePerson = (event: ChangeEvent<{value: string}>) => {
    setPerson(event.target.value);
  };

  const changeCriticality = (event: ChangeEvent<{value: number}>) => {
    setCriticality(event.target.value);
  };

  const changeHosts = (event: ChangeEvent<{value: string}>) => {
    setHosts(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const addApplicationReq = new AddApplicationRequest();
    addApplicationReq.setAppname(appname);
    addApplicationReq.setCriticalityid(criticality);
    addApplicationReq.setResponsiblepersonname(person);
    addApplicationReq.setHostnameList(hosts.split(/\n/));

    client.addApplication(
      addApplicationReq,
      {},
      (err: Error, res: AddApplicationResponse) => {
        if (res.getSuccess()) {
          navigate('/');
        }
      }
    );
  };
  return (
    <AddApplicationForm onSubmit={handleSubmit}>
      <Seperator>
        <AppNameLabel>Application Name: </AppNameLabel>
        <AppNameField type="text" onChange={changeAppname} required />
      </Seperator>
      <Seperator>
        <ResponsibleLabel>Person Responsible: </ResponsibleLabel>
        <ResponsibleField type="text" onChange={changePerson} required />
      </Seperator>
      <Seperator>
        <CriticalityLabel>Criticality: </CriticalityLabel>
        <CriticalityField onChange={changeCriticality}>
          {Object.keys(CriticalityOptions).map(key => (
            <option key={key} value={CriticalityOptions[key].id}>
              {CriticalityOptions[key].name}
            </option>
          ))}
        </CriticalityField>
      </Seperator>
      <Seperator>
        <HostsLabel>Hosts: </HostsLabel>
        <HostsField onChange={changeHosts} required></HostsField>
      </Seperator>
      <Seperator>
        <SubmitEmptyDiv></SubmitEmptyDiv>
        <SubmitButton>Submit</SubmitButton>
      </Seperator>
    </AddApplicationForm>
  );
}

export default AddApplication;
