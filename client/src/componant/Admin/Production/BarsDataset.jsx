// BarChart.js
import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Sample data (replace with your own)
const data = {
  labels: ['CNC', 'FEBRICATION', 'COLORING', 'FEBRICATION','FEBRICATION','CNC'],
  datasets: [
    {
      label: 'Count',
      data: [12, 19, 3, 5,14,67],
      backgroundColor: 'rgba(42, 168, 99, 0.6)',
      
      
      // backgroundColor: 'transparent',
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false, // This hides the label
    },
  },

  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawOnChartArea: false, // removes background grid lines
      },
       ticks: {
        stepSize: 10, // Y-axis steps of 10
        font: {
          size: 10,
        },
      }
    },
      x: {
      grid: {
        drawOnChartArea: false,
      },
       ticks: {
        font: {
          size: 5, // x-axis label font size
        },
      },
    },
  
  },
};

const BarChart = () => {
  return( 

    <div  style ={{height:'100px'}}className="barchart">

   <Bar data={data} options={options} />;
  </div>
  ) 
};

export default BarChart;
