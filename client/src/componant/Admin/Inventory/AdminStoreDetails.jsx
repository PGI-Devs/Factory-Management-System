import React from 'react'
import "./AdminStoreDetails.css"
import Sidebar from '../../Sidebar/Sidebar'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import InventoryTable from '../Inventory/InventoryTable'
import {navOptions} from "../../Navdata/dashboardNavData"
import StockAnalasysSection from '../charts/StockAnalasysSection'

const AdminStoreDetails = () => {




  return (
    <div className='layoutContainer'>
      <Sidebar />

      {/* <div className='navlayout'> */}

        <div className="storedetailscomponant">
        <DashboardNavBar  navOptions={navOptions}/>

        

         <StockAnalasysSection/>
          <InventoryTable/>

        {/* </div> */}
      </div>
    </div>
  )
}

export default AdminStoreDetails