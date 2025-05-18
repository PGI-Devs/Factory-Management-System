import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutChart({ colors,labels, values, title, width, height }) {
  const data = {
    labels,
     datasets: [
      {
        data: values,
        backgroundColor: colors || [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
          labels: {
        font: {
          size: 9
          
        }
      }        ,
      display: true,           
      position: 'top',
    },
    title: {
      display: false,
      text: title || 'Chart.js Doughnut Chart',
    },
    tooltip: {                 
      enabled: true,  
    },
  },
};


  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
}

DoughnutChart.propTypes = {
  // labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
