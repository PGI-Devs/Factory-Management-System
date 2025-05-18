import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);



const PieChart = ({data,options}) => {

  const pieChartOptions = {
  plugins: {
    legend: {
      labels: {
        font: {
          size: 9 // Change legend label font size
          
        }
      }
    },
    tooltip: {
      bodyFont: {
        size: 10 // Change tooltip label font size
      },
      titleFont: {
        size: 16 // Change tooltip title font size
      }
    }
  }
};

  return (
    <>
      {/* <h3 style={{ textAlign: "center" }}>Static Pie Chart</h3> */}
      <Pie data={data}  options={pieChartOptions}/>
    </>
  );
};

export default PieChart;
