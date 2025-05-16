import React, { useState } from 'react'
import './dashboardNav.css'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from 'antd'

const DashboardNavBar = ({ navOptions, onNavClick, activeNav }) => {

    // const [active, setActive] = useState('Dashboard')
    const location = useLocation()
    const currentPath = location.pathname



    return (
        <div className='navmain'>
            {navOptions ? <Typography >{navOptions.name}</Typography> : ''}
            <div className="navContainer" key={navOptions.nav}  >
                <ul>
                    {navOptions && navOptions.map((data) => (
                        <Link to={data.link} key={data.nav}
                            onClick={() => onNavClick?.(data.nav)}

                            className={currentPath === data.link ? 'active' : '' || activeNav === data.nav ? 'active' : ''}  >
                            <span>{data.icon} </span><span id='navNAme'>{data.nav}</span></Link>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default DashboardNavBar