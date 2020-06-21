import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, Form, FormControl, Container, ProgressBar, Button, Table } from 'react-bootstrap';

const steps = ["type", "patient", "status", "hai", "notify", "send", "thanks"];

const Grid = styled.div`
  display: grid;
  grid-column-gap: ${props => props.gap || "2rem"};
  grid-row-gap: ${props => props.gap || "2rem"};
  grid-template-columns: repeat(${props => props.cols || 2}, minmax(0, 1fr));
  height: fit-content;
`;

const Radio = styled(Card)`
  color: ${props => props.selected ? "rgba(14, 103, 23, 0.5)" : "rgba(0,0,0,0.4)"};
  background-color: ${props => props.selected ? "rgba(14, 103, 23, 0.2)" : "none"};
  cursor: pointer;

  :hover {
    background-color: rgba(14, 103, 23, 0.2);
    color: rgba(14, 103, 23, 0.5);
  }
`;

const Progress = styled(ProgressBar)`
  margin-bottom: 4rem;

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

const RadioBtn = ({ value, updateField, nextStep, children, info, curStep }) => {
  console.log(info, curStep, steps[curStep], _.get(info, steps[curStep]));
  return (
  <Radio selected={_.get(info, steps[curStep]) == value} onClick={() => { updateField(value); nextStep(); }}>
    {children}
  </Radio>
);
  };

const StepTemplate = ({ desc, btns, back, ...props }) => (
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
    <StyledButton className="my-5 d-block" onClick={() => back()}> ← Back</StyledButton>
  </>
);


const StatusStep = props => (
  <StepTemplate
    desc="Please select if the case is confirmed or suspected."
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

const PatientStep = ({ nextStep, updateField, back, info, curStep }) => (
  <>
    <h5 className="mb-4">What is the patient's hospital id?</h5>
    <Container>
      <Form.Control type="text" placeholder="patient id" defaultValue={info[steps[curStep]]} onChange={event => updateField(event.target.value)} />
    </Container>
    <div className="d-flex mt-5 justify-content-between">
      <StyledButton className="my-4 d-block" onClick={() => back()}> ← Back</StyledButton>
      <StyledButton className="my-4 w-auto" onClick={() => nextStep()}>Next →</StyledButton>
    </div>
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
        <StyledButton className="my-4 w-auto" onClick={() => handleNextClick()}>Contact Trace</StyledButton>
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

const EmailStep = ({ nextStep }) => (
  <>
    <h5 className="mb-4">Here is a template to notify the staff of a potential exposure. Edit the text below then click send.</h5>
    <Container>
      <Form.Control
        as="textarea"
        rows="6"
        defaultValue="Hi there,&#013;&#013;Please note that your name has been flagged for potential exposure to a patient with a condition that requires follow up.  Please call Occupational Health at x55555 at your earliest available opportunity.&#013;&#013;Thank you."
      />
      <StyledButton className="my-3 w-auto" onClick={() => nextStep()}>Send Email</StyledButton>
    </Container>
  </>
);


const ThanksStep = ({ nextStep, clearInfo }) => (
  <>
    <h5 className="mb-4">Sent!</h5>
    <Container>
      <i className="pb-3 fa fa-paper-plane fa-5x mr-2" />
      <br />
      <StyledButton className="my-3 w-auto" onClick={() => { clearInfo(); nextStep(); }}>Log another infection</StyledButton>
    </Container>
  </>
);

const Pill = styled(Button)`
  margin-left: 1rem;
  color: rgba(14,103,23,0.9);
  border-color: rgba(14,103,23,0.9);
  :hover {
    color: rgba(14,103,23,0.9);
    background-color: rgba(14,103,23,0.2);
    border-color: rgba(14,103,23,0.9);
  }
`;

const TypeStep = ({ nextStep, updateField, infections, info, curStep }) => {
  const [infection, updateInfection] = useState(null);
  
  const currentInfections = _.filter(_.keys(_.groupBy(infections, "notes"), k => k != "null"));
  const items = _.uniq([ "Covid-19", "Chickenpox", ...currentInfections ]);
  const buttons = items.map(i => <Pill onClick={() => updateInfection(i)} variant="outline-primary">{i}</Pill>)
  
  return (
    <>
      <h5 className="mb-4">Please select/enter the name of the infection to begin.</h5>
      <Container className="d-flex flex-column justify-content-center">
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => { updateInfection(e.target.value) }}
          value={infection}
          defaultValue={info[steps[curStep]]}
        />
        <div className="d-flex">
          {buttons.filter((child) => !infection || child.props.children.toLowerCase().startsWith(infection.toLowerCase()))}
        </div>
      </Container>
      <div className="d-flex mt-5 justify-content-end">
        <StyledButton className="my-4 w-auto" onClick={() => { updateField(infection); nextStep(); }}>Next →</StyledButton>
      </div>
    </>
  );
};

const StepContent = props => {
  switch(props.curStep) {
    case 0:
      return <TypeStep {...props} />
    case 1:
      return <PatientStep {...props} />
    case 2:
      return <StatusStep {...props} />
    case 3:
      return <HaiStep {...props} />
    case 4:
      return <NotifyStep {...props} />
    case 5:
      return <EmailStep {...props} />
    default:
      return <ThanksStep {...props} />
  }
}

const Outbreaks = ({ infections }) => {
  const [curStep, changeStep] = useState(0);
  const [info, updateInfo] = useState({});
  const [staffInfections, updateInfections] = useState({staff: {name: "steve"}});
  
  const nextStep = () => {
    if (info.status != "Confirmed" & curStep == 4) {
      changeStep(6);
    } else if (curStep == steps.length - 1) {
      changeStep(0);
    } else {
      changeStep(curStep + 1);
    }
  }
  const back = () => changeStep(curStep - 1);
  const updateField = value => updateInfo({ ...info, [steps[curStep]]: value });
  const clearInfo = () => updateInfo({});

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
    <Container>
      <div className="p-5 mt-5 d-flex flex-column justfiy-content-center text-center">
        <Progress now={((curStep+1)/steps.length) * 100} />
        <StepContent
          curStep={curStep}
          nextStep={nextStep}
          updateField={updateField}
          clearInfo={clearInfo}
          submitInfection={submitInfection}
          staffInfections={staffInfections}
          infections={infections}
          back={back}
          info={info}
        />
      </div>
    </Container>
  );
};

export default Outbreaks;