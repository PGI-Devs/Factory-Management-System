// BarChart.js
import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const emptyChart = {
  labels: [],
  datasets: [],
};

const BarChart = ({ data = emptyChart, options = {} }) => (
  // <div >
    <Bar data={data} options={options} />
  // </div>
);

export default BarChart;
