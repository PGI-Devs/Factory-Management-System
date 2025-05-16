import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import './productiondashboard.css'
import TargetCard from './TargetCard'
import { ProductionnavOptions } from '../../Navdata/dashboardNavData'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'


const ProductionDashboard = () => {

const targetDataList = [
  {
    targetId: '#1XPL',
    unitName: '30kv-I',
    targetBatch: 4,
    startDate: '5th April 2024',
    progressData: {
      ready: 70,
      processing: 20,
      testing: 10,
    },
    status: 'processing',  // added status
  },
  {
    targetId: '#2QWR',
    unitName: '30kv-III',
    targetBatch: 6,
    startDate: '11th April 2024',
    progressData: {
      ready: 0,
      processing: 0,
      testing: 0,
    },
    status: 'Line up',
  },
  {
    targetId: '#3MND',
    unitName: '40kv-X',
    targetBatch: 3,
    startDate: '9th April 2024',
    progressData: {
      ready: 80,
      processing: 0,
      testing: 0,
    },
    status: 'done',
    doneDate: '20th April 2024' // optional done date
  },
  {
    targetId: '#4TGF',
    unitName: '25kv-Z',
    targetBatch: 5,
    startDate: '15th April 2024',
    progressData: {
      ready: 65,
      processing: 20,
      testing: 15,
    },
    status: 'processing',
  },
  {
    targetId: '#5BVC',
    unitName: '30kv-II',
    targetBatch: 8,
    startDate: '8th April 2024',
    progressData: {
      ready: 90,
      processing: 5,
      testing: 5,
    },
    status: 'done',
    doneDate: '18th April 2024'
  },
  {
    targetId: '#6OLP',
    unitName: '30kv-I',
    targetBatch: 2,
    startDate: '12th April 2024',
    progressData: {
      ready: 55,
      processing: 30,
      testing: 15,
    },
    status: 'processing',
  },
  {
    targetId: '#7XMV',
    unitName: '30kv-III',
    targetBatch: 7,
    startDate: '18th April 2024',
    progressData: {
      ready: 78,
      processing: 12,
      testing: 10,
    },
    status: 'processing',
  },
  {
    targetId: '#8QAL',
    unitName: '25kv-Z',
    targetBatch: 9,
    startDate: '14th April 2024',
    progressData: {
      ready: 68,
      processing: 22,
      testing: 10,
    },
    status: 'processing',
  },
  {
    targetId: '#9ZKD',
    unitName: '40kv-X',
    targetBatch: 4,
    startDate: '10th April 2024',
    progressData: {
      ready: 75,
      processing: 0,
      testing: 0,
    },
    status: 'done',
    doneDate: '22nd April 2024'
  },
  {
    targetId: '#10YTR',
    unitName: '30kv-II',
    targetBatch: 6,
    startDate: '13th April 2024',
    progressData: {
      ready: 82,
      processing: 10,
      testing: 8,
    },
    status: 'processing',
  },
];

  return (


     <div className='layoutContainer'>
    <Sidebar/>
    

      {/* <div className='navlayout'> */}

        <div className="storedetailscomponant">
        <DashboardNavBar  navOptions={ProductionnavOptions}/>

    <div className="dashboard_componant">
       <div className="targetSection">

      {

       targetDataList && targetDataList.map((item)=>(


         <TargetCard key={item.targetId} item={item} />
        )
        )
      }
       </div>
    </div>
</div>
    </div>
  )
}

export default ProductionDashboard