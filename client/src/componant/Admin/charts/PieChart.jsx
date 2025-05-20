import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);



const PieChart = ({data,title}) => {


  
  const pieChartOptions = {
  plugins: {
    legend: {
       position: 'bottom',
      labels: {
        font: {
          size: 9
          
        }
        
      }
    },
       title: {
        display: !!title,
        text: title,
      },
    tooltip: {
      bodyFont: {
        size: 10 ,
      },
      titleFont: {
        size: 16 
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
