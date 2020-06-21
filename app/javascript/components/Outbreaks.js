import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Form, Container, ProgressBar, Table } from 'react-bootstrap';

const Grid = styled.div`
  display: grid;
  grid-column-gap: ${props => props.gap || "2rem"};
  grid-row-gap: ${props => props.gap || "2rem"};
  grid-template-columns: repeat(${props => props.cols || 2}, minmax(0, 1fr));
  height: fit-content;
`;

const Radio = styled(Card)`
  color: rgba(0,0,0,0.4);
  cursor: pointer;

  :hover {
    background-color: rgba(14, 103, 23, 0.2);
    color: rgba(14, 103, 23, 0.5);
  }
`;

const Progress = styled(ProgressBar)`
  margin-bottom: 2rem;

  .progress-bar {
    background-color: rgba(14, 103, 23, 0.5);
  }
`;

const StyledButton = styled.button`
  unset: all;
  padding: 0.5rem 1rem;
  background-color: rgba(14, 103, 23, 0.2);
  border: none;
  color: rgba(14, 103, 23, 0.5);
  border-radius: 40px;
  width: min-content;
  white-space: nowrap;

  :focus {
    outline: none;
  }
`;

const StyledTable = styled(Table)`
  th {
    background-color: rgba(14, 103, 23, 0.2);
    font-weight: 500;
  }
`;

const RadioBtn = ({ value, updateField, nextStep, children }) => (
  <Radio onClick={() => { updateField(value); nextStep(); }}>
    {children}
  </Radio>
);

const StepTemplate = ({ desc, btns, ...props }) => (
  <>
    <h5 className="mb-4">{desc}</h5>
    <Grid cols={btns.length} className="m-auto">
      {btns.map(({ icon, name }) => (
        <RadioBtn {...props} value={name}>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <i className={`pb-3 fa ${icon} fa-5x mr-2`} />
            <h4>{name}</h4>
          </Card.Body>
        </RadioBtn>
      ))}
    </Grid>
  </>
);


const StatusStep = props => (
  <StepTemplate
    desc="Is infection confirmed or suspected?"
    btns={[
      { icon: "fa-check", name: "Confirmed" },
      { icon: "fa-search", name: "Suspected" },
    ]}
    {...props}
  />
);

const HaiStep = props => (
  <StepTemplate
    desc="Is this infection a hospital acquired?"
    btns={[
      { icon: "fa-check", name: "Yes" },
      { icon: "fa-times", name: "No" },
      { icon: "fa-question", name: "Unknown" },
    ]}
    {...props}
  />
);

const PatientStep = ({ nextStep, updateField }) => (
  <>
    <h5 className="mb-4">What is the patient's hospital id?</h5>
    <Container>
      <Form.Control type="text" placeholder="patient id" onChange={event => updateField(event.target.value)} />
      <StyledButton className="my-4 w-auto" onClick={() => nextStep()}>Next step</StyledButton>
    </Container>
  </>
);

const NotifyStep = ({ submitInfection, nextStep, updateField, staffInfections}) => {
  const [period, updatePeriod] = useState(null);
  const [showResults, updateShow] = useState(false);
  
  const handleNextClick = () => {
    submitInfection(period);
    updateShow(true);
  }

  const data = Array.from(staffInfections);

  return (
    <>
      <h5 className="mb-4">Please enter the desired incubation period (in days).</h5>
      <Container>
        <Form.Control type="text" placeholder="Incubation period" onChange={event => updatePeriod(event.target.value)} />
        <StyledButton className="my-4 w-auto" onClick={() => handleNextClick()}>Next</StyledButton>
      </Container>
      {showResults && (
        <>
          <Container>
            <h5 className="my-4">Below are the staff members that have come in contact with this patient within the specified incubation period. Click 'Send notification' to inform them.</h5>
            <StyledTable striped bordered hover>
              <thead>
                <tr>
                  <th>Badge #</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.map(s => (
                  <tr key={s.id}>
                    <td>{`${s.badge}`}</td>
                    <td>{`${s.first_name}`}</td>
                    <td>{`${s.last_name}`}</td>
                    <td>{`${s.email}`}</td>
                    <td>{`${s.phone}`}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
            <StyledButton className="my-4 w-auto" onClick={() => nextStep()}>Send notification</StyledButton>
          </Container>
        </>
      )}
    </>
  );
};

const ThanksStep = ({ nextStep }) => (
  <>
    <h5 className="mb-4">Sent!</h5>
    <Container>
      <i className="pb-3 fa fa-paper-plane fa-5x mr-2" />
      <br />
      <StyledButton className="my-3 w-auto" onClick={() => nextStep()}>Log another infection</StyledButton>
    </Container>
  </>
);


const steps = ["status", "hai", "patient", "notify", "thanks"];

const StepContent = ({ curStep, ...props }) => {
  switch(curStep) {
    case 0:
      return <StatusStep {...props} />
    case 1:
      return <HaiStep {...props} />
    case 2:
      return <PatientStep {...props} />
    case 3:
      return <NotifyStep {...props} />
    default:
      return <ThanksStep {...props} />
  }
}

const Outbreaks = ({ }) => {
  const [curStep, changeStep] = useState(0);
  const [info, updateInfo] = useState({});
  const [staffInfections, updateInfections] = useState({staff: {name: "steve"}});
  
  const nextStep = () => {
    if (info.status != "Confirmed" & curStep == 2) {
      changeStep(4);
    } else if (curStep == steps.length) {
      changeStep(0);
    } else {
      changeStep(curStep + 1);
    }
  }
  const back = () => changeStep(curStep - 1);
  const updateField = value => updateInfo({ ...info, [steps[curStep]]: value });

  const submitInfection = (period) => {
    const temp = {...info,period: period}
    var body = {infection: {
      hai: temp.hai,
      status: temp.status,
      patient_id: temp.patient,
      incubation: temp.period,
    }}
    var token = document.getElementsByName('csrf-token')[0].content
    fetch('http://localhost:3000/infections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    }).then((response) => {return response.json()}).then(data => {
      updateInfections(data);
    })
  }

  return (
    <div className="p-5 mt-5 d-flex flex-column justfiy-content-center text-center">
      <Progress now={((curStep+1)/steps.length) * 100} />
      <StepContent curStep={curStep} nextStep={nextStep} updateField={updateField} submitInfection={submitInfection} staffInfections={staffInfections}/>
      {curStep != 0 && curStep != 3 && curStep != 4 && <StyledButton className="my-4 d-block" onClick={() => back()}> ← Back</StyledButton>}
    </div>
  );
};

export default Outbreaks;