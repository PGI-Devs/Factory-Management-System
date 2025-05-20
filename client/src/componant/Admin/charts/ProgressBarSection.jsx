import React from 'react'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import { Flex, Progress, Select } from 'antd'

const ProgressBarSection = ({activeNav,HandelNavClick,StockAnalasysOptions,Option,graphOption}) => {

    
    
      const onChange = value => {
        console.log(`selected ${value}`);
      };
      const onSearch = value => {
        console.log('search:', value);
      };
    
  return (
    <div className='progress_bar_analysisSection'>

          <div className="analysisSection-head">
            <DashboardNavBar activeNav={activeNav} onNavClick={HandelNavClick} navOptions={StockAnalasysOptions} />
          </div>
          <div className=' analysis_section_contant_head'>
            <div><span style={{color:'gray'}}>Overview</span></div>
            <Select
              className="custom-dark-select"
              style={{ width: '120px', borderColor: '#333', color: '#000', colorBgBase: '#1677ff' }}
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

              {graphOption && graphOption.map((item) =>

                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <span> {item.heading}</span>
                    {/* <span>{item.count}</span> */}
                  </div>
                  <Progress
                    className='custom-progress'
                    percent={item.percent}
                    size={[300, 25]}
                    format={percent => `${percent}%`}
                    strokeColor={
                      item.percent < 30
                        ? '#ff4d4f'     // red for low
                        : item.percent < 70
                          ? '#faad14'     // orange/yellow for medium
                          : '#52c41a'     // green for high
                    }
                  />

                </div>

              )}

            </Flex>
          </div>

        </div>
  )
}

export default ProgressBarSection