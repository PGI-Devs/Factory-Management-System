import React from 'react'
import './targetcard.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import { Typography } from "antd"
import BarsDataset from './BarsDataset';
const { Title } = Typography;
const TargetCard = () => {
    return (
        <div className="card-wrapper">
            <div className="card-container">
                <div className="corner top-left" />
                <div className="corner top-right" />
                <div className="corner bottom-left" />
                <div className="corner bottom-right" />
                <div className="card-content">
                    <div className="date-label">
                        14th April 2024 - Present
                    </div>
                    <h2 className="card-title">Batch No : #0kv-340</h2>
                    <h3 className="card-subtitle">Item : 30kv</h3>
                    <h3 className="card-subtitle">Item Count : 7unit</h3>
                    <div className="card-description">
                        <div className="CircularProgressSection">
                           
                            <div className='CircularProgress'>
                                <CircularProgressbar
                                    styles={{
                                        path: {
                                            stroke: 'green', // Custom stroke color
                                            strokeWidth: 15, // Custom stroke width
                                            //   filter: 'drop-shadow(2px 4px 6px green)', 
                                        }
                                    }}
                                    value={80}
                                    text={`80%`}
                                /></div>
                                 <Title level={5} >Ready</Title >
                          
                        </div>
                        <div className="CircularProgressSection">
                         
                            <div className='CircularProgress'>
                                <CircularProgressbar
                                    styles={{
                                        path: {
                                            stroke: 'yellow', // Custom stroke color
                                            strokeWidth: 15, // Custom stroke width
                                            //   filter: 'drop-shadow(2px 4px 6px green)', 
                                        }
                                    }}
                                    value={10}
                                    text={`10%`}
                                /></div>
                                   <Title level={5} >Processing</Title >
                          
                        </div>
                        <div className="CircularProgressSection">
                         
                            <div className='CircularProgress'>
                                <CircularProgressbar
                                    styles={{
                                        path: {
                                            stroke: 'yellow', // Custom stroke color
                                            strokeWidth: 15, // Custom stroke width
                                            //   filter: 'drop-shadow(2px 4px 6px green)', 
                                        }
                                    }}
                                    value={10}
                                    text={`10%`}
                                /></div>
                                   <Title level={5} >Testing</Title >
                           
                        </div>
                    </div>
                    <div className="card-tags">
                        {/* <span className="tag">Tag 1</span>
                        <span className="tag">Tag 2</span>
                        <span className="tag">Tag 3</span> */}

                        <BarsDataset/>
                    </div>
                    <div className="card-buttons">
                        <a href="#" className="button-primary group">
                            Details
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1={10} y1={14} x2={21} y2={3} />
                            </svg>
                        </a>
                        <a href="#" className="button-secondary group">
                            Certificate
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <circle cx={12} cy={8} r={7} />
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetCard;
