import React from 'react'
import { Flex, Progress, Typography } from 'antd';
import "./storAnalatic.css"
import {  MdOutlineArrowCircleUp } from 'react-icons/md';
import { AiOutlineBarChart} from 'react-icons/ai';

import { Select } from 'antd';

const { Text } = Typography;

const StorAnalaticCard = () => {
  // const getStepColors = (steps, percent, fillColor = green[6], emptyColor = '') => {
  //   const filledSteps = Math.round((percent / 100) * steps);
  //   return Array.from({ length: steps }, (_, i) =>
  //     i < filledSteps ? fillColor : emptyColor
  //   );
  // };


  const stock = [
    {
      heading: "Total Stock",
      percent: 70,
      strokeColor: 'green'
    },
    {
      heading: "Available Stock",
      percent: 50,
      strokeColor: 'green'
    },
    {
      heading: "Yellow Stock",
      percent: 70,
      strokeColor: 'yellow'
    },
    {
      heading: "Low Stock",
      percent: 10,
      strokeColor: 'red'
    },
    {
      heading: "Ready Product",
      percent: 10,
      strokeColor: 'red'
    },
    {
      heading: "On Production",
      percent: 10,
      strokeColor: 'red'
    },
    // {
    //   heading: "Ready Unit",
    //   percent: 100,
    //   strokeColor: 'red',
    //   unitCount: 30
    // },

  ]



  const steps = 30;
  return (
    <>

      <div className='analaticCards'>
        {stock && stock.map((item, id) => (
          <div key={id} className='analaticard'>
            <div className='analaticCardleft'>
              <div className="analaticHeader">
                <div><Text lavel={3} style={{ padding: '5px', color: 'black' }} >{item.heading}</Text> </div>


              </div>
              <div className="dotedChart" style={{ display: 'flex'}}>
                <Flex gap="small" vertical  >
                  {/* {progressValues.map((item, index) => ( */}
                  <Progress
                    key={id}
                    trailColor="lightgray"

                    percent={item.percent}
                    steps={steps}
                    strokeWidth={12}
                    strokeColor={item.strokeColor}
                    type="dashboard"
                    showInfo
                    gapDegree={180}
                    gapPosition="bottom"
                    style={{ transform: 'rotate(360deg)' }}
                  />
                  {/* ))} */}
                </Flex>
                {/* <div>
              <h3>{item.unitCount}</h3>

            </div> */}
              </div>
            </div>
            <div className='analaticCardRight'>
              <Text lavel={8}>Total Iteams</Text>
              <span>40 <span id='percenbox'><MdOutlineArrowCircleUp />12% </span> </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )

}



const onChange = value => {
  console.log(`selected ${value}`);
};
const onSearch = value => {
  console.log('search:', value);
};


const Option =
  [
    {
      value: 'Today',
      label: 'today_date',
    },
    {
      value: 'YesterDay',
      label: 'Lucy',
    },
    {
      value: 'Last week',
      label: 'last_week',
    },
  ]

const StockCards = () => {
  return (
    <>
      <div className='analaticComponant'>
        <div className="analaticComponantHeader">
          <h3 className='h3Header'> <AiOutlineBarChart /> Store Analatic</h3>
          <div>
            <Select
              style={{ width: '200px', colorBgBase: '#1677ff' }}
              options={Option}
              showSearch
              placeholder="Today"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}

            />
          </div>

        </div>


        <StorAnalaticCard />
      </div>
    </>
  )
}

export default StockCards