import React, { useState } from 'react'
import "./card1.css"
import { useNavigate } from 'react-router-dom';
import { AnimatePresence,  motion } from "framer-motion"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdClose } from 'react-icons/md';
import Chart from "react-apexcharts"
import { Typography } from "antd"
const { Title } = Typography;


const Card1 = (props) => {





    const [expanded, setExpanded] = useState()
    return (
        <AnimatePresence mode="wait">

            {
                expanded ? <ExpandedCard param={props} setExpanded={() => setExpanded(false)} /> : <CompactCard setExpanded={() => setExpanded(true)} param={props} />
            }

        </AnimatePresence>
    )
}


//ExpandedCard

function ExpandedCard({ param, setExpanded }) {
    const data = {
        options: {
            chart: {
                type: "area",
                height: "auto",
            },

            dropShadow: {
                enabled: false,
                enabledOnSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: "#000",
                opacity: 0.35,
            },

            fill: {
                colors: ["#fff"],
                type: "gradient",
            },
            dataLabels: {
                enabled: true, // <-- Very important
                style: {
                    colors: ["#00FF00"], // Green color
                    fontSize: '10px',    // (optional) make it nicer
                    //   fontWeight: 'bold',
                }
            },
            stroke: {
                curve: "smooth",
                colors: ["white"],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                // type: "datetime",
                categories: [

                    "Ready Unit",
                    "TESTING",
                    "CNC",
                    "COLORING",

                    //   "2018-09-19T00:00:00.000Z",
                    //   "2018-09-19T01:30:00.000Z",
                    //   "2018-09-19T02:30:00.000Z",
                    //   "2018-09-19T03:30:00.000Z",
                    //   "2018-09-19T04:30:00.000Z",
                    //   "2018-09-19T05:30:00.000Z",
                    //   "2018-09-19T06:30:00.000Z",
                ],
            },
        },
    };


    return (
        <motion.div className="ExpandedCard"
            style={
                {
                    background: param.color.backGround,
                    boxShadow: param.color.boxShadow
                }}
            //    layoutId="expandableCard"
            layout
            layoutId={param.title}
            transition={{
                type: "tween",          // Use tween for smooth transition
                duration: 0.3,          // Match duration for consistency
                ease: "easeInOut"       // Same easing for no bounce
            }}

        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
                <MdClose onClick={setExpanded}

                />
            </div>
            <span>
                {param.title}
            </span>

            <div className="chartContainer">
                <Chart series={param.series} type='area' options={data.options} />
            </div>
        </motion.div>
    )

}

//compact card

function CompactCard({ param, setExpanded }) {



console.log(param)

    const navigate = useNavigate()
    const NagigateToDetails = () => {
        navigate(`./details/${param.id}`)
    }



    const Png = param.png
    return (
        <motion.div  className="compactCard"
            style={
                {
                    // background: param.color.backGround,
                    // boxShadow: param.color.boxShadow
                }
            }
            layout
            layoutId={param.title}
            // onClick={setExpanded}
            onClick={NagigateToDetails}


            transition={{
                type: "tween",          // Use tween for both directions (no spring bounce)
                duration: 0.3,          // Set the same duration for both transitions
                ease: "easeInOut"       // Smooth easing for both expand and collapse
            }}
        >

            <div className="leftcard">
                <div className='cardhead'>

                    <h3>{param.title}</h3>
                    <span>27 more unit can build with existing stock</span>

                </div>
                <div className="radialbarhead">

                    <Title  level={5} style={{ textAlign: 'center',padding:'10px',margin:0,color:'white' }}>Stock</Title >
                    <div className="radialBar">
                        <CircularProgressbar
                            styles={{
                                path: {
                                    stroke: 'green', // Custom stroke color
                                    strokeWidth: 15, // Custom stroke width
                                    //   filter: 'drop-shadow(2px 4px 6px green)', 
                                }
                            }}
                            value={param.barValue1}
                            text={`${param.barValue1}%`}
                        />
                        <CircularProgressbar
                            value={param.barValue2}
                            text={`${param.barValue2}%`}
                            styles={{
                                path: {
                                    stroke: '#FFEB3B', // Golden Yellow stroke
                                    strokeWidth: 15, // Custom stroke width
                                    // filter: 'drop-shadow(2px 4px 6px #FF9800 )',
                                }
                            }}

                        />
                        <CircularProgressbar
                            value={param.barValue3}
                            text={`${param.barValue3}%`}
                            styles={{
                                path: {
                                    stroke: 'red', // Custom stroke color
                                    strokeWidth: 15, // Custom stroke width
                                    //   filter: 'drop-shadow(2px 4px 6px red)', // Custom shadow
                                }
                            }}
                        />

                    </div>
                </div>
            </div>
            <div className="details">
                <Png />
                <span className='span-head'>On Order<br /><span className='span-data'>4 items</span> </span>

                <span className='span-head' >Ready Unit<br /><span className='span-data'>7 items</span> </span>
                <span className='span-head' > 4hour more </span>
            </div>
        </motion.div>
    )
}

export default Card1