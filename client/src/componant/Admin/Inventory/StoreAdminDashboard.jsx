import React from 'react'
import "./StoreAdminDashboard.css"
import CardSection from './CardSection'
import Sidebar from '../../Sidebar/Sidebar'

const StoreAdminDashboard = () => {
  return (
 <div className='layoutContainer'>
    <Sidebar/>
   <div className="dashboard_componant">
        <CardSection/>

   </div>
   
   
   </div>
  )
}

export default StoreAdminDashboard