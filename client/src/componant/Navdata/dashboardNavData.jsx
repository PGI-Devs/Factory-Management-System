import { AiOutlineClockCircle, AiOutlineDashboard, AiOutlineDatabase, AiOutlineDeliveredProcedure, AiOutlineMail, AiOutlinePieChart } from 'react-icons/ai'

   export const navOptions = [
  
        {
      
            nav: 'Dashboard',
            link: '/details',
            icon: <AiOutlineDashboard />
        },
       
        {
            nav: 'Analatic',
            link: '/details/analysis',
            icon: <AiOutlinePieChart />
        },
         {
            nav: 'Inventory',
            link: '/details/inventory',
            
            icon: <AiOutlineDatabase />
        },
        {
            nav: 'Update Stock',
            icon: <AiOutlineClockCircle />
        },
        {
            nav: 'Request',
            icon: <AiOutlineMail />
        },
        {
            nav: 'Ready',
            icon: <AiOutlineDeliveredProcedure />
        },


    ]

    export  const StockAnalasysOptions =[
 {
            nav: 'Product',
            // link: '/details',
            icon: <AiOutlineDashboard />
        },
        {
            nav: 'Department',
            // link: '/details/inventory',
            
            icon: <AiOutlineDatabase />
        },
        {
            nav: 'Production',
            // link: '/details/analysis',
            icon: <AiOutlinePieChart />
        },

    ]