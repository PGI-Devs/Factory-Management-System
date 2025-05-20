// TargetCard.js
import React from 'react';
import './targetcard.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Button, Typography } from "antd";
import BarChart from './BarChart';
import { MdAddLink, MdCloudCircle, MdDone } from 'react-icons/md';
import { AiFillClockCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const TargetCard = ({ item }) => {


const data = {
  labels: ['CNC', 'FEBRICATION', 'COLORING', 'FEBRICATION','FEBRICATION','CNC'],
  datasets: [
    {
      label: 'Count',
      data: [12, 19, 3, 5,14,67],
      // backgroundColor: '#a78bfa',
      backgroundColor: 'rgba(255, 0, 0, 0.6)',
      
      
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




    return (
                      <Link to={`/production/target/${item.targetId}`} className='targetcardlink' key={item.targetId}>
        
        <div className="card-wrapper">
            <div className="card-container">
                <div className="corner top-left" />
                <div className="corner top-right" >

                    <div
                        className="completedDiv"
                        style={{
                            backgroundColor:
                                item?.status === 'done'
                                    ? '#12c52d'
                                    : item?.status === 'processing'
                                        ? '#ffc107'
                                        : item?.status === 'Line up'
                                            ? '#ff6347'
                                            : '#ccc', // fallback color
                        }}

                    >
                        {item?.status === 'done' ? (
                            <span><MdDone /> {item.status}</span>
                        ) : (
                            <span><AiOutlineClockCircle /> {item.status}</span>
                        )}
                        <br />
                        <span>{item.doneDate || '12-05-2025'}</span>
                    </div>



                </div>
                <div className="corner bottom-left" />
                <div className="corner bottom-right" />
                <div className="card-content">
                    <div className="date-label">
                        {item.startDate}
                    </div>
                    <h2 className="card-title">Target Id : {item.targetId}</h2>
                    <h3 className="card-subtitle">Unit Name : {item.unitName}</h3>
                    <h3 className="card-subtitle">Target : {item.targetBatch} Batch</h3>
                    <div className="card-description">
                        {[
                            { label: 'Ready', value: item.progressData.ready, color: 'green' },
                            { label: 'Processing', value: item.progressData.processing, color: 'yellow' },
                            { label: 'Testing', value: item.progressData.testing, color: 'orange' },
                        ].map((section, index) => (
                            <div key={index} className="CircularProgressSection">
                                <div className='CircularProgress'>
                                    <CircularProgressbar
                                        styles={{
                                            path: {
                                                stroke: section.color,
                                                strokeWidth: 15,

                                            },

                                        }}
                                        value={section.value}
                                        text={`${section.value}%`}
                                    />
                                </div>
                                <Title level={5}>{section.label}</Title>
                            </div>
                        ))}
                    </div>
                    <div className="card-tags">
                        <BarChart options={options} data={data}/>
                    </div>
                    <div className="card-buttons">
                        {/* Future buttons can be added here */}
                        {/* <Button  type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>Approved</Button> */}
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default TargetCard;
