import { AiOutlineClockCircle, AiOutlineDashboard, AiOutlineDatabase, AiOutlineDeliveredProcedure, AiOutlineMail, AiOutlinePieChart } from 'react-icons/ai'

   export const navOptions = [
  
        {
      
            nav: 'Dashboard',
            link: '/details/:id',
            icon: <AiOutlineDashboard />
        },
       
        {
            nav: 'Purches',
            link: '/details/purches',
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

   export const ProductionnavOptions = [
  
       {
           nav: 'Active Production',
           link: '/production',
           icon: <AiOutlinePieChart />
       },
        {
      
            nav: 'Target Board',
            link: '/details',
            icon: <AiOutlineDashboard />
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

    export  const PurchaseNav =[
 {
            nav: 'Factory 1',
            // link: '/details',
            icon: <AiOutlineDashboard />
        },
        {
            nav: 'Factory 2',
            // link: '/details/inventory',
            
            icon: <AiOutlineDatabase />
        },
        {
            nav: 'Factory 3',
            // link: '/details/analysis',
            icon: <AiOutlinePieChart />
        },

    ]