import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import './productiondashboard.css'
import TargetCard from './TargetCard'

const ProductionDashboard = () => {
  return (
     <div className='layoutContainer'>
    <Sidebar/>

    <div className="dashboard_componant">
       <div className="targetSection">
       <TargetCard/>
       <TargetCard/>
       <TargetCard/>
       <TargetCard/>
       <TargetCard/>
            
       </div>
    </div>

    </div>
  )
}

export default ProductionDashboard