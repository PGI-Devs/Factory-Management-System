import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [20, 30, 10, 25, 15], // static values
//       backgroundColor: [
//         '#FF6384', // Red
//         '#FF9F40', // Orange
//         '#FFCD56', // Yellow
//         '#4BC0C0', // Green
//         '#36A2EB', // Blue
//       ],
//     },
//   ],
// };

const PieChart = ({data,options}) => {
  return (
    <div>
      {/* <h3 style={{ textAlign: "center" }}>Static Pie Chart</h3> */}
      <Pie data={data}  options={options}/>
    </div>
  );
};

export default PieChart;
