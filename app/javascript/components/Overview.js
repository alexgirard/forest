import React from 'react';
import styled from 'styled-components';
import { Card as BCard, Alert } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell } from 'recharts';
import _ from 'lodash';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: 'Page A', Confirmed: 4000, Suspect: 2400 },
  { name: 'Page B', Confirmed: 3000, Suspect: 1398 },
  { name: 'Page C', Confirmed: 2000, Suspect: 9800 },
  { name: 'Page D', Confirmed: 2780, Suspect: 3908 },
  { name: 'Page E', Confirmed: 1890, Suspect: 4800 },
  { name: 'Page F', Confirmed: 2390, Suspect: 3800 },
  { name: 'Page G', Confirmed: 3490, Suspect: 4300 },
];


const Grid = styled.div`
  display: grid;
  grid-column-gap: ${props => props.gap || "2rem"};
  grid-row-gap: ${props => props.gap || "2rem"};
  grid-template-columns: repeat(${props => props.cols || 2}, minmax(0, 1fr));
  height: fit-content;
`;

const Card = ({ title, children, className }) => (
  <BCard className={`text-center p-4 ${className}`}>
    <h4 className="pb-3">{title}</h4>
    <div>{children}</div>
  </BCard>
);

const Number = styled.h1`
  font-size: 4rem;
  color: rgba(14, 103, 23, 0.5);
`;

const SmallCard = ({ title, children }) => (
  <BCard className="text-center p-4">
    <div className="d-flex justify-content-center align-items-center">
      <h4 className="pr-3 m-0">{title}:</h4>
      <Number>{children}</Number>
    </div>
  </BCard>
);

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

const test = [
  { patient_id: 10, notes: "covid",       status: "Confirmed", hai: "No" },
  { patient_id: 10, notes: "covid",       status: "Confirmed", hai: "Yes" },
  { patient_id: 10, notes: "covid",       status: "Suspected", hai: "Unknown" },
  { patient_id: 10, notes: "chickenpox",  status: "Confirmed", hai: "Yes" },
  { patient_id: 10, notes: "chickenpox",  status: "Confirmed", hai: "Unknown" },
  { patient_id: 10, notes: "chickenpox",  status: "Suspected", hai: "Yes" },
  { patient_id: 10, notes: "ebola",       status: "Confirmed", hai: "No" },
  { patient_id: 10, notes: "ebola",       status: "Suspected", hai: "No" },
  { patient_id: 10, notes: "ebola",       status: "Suspected", hai: "No" },
  { patient_id: 10, notes: "ebola",       status: "Suspected", hai: "No" },
  { patient_id: 10, notes: "ebola",       status: "Suspected", hai: "No" },
  { patient_id: 10, notes: "ebola",       status: "Suspected", hai: "Yes" },
];

const test2 = [
  { badge: 10, exposure: "Confirmed" },
  { badge: 10, exposure: "Suspected" },
  { badge: 10, exposure: "None" },
  { badge: 10, exposure: "Suspected" },
  { badge: 10, exposure: "Suspected" },
];

const HaiAlert = ({ name, percent, cutoffHai }) => (
  <Alert variant="danger" className="text-center">
    Over {cutoffHai}% of all {name} cases have have been confirmed or potentially acquired in hospital (currently at {percent.toFixed(0)}% HAI cases). Consider unit having an outbreak.
  </Alert>
);

const getBarGraphData = infectionInfo => {
  const cases = _.groupBy(infectionInfo, "notes");
  const confirmed = _.mapValues(cases, info => _.size(_.filter(info, i => i.status == "Confirmed")));
  const suspected = _.mapValues(cases, info => _.size(_.filter(info, i => i.status == "Suspected")));
  return _.map(cases, (value, key) => ({ name: key, Confirmed: confirmed[key], Suspected: suspected[key] }));
};

const getHaiData = infectionInfo => {
  const cases = _.groupBy(infectionInfo, "notes");
  const haiData = _.mapValues(cases, info => _.size(_.filter(info, i => i.hai == "Yes" || i.hai == "Unknown")));
  return _.map(cases, (value, key) => ({ name: key, percent: (haiData[key] /_.size(cases[key])*100), cases: _.size(cases[key]) }));
};

const getStaffData = staffInfo => {
  const confirmed = _.size(_.filter(staffInfo, s => s.exposure == "Confirmed"));
  const suspected = _.size(_.filter(staffInfo, s => s.exposure == "Suspected"));
  return ([
    { name: 'Confirmed Case Exposure', value: confirmed },
    { name: 'Potential Case Exposure', value: suspected },
    { name: 'Clear', value: (_.size(staffInfo) - confirmed - suspected) },
  ]);
};

const Overview = ({ staff, patients, rooms, infections }) => {
  // change to infections
  const infectionInfo = test;
  const bargraphData = getBarGraphData(infectionInfo);
  const piegraphData = getStaffData(test2);
  
  const hai = getHaiData(infectionInfo);
  const totalHai = _.sumBy(hai, i => i.cases);
  const cutoffHai = 20;

  const confirmedInfected = (_.sumBy(bargraphData, i => i.Confirmed) / _.size(infectionInfo) * 100).toFixed(0);
  const suspectedInfected = (_.sumBy(bargraphData, i => i.Suspected) / _.size(infectionInfo) * 100).toFixed(0);

  return (
    <div className="py-4 px-5">
      <Grid className="mb-2" cols="1" gap="0.5">
        {_.map(hai, i => i.percent > cutoffHai  ? <HaiAlert {...i} cutoffHai={cutoffHai} /> : null)}
      </Grid>
      <div className="d-flex">
        <Card title="Suspsected vs. Confirmed Cases" className="mr-4">
          <BarChart
            width={800}
            height={350}
            data={bargraphData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Suspected" stackId="a" fill="#8884d8" />
            <Bar dataKey="Confirmed" stackId="a" fill="#82ca9d" />
          </BarChart>
        </Card>
        <Card title="Staff Exposures">
          <PieChart width={400} height={350}>
            <Pie
              data={piegraphData}
              cx={200}
              cy={130}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>
      </div>
      <Grid className="mt-4" cols="3" gap="1.5rem">
        <SmallCard title="Hospital Aquired Infection Cases (HAI)">{totalHai}</SmallCard>
        <SmallCard title="Confirmed Infectous Patients Percentage">{confirmedInfected}%</SmallCard>
        <SmallCard title="Suspected Infectous Patients Percentage">{suspectedInfected}%</SmallCard>
      </Grid>
    </div>
  );
};


export default Overview;