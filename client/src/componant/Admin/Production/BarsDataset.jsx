import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// dataset/department.js

export const dataset = [
  { department: 'CNC', count: 23 },
  { department: 'Fabrication', count: 14 },
  { department: 'Bending', count: 34 },
  { department: 'Testing', count: 18 },
];

export const valueFormatter = (value) => `${value} units`;

const chartSetting = {
  // yAxis: [{ label: 'Task Count', width: 70 }],
  height: 120,
};

export default function BarsDataset() {
  return (
    <BarChart
      width={150}   
  height={90} 
      dataset={dataset}
      xAxis={[{ dataKey: 'department' }]}
      series={[
        { dataKey: 'count', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
