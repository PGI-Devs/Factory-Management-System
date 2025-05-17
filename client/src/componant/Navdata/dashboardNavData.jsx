import { AiOutlineFileExcel,AiOutlineClockCircle, AiOutlineDashboard, AiOutlineDatabase, AiOutlineDeliveredProcedure, AiOutlineMail, AiOutlinePieChart } from 'react-icons/ai'

   export const navOptions = [
  
        {
      
            nav: 'Dashboard',
            link: '/details',
            icon: <AiOutlineDashboard />
        },
        {
            nav: 'Inventory',
            link: '/details/inventory',
            
            icon: <AiOutlineDatabase />
        },
        {
            nav: 'Analatic',
            link: '/details/analysis',
            icon: <AiOutlinePieChart />
        },
        {
            nav: 'History',
            link: '/details/history',
            icon: <AiOutlineClockCircle />
        },
        {
            nav: 'Excel',
            link: '/details/excel',
            icon: <AiOutlineFileExcel />
        },
        {
            nav: 'Request',
            link:'/details/roleselector',
            icon: <AiOutlineMail />
        },
        {
            nav: 'Ready',
              link:'/details/ready',
            icon: <AiOutlineDeliveredProcedure />
        },


    ]

    export  const StockAnalasysOptions =[
 {
            nav: 'Product',
            link: '/details',
            icon: <AiOutlineDashboard />
        },
        {
            nav: 'Department',
            link: '/details/inventory',
            
            icon: <AiOutlineDatabase />
        },
        {
            nav: 'Production',
            link: '/details/analysis',
            icon: <AiOutlinePieChart />
        },

    ]