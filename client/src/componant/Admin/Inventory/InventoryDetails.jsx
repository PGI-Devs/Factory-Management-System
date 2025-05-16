import React from 'react'
import InventoryTable from '../Inventory/InventoryTable'
import Sidebar from '../../Sidebar/Sidebar'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import {navOptions} from '../../Navdata/dashboardNavData'
import StockAnalasysSection from '../charts/StockAnalasysSection'

const InventoryDetails = () => {
    return (
        <div className='layoutContainer'>
            <Sidebar />
            <div className="dashboardContainerLayout">

                <DashboardNavBar  navOptions={navOptions}/>
                <StockAnalasysSection/>
                <InventoryTable />
            </div>
        </div>
    )
}

export default InventoryDetails