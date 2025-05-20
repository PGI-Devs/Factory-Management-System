import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
export default function DoughnutChart({ doughnutdata, title, width, height }) {
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 9,
          },
        },
        display: true,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={doughnutdata} options={options} />;
}

DoughnutChart.propTypes = {
  doughnutdata: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
