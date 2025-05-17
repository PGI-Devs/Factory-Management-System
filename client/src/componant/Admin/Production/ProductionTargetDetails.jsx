import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import { ProductionnavOptions } from '../../Navdata/dashboardNavData'
import {  useParams } from 'react-router-dom'
import "./productiontargetDetails.css"
import ItemTable from '../../Table/Table'
import { Button,  DatePicker, Input } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import dayjs from 'dayjs';
import PieChart from '../charts/PieChart'
import BarChart from './BarChart'
import { MdArrowCircleRight,   } from 'react-icons/md'
import StepProgress from '../charts/StepProgress'
import DoughnutChart from '../charts/DonutChart'



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
  'CNC': '#FF6384', // red / tomato
  'POWDER COATING & TREATMENT PLANT': '#FFCD56', // yellow
  'ENGINE & CANOPY ASSEMBLING': '#FF9F40', // orange
  'ROCKWOOL & FOAM FITTING DEPARTMENT': '#4BC0C0', // teal
  'ELECTRICAL & PANEL DEPARTMENT': '#36A2EB', // blue
  'TESTING DEPARTMENT': '#4CAF50', // green
};


  const getStatusColor = step =>
    STATUS_COLORS[step?.toUpperCase()] || '#888';


const data = [
  {
    key: 0,
    batch_id: 'GEN-SET-2000',
    item: 'PowerGen Max 15kVA',
    count: 5,
    variant: '35 kVA -III',
    category: 'Silent Genset',
    location: 'Assembly Line A',
    statuses: [
      { step: 'CNC', in: '2025-05-15T08:00:00', out: '2025-05-15T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-15T09:15:00', out: '2025-05-15T10:30:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-15T11:00:00', out: '2025-05-15T12:30:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-15T13:00:00', out: '' },
    ],
  },
  {
    key: 1,
    batch_id: 'GEN-SET-2001',
    item: 'VoltPro Eco 25kVA',
    count: 3,
    variant: '35 kVA -II',
    category: 'Open Genset',
    location: 'Assembly Line B',
    statuses: [
      { step: 'CNC', in: '2025-05-16T09:00:00', out: '2025-05-16T10:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-16T10:15:00', out: '2025-05-16T11:45:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-16T12:10:00', out: '2025-05-16T13:10:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-16T13:30:00', out: '' },
    ],
  },
  {
    key: 2,
    batch_id: 'GEN-SET-2002',
    item: 'GenPrime Silent 62.5kVA',
    count: 4,
    variant: '35 kVA -I',
    category: 'Silent Genset',
    location: 'Silent Zone',
    statuses: [
      { step: 'CNC', in: '2025-05-17T07:45:00', out: '2025-05-17T08:45:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-17T09:00:00', out: '2025-05-17T10:30:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-17T10:45:00', out: '2025-05-17T11:15:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-17T11:30:00', out: '2025-05-17T13:00:00' },
      { step: 'ELECTRICAL & PANEL DEPARTMENT', in: '2025-05-17T13:15:00', out: '2025-05-17T14:40:00' },
      { step: 'TESTING DEPARTMENT', in: '2025-05-17T14:50:00', out: '' },
    ],
  },
  {
    key: 3,
    batch_id: 'GEN-SET-2003',
    item: 'EcoPower Basic 10kVA',
    count: 6,
    variant: '35 kVA -III',
    category: 'Open Genset',
    location: 'Testing Bay',
    statuses: [
      { step: 'CNC', in: '2025-05-18T08:20:00', out: '2025-05-18T09:20:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-18T09:30:00', out: '' },
    ],
  },
  {
    key: 4,
    batch_id: 'GEN-SET-2004',
    item: 'MegaWatt Pro 100kVA',
    count: 2,
    variant: '35 kVA -II',
    category: 'Industrial',
    location: 'Heavy Assembly Zone',
    statuses: [
      { step: 'CNC', in: '2025-05-19T09:10:00', out: '2025-05-19T10:10:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-19T10:20:00', out: '2025-05-19T11:00:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-19T11:15:00', out: '2025-05-19T12:40:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-19T13:00:00', out: '2025-05-19T14:20:00' },
      { step: 'ELECTRICAL & PANEL DEPARTMENT', in: '2025-05-19T14:30:00', out: '' },
    ],
  },
  {
    key: 5,
    batch_id: 'GEN-SET-2005',
    item: 'TurboVolt Compact 20kVA',
    count: 7,
    variant: '35 kVA -III',
    category: 'Portable Genset',
    location: 'Portable Unit Area',
    statuses: [
      { step: 'CNC', in: '2025-05-20T08:05:00', out: '2025-05-20T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-20T09:15:00', out: '2025-05-20T09:50:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-20T10:00:00', out: '2025-05-20T11:25:00' },
    ],
  },
  {
    key: 6,
    batch_id: 'GEN-SET-2005',
    item: 'TurboVolt Compact 20kVA',
    count: 7,
    variant: '35 kVA -II',
    category: 'Portable Genset',
    location: 'Portable Unit Area',
    statuses: [
      { step: 'CNC', in: '2025-05-20T08:05:00', out: '2025-05-20T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-20T09:15:00', out: '2025-05-20T09:50:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-20T10:00:00', out: '2025-05-20T11:25:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-20T11:40:00', out: '' },
    ],
  },
  {
    key: 7,
    batch_id: 'GEN-SET-2005',
    item: 'TurboVolt Compact 20kVA',
    count: 7,
    variant: '35 kVA -III',
    category: 'Portable Genset',
    location: 'Portable Unit Area',
    statuses: [
      { step: 'CNC', in: '2025-05-20T08:05:00', out: '2025-05-20T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-20T09:15:00', out: '2025-05-20T09:50:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-20T10:00:00', out: '2025-05-20T11:25:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-20T11:40:00', out: '' },
    ],
  },
  {
    key: 8,
    batch_id: 'GEN-SET-2005',
    item: 'TurboVolt Compact 20kVA',
    count: 7,
    variant: '35 kVA -II',
    category: 'Portable Genset',
    location: 'Portable Unit Area',
    statuses: [
      { step: 'CNC', in: '2025-05-20T08:05:00', out: '2025-05-20T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-20T09:15:00', out: '2025-05-20T09:50:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-20T10:00:00', out: '2025-05-20T11:25:00' },
    ],
  },
  {
    key: 9,
    batch_id: 'GEN-SET-2005',
    item: 'TurboVolt Compact 20kVA',
    count: 7,
    variant: '35 kVA -I',
    category: 'Portable Genset',
    location: 'Portable Unit Area',
    statuses: [
      { step: 'CNC', in: '2025-05-20T08:05:00', out: '2025-05-20T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-20T09:15:00', out: '2025-05-20T09:50:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-20T10:00:00', out: '2025-05-20T11:25:00' },
      { step: 'ROCKWOOL & FOAM FITTING DEPARTMENT', in: '2025-05-20T11:40:00', out: '' },
    ],
  },
  {
    key: 10,
    batch_id: 'GEN-SET-2005',
    item: 'TurboVolt Compact 20kVA',
    count: 7,
    variant: '35 kVA -III',
    category: 'Portable Genset',
    location: 'Portable Unit Area',
    statuses: [
      { step: 'CNC', in: '2025-05-20T08:05:00', out: '2025-05-20T09:00:00' },
      { step: 'POWDER COATING & TREATMENT PLANT', in: '2025-05-20T09:15:00', out: '2025-05-20T09:50:00' },
      { step: 'ENGINE & CANOPY ASSEMBLING', in: '2025-05-20T10:00:00', out: '' },
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
      dataIndex: 'statuses',
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
        <Button style={{ fontSize: '', padding: '8px' }} type="primarym" >
          <MdArrowCircleRight />
        </Button>
      ),
    },
  ];


  // --- last-step counts (unchanged) ---
  const lastSteps = data.map(d => d.statuses.at(-1).step);
  const stepCounts = lastSteps.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1; return acc;
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
          stepSize: 1, // Y-axis steps of 10
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
        display: false,                  // ⬅️ turn off x-axis labels
      },
       
      },

    },
  };



  const ExpandedRowContent = ({ record }) => {
    // const { vendor, logistics, order_id, paymentInfo } = record;
    const allSteps = ['CNC', 'POWDER COATING & TREATMENT PLANT', 'ENGINE & CANOPY ASSEMBLING', 'ROCKWOOL & FOAM FITTING DEPARTMENT', 'ELECTRICAL & PANEL DEPARTMENT', 'TESTING DEPARTMENT'];

    return (
      <div  className="custom-expanded-row" key={record.key}>
        <h1 style={{ margin: '10px', color: 'green' }}>{record.batch_id}</h1>

        <StepProgress  direction={'vertical'} allSteps={allSteps} record={record} />

        {/* Order info */}





      </div>
    );
  };


const variantCountMap = data.reduce((acc, item) => {
  acc[item.variant] = (acc[item.variant] || 0) + item.count;
  return acc;
}, {});

// ---- 2. EXTRACT UNIQUE LABELS + TOTALS -------------------------------------------
const labels = Object.keys(variantCountMap);     // ['15 kVA | Diesel', '25 kVA | Diesel', '62.5 kVA | Silent', ...]
const values = Object.values(variantCountMap);   // [5, 3, 4, 6, 2, 7]  ← counts are now summed


const colors = [
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 99, 132, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  // add more if you have more labels
];



  return (

    <div className='layoutContainer'>
      <Sidebar />


      {/* <div className='navlayout'> */}

      <div className="storedetailscomponant">
        <DashboardNavBar navOptions={ProductionnavOptions} />

        <div className="dashboard_componant">
          <div className="Targetheader"><h3>Batch Id :{id}</h3><span>{targetDataList.startDate}</span></div>
          <div className="tableAndGrapgdiv">
            <ItemTable columns={columns} data={data} renderExpandedRow={(record) => <ExpandedRowContent record={record} />} />
            {/* <ProgressBarSection graphOption={graphOption} activeNav={activeNav} HandelNavClick={HandelNavClick} StockAnalasysOptions={StockAnalasysOptions} Option={Option} /> */}
            <div className="workDetailsCharts">

             <div>
              <PieChart data={pieChartData} />
              </div> 
             <div>
              
              <BarChart options={options} data={barData} />
              </div> 
             <div  >
              
              <DoughnutChart colors={colors} labels={labels} values={values} title="Batch GEN-SET-2002" />
              </div> 
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductionTargetDetails