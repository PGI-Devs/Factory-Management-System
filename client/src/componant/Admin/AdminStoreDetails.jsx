import React from 'react'
import "./AdminStoreDetails.css"
import StorAnalatic from './charts/StorAnalaticSection'
import Sidebar from '../Sidebar/Sidebar'
import DashboardNavBar from './DashboardNavBar/DashboardNavBar'
import InventoryTable from './InventoryTable'
import {navOptions} from "../Navdata/dashboardNavData"
import StockAnalasis from './charts/StockAnalasis'

const AdminStoreDetails = () => {




  return (
    <div className='layoutContainer'>
      <Sidebar />

      {/* <div className='navlayout'> */}

        <div className="storedetailscomponant">
        <DashboardNavBar  navOptions={navOptions}/>

         <StockAnalasis/>
          <InventoryTable/>

        {/* </div> */}
      </div>
    </div>
  )
}

export default AdminStoreDetails