import React, { useState } from 'react'
import './dashboardNav.css'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from 'antd'

const DashboardNavBar = ({navOptions}) => {

    // const [active, setActive] = useState('Dashboard')
     const location = useLocation()
  const currentPath = location.pathname



    return (
        <div className='navmain'>
          {navOptions ?<Typography >{navOptions.name}</Typography> :'' }  
            <div className="navContainer">
                <ul>
                    {navOptions && navOptions.map((data) => (
                        <Link to={data.link} key={data.nav}  className={currentPath === data.link ? 'active' : ''}><span>{data.icon} </span><span>{data.nav}</span></Link>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default DashboardNavBar