import React from 'react'
import DashboardNavBar from './DashboardNavBar/DashboardNavBar'
import Sidebar from '../Sidebar/Sidebar'
import StockAnalasis from './charts/StockAnalasis'
import {navOptions} from '../Navdata/dashboardNavData'

const InvantoryAnalaticDashboard = () => {
    return (
        <div className='layoutContainer'>
            <Sidebar />
            <div className="dashboardContainerLayout">

                <DashboardNavBar  navOptions={navOptions}/>
                
                <StockAnalasis/>
            </div>
        </div>
    )
}

export default InvantoryAnalaticDashboard