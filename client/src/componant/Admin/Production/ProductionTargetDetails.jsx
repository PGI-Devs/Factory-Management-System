import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import { ProductionnavOptions, StockAnalasysOptions } from '../../Navdata/dashboardNavData'
import { useLocation, useParams } from 'react-router-dom'
import "./productiontargetDetails.css"
import ItemTable from '../../Table/Table'
import { Button, DatePicker, Input } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import dayjs from 'dayjs';
import ProgressBarSection from '../charts/ProgressBarSection'
import PieChart from '../charts/PieChart'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BarChart from './BarChart'
const ProductionTargetDetails = () => {

  const { id } = useParams()

  const targetDataList = {
    targetId: '1XPL',
    unitName: '30kv-I',
    targetBatch: 4,
    startDate: '5th April 2024',
    progressData: {
      ready: 70,
      processing: 20,
      testing: 10,
    },
    status: 'processing',  // added status
  }




const STATUS_COLORS = {
  READY:      '#4CAF50', // green
  TESTING:    '#36A2EB', // blue
  FABRICATION:'#4BC0C0', // teal
  COATING:    '#FFCD56', // yellow
  BANDING:    '#FF9F40', // orange
  CNC:        '#FF6384', // red / tomato
};

const getStatusColor = step =>
  STATUS_COLORS[step?.toUpperCase()] || '#888';   



  const data = [
    {
      key: 0,
      batch_id: 'GEN-SET-2000',
      item: 'PowerGen Max 15kVA',
      count: 5,
      variant: '15 kVA | Diesel',
      category: 'Silent Genset',
      location: 'Assembly Line A',
      statuses: [
        { step: 'CNC', time: '2025-05-15T08:00:00' },
        { step: 'BANDING', time: '2025-05-15T10:00:00' },
        { step: 'COATING', time: '2025-05-15T12:30:00' },
        { step: 'FABRICATION', time: '2025-05-15T14:15:00' },
      ],
    },
    {
      key: 1,
      batch_id: 'GEN-SET-2001',
      item: 'VoltPro Eco 25kVA',
      count: 3,
      variant: '25 kVA | Diesel',
      category: 'Open Genset',
      location: 'Assembly Line B',
      statuses: [
        { step: 'CNC', time: '2025-05-16T09:00:00' },
        { step: 'BANDING', time: '2025-05-16T10:45:00' },
        { step: 'COATING', time: '2025-05-16T13:10:00' },
      ],
    },
    {
      key: 2,
      batch_id: 'GEN-SET-2002',
      item: 'GenPrime Silent 62.5kVA',
      count: 4,
      variant: '62.5 kVA | Silent',
      category: 'Silent Genset',
      location: 'Silent Zone',
      statuses: [
        { step: 'CNC', time: '2025-05-17T07:45:00' },
        { step: 'BANDING', time: '2025-05-17T09:30:00' },
        { step: 'COATING', time: '2025-05-17T11:15:00' },
        { step: 'FABRICATION', time: '2025-05-17T13:00:00' },
        { step: 'TESTING', time: '2025-05-17T14:40:00' },
        { step: 'READY', time: '2025-05-17T15:40:00' },
      ],
    },
    {
      key: 3,
      batch_id: 'GEN-SET-2003',
      item: 'EcoPower Basic 10kVA',
      count: 6,
      variant: '10 kVA | Diesel',
      category: 'Open Genset',
      location: 'Testing Bay',
      statuses: [
        { step: 'CNC', time: '2025-05-18T08:20:00' },
        { step: 'BANDING', time: '2025-05-18T10:05:00' },
      ],
    },
    {
      key: 4,
      batch_id: 'GEN-SET-2004',
      item: 'MegaWatt Pro 100kVA',
      count: 2,
      variant: '100 kVA | Heavy-Duty',
      category: 'Industrial',
      location: 'Heavy Assembly Zone',
      statuses: [
        { step: 'CNC', time: '2025-05-19T09:10:00' },
        { step: 'BANDING', time: '2025-05-19T11:00:00' },
        { step: 'COATING', time: '2025-05-19T12:40:00' },
        { step: 'FABRICATION', time: '2025-05-19T14:20:00' },
        { step: 'TESTING', time: '2025-05-19T16:05:00' },
      ],
    },
    {
      key: 5,
      batch_id: 'GEN-SET-2005',
      item: 'TurboVolt Compact 20kVA',
      count: 7,
      variant: '20 kVA | Petrol',
      category: 'Portable Genset',
      location: 'Portable Unit Area',
      statuses: [
        { step: 'CNC', time: '2025-05-20T08:05:00' },
        { step: 'BANDING', time: '2025-05-20T09:50:00' },
        { step: 'COATING', time: '2025-05-20T11:25:00' },
        { step: 'FABRICATION', time: '2025-05-20T13:10:00' },
      ],
    },
  ];


  const getArrivalTime = (statuses = []) => {
    if (!Array.isArray(statuses) || statuses.length === 0) return null;
    return statuses
      .map(s => dayjs(s.time))
      .sort((a, b) => a - b)
      .pop()
      .format('DD-MM-YYYY hh:mm A'); // 12-hour format with AM/PM
  };




  const columns = [
    {
      title: 'Batch Id',
      dataIndex: 'batch_id',
      key: 'batch_id',

    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      fixed: 'left',

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<AiOutlineSearch />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.item.toLowerCase().includes(value.toLowerCase()),

    },


    {
      title: 'variant',
      dataIndex: 'variant',
      key: 'variant',

      filters: [...new Set(data.map(item => item.variant))].map(id => ({ text: String(id), value: id })),
      onFilter: (value, record) => record.variant === value,
    },
    {
      title: 'count',
      dataIndex: 'count',
      key: 'count',
      filterMultiple: false,
      filters: [
        { text: 'Low to High', value: 'asc' },
        { text: 'High to Low', value: 'desc' }
      ],
      onFilter: () => true,
    },
    {
      title: 'Arrival Time',
      dataIndex: 'statuses',          // we’ll use render instead of dataIndex itself
      key: 'arrivalTime',
      render: (_, record) => getArrivalTime(record.statuses),
      sorter: (a, b) =>
        dayjs(getArrivalTime(a.statuses)).unix() -
        dayjs(getArrivalTime(b.statuses)).unix(),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            autoFocus
            value={selectedKeys[0] ? dayjs(selectedKeys[0]) : null}
            onChange={(date, dateString) =>
              setSelectedKeys(dateString ? [dateString] : [])
            }
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<AiOutlineSearch />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        dayjs(getArrivalTime(record.statuses)).isSame(dayjs(value), 'day'),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',

      filters: [...new Set(data.map(item => item.location))].map(id => ({ text: String(id), value: id })),
      onFilter: (value, record) => record.location === value,
    },
   {
  title: 'Status',
  dataIndex: 'statuses',
  key: 'status',
  filters: [...new Set(data.map(r => r.statuses.at(-1)?.step))]
           .map(step => ({ text: step, value: step })),
  onFilter: (value, record) => record.statuses.at(-1)?.step === value,
  render: (statuses) => {
    const latest = statuses.at(-1)?.step || '';
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '0 8px',
          borderRadius: 4,
          background: getStatusColor(latest),
          color: '#fff',
          fontWeight: 500,
        }}
      >
        {latest}
      </span>
    );
  },
},


    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Button type="primary" >
          Details
        </Button>
      ),
    },
  ];


// --- last-step counts (unchanged) ---
const lastSteps  = data.map(d => d.statuses.at(-1).step);
const stepCounts = lastSteps.reduce((acc,s) => {
  acc[s] = (acc[s]||0)+1; return acc;
}, {});

// --- pie chart dataset ---
const pieChartData = {
  labels: Object.keys(stepCounts),
  datasets: [
    {
      label: 'No of Batch',
      data: Object.values(stepCounts),
      backgroundColor: Object.keys(stepCounts).map(getStatusColor), // <- here
    },
  ],
};
const barData = {
  labels: Object.keys(stepCounts),
  datasets: [
    {
      label: 'Time Taken',
      data: Object.values(stepCounts),
      backgroundColor: Object.keys(stepCounts).map(getStatusColor), // <- here
    },
  ],
};



const options = {
  plugins: {
    legend: {
      display: true, // This hides the label
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

    <div className='layoutContainer'>
      <Sidebar />


      {/* <div className='navlayout'> */}

      <div className="storedetailscomponant">
        <DashboardNavBar navOptions={ProductionnavOptions} />

        <div className="dashboard_componant">
          <div className="Targetheader"><h3>Batch Id :{id}</h3><span>{targetDataList.startDate}</span></div>
          <div  className="tableAndGrapgdiv"> 
            <ItemTable columns={columns} data={data} />
        {/* <ProgressBarSection graphOption={graphOption} activeNav={activeNav} HandelNavClick={HandelNavClick} StockAnalasysOptions={StockAnalasysOptions} Option={Option} /> */}
            <div className="workDetailsCharts">

            <PieChart data={pieChartData}/>
            <BarChart options={options} data={barData}/>
            </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default ProductionTargetDetails