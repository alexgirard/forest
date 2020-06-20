import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Form, Container } from 'react-bootstrap';

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

const StyledButton = styled.button`
  unset: all;
  padding: 0.5rem 1rem;
  background-color: rgba(14, 103, 23, 0.2);
  border: none;
  color: rgba(14, 103, 23, 0.5);
  border-radius: 40px;

  :focus {
    outline: none;
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
    desc="Please select if the case is confirmed or suspected to continue."
    btns={[
      { icon: "fa-check", name: "Confirmed" },
      { icon: "fa-search", name: "Suspected" },
    ]}
    {...props}
  />
);

const HaiStep = props => (
  <StepTemplate
    desc="Was this a hospital acquired infection(HAI)?"
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
    <h5 className="mb-4">Please enter the patient id.</h5>
    <Container>
      <Form.Control type="text" placeholder="patient id" onChange={event => updateField(event.target.value)} />
      <StyledButton className="my-4 w-auto" onClick={() => nextStep()}>Next step</StyledButton>
    </Container>
  </>
);

const NotifyStep = ({ nextStep, updateField }) => {
  const [period, updatePeriod] = useState(null);
  const [showResults, updateShow] = useState(false);

  return (
    <>
      <h5 className="mb-4">Please enter the desired incubation period.</h5>
      <Container>
        <Form.Control type="text" placeholder="Incubation period" onChange={event => updatePeriod(event.target.value)} />
        <StyledButton className="my-4 w-auto" onClick={() => updateShow(true)}>Next</StyledButton>
      </Container>
      {showResults && (
        <>
          <Container>
            <h5 className="my-4">Below are the staff members that have come in contact with this patient within the specified incubation period. By clicking next we will notify them that they have come in contact.</h5>
            <p>[table here]</p>
            <StyledButton className="my-4 w-auto" onClick={() => { updateField(true); nextStep(); }}>Send notifications</StyledButton>
          </Container>
        </>
      )}
    </>
  );
};

const ThanksStep = ({ nextStep }) => (
  <>
    <h5 className="mb-4">Thank you!</h5>
    <Container>
      <i className="pb-3 fa fa-paper-plane fa-5x mr-2" />
      <br />
      <StyledButton className="my-3 w-auto" onClick={() => nextStep()}>Back to outbreak registration</StyledButton>
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
  
  const nextStep = () => {
    if (info.status != "Confirmed" & curStep == 2) {
      changeStep(4);
    } else if (curStep == steps.length) {
      changeStep(0);
    } else {
      changeStep(curStep + 1);
    }
  }
  const updateField = value => updateInfo({ ...info, [steps[curStep]]: value });
  
  return (
    <div className="p-5 mt-5 d-flex flex-column justfiy-content-center text-center">
      <StepContent curStep={curStep} nextStep={nextStep} updateField={updateField} />
    </div>
  );
};

export default Outbreaks;