import React, { useState } from 'react';
import styled from 'styled-components';
import { Card as BCard } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell } from 'recharts';
import _ from 'lodash';

const pieData = [
  { name: 'Confirmed Case Exposure', value: 400 },
  { name: 'Potential Exposure', value: 300 },
  { name: 'Clear', value: 300 },
];

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

const Number = styled.h1`color: rgba(14, 103, 23, 0.5);`;

const SmallCard = ({ title, children }) => (
  <BCard className="text-center p-4">
    <div className="d-flex justify-content-center align-items-center">
      <h5 className="pr-3 m-0">{title}:</h5>
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

// const test = { "covid": [{ patient_id: 10, notes: "covid",  status: "Confirmed" }, { patient_id: 10, notes: "covid",  status: "Confirmed" }]};

const Overview = ({ staff, patients, rooms, infections }) => {
  // const confirmedCases = _.filter(infections, i => i.status === "Confirmed");
  // const suspectedCases = _.filter(infections, i => i.status === "Suspected");
  const cases = _.groupBy("notes");
  // const casesData = _.flow(
  //   _.groupBy("notes"),

  // )(infections);

  return (
    <div className="p-5">
      <div className="d-flex">
        <Card title="Suspsect vs. Confirmed Cases" className="mr-5">
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Suspect" stackId="a" fill="#8884d8" />
            <Bar dataKey="Confirmed" stackId="a" fill="#82ca9d" />
          </BarChart>
        </Card>
        <Card title="Staff Exposures">
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={110}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
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
      <Grid className="mt-5" cols="4" gap="3rem">
        <SmallCard title="Hospital Aquired Cases">30</SmallCard>
        <SmallCard title="Confirmed Cases">12</SmallCard>
        <SmallCard title="Ventilated Cases">45</SmallCard>
        <SmallCard title="Critical Cases">18</SmallCard>
      </Grid>
    </div>
  );
};


export default Overview;