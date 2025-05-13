import React from 'react'
import InventoryTable from './InventoryTable'
import Sidebar from '../Sidebar/Sidebar'
import DashboardNavBar from './DashboardNavBar/DashboardNavBar'
import {navOptions} from '../Navdata/dashboardNavData'
const InventoryDetails = () => {
    return (
        <div className='layoutContainer'>
            <Sidebar />
            <div className="dashboardContainerLayout">

                <DashboardNavBar  navOptions={navOptions}/>
                <InventoryTable />
            </div>
        </div>
    )
}

export default InventoryDetails