import React from 'react'
import './stockAnalysis.css'
import StorAnalaticCard from './StorAnalaticSection'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import { StockAnalasysOptions } from '../../Navdata/dashboardNavData'
import { Flex, Progress, Select } from 'antd';
const StockAnalasis = () => {


  

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

  return (
    <>
      <div className="AnalasysComponant">

        <StorAnalaticCard />

        <div className='analysisSection'>

          <div className="analysisSection-head">
            <DashboardNavBar navOptions={StockAnalasysOptions} />
          </div>
          <div className=' analysis_section_contant_head'>
            <div><span>OverView</span></div>
             <Select
              className="custom-dark-select"
              style={{ width: '120px', borderColor: '#333', color: '#000',  colorBgBase: '#1677ff' }}
              options={Option}
              showSearch
              placeholder="Today"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}

            />
          </div>

          <div className="analysis_section_contant">

            <Flex vertical gap="small">
             Engine: <Progress percent={30} size={[300, 20]}  />
             Electronic: <Progress percent={50}  size={[300, 20]} status="active" />
             Chemical:<Progress percent={70}  size={[300, 20]} status="exception" />
             Battery: <Progress percent={60}  size={[300, 20]} />
             Fabrication: <Progress percent={80}  size={[300, 20]} />
             Steel: <Progress percent={70}  size={[300, 20]} />
            </Flex>
          </div>

        </div>
      </div>
    </>
  )
}

export default StockAnalasis