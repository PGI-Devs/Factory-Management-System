// TargetCard.js
import React from 'react';
import './targetcard.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Button, Typography } from "antd";
import BarChart from './BarsDataset';
import { MdAddLink, MdCloudCircle, MdDone } from 'react-icons/md';
import { AiFillClockCircle, AiOutlineClockCircle } from 'react-icons/ai';

const { Title } = Typography;

const TargetCard = ({ item }) => {
    return (
        <div className="card-wrapper">
            <div className="card-container">
                <div className="corner top-left" />
                <div className="corner top-right" >

                    <div
                        className="completedDiv"
                        style={{
                            backgroundColor: item?.status === 'done' ? '#12c52d' : '#ffc107', // green for done, yellow for others
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
                    <h2 className="card-title">Batch Id : {item.targetId}</h2>
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
                        <BarChart />
                    </div>
                    <div className="card-buttons">
                        {/* Future buttons can be added here */}
                        {/* <Button  type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>Approved</Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetCard;
