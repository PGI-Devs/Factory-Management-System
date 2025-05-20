import React from 'react'
import PieChart from '../charts/PieChart'
import DonutChart from'../charts/DonutChart'
import './analysisSection.css'

const AnalysisSection = () => {

const orderdata = [
     {
    key: '1',
    item_code: 'ELC-001',
    item: 'Voltage Regulator',
    stock: 25,
    capacity: 150,
    specification: 'Input 220V, Output 110-240V',
    category: 'Electrical',
    location: 'Rack A1',
    department: 'Assembly',
    graph: 'N/A',
    description: 'Used to regulate voltage in generator output. Critical for power stability.',
  },
  {
    key: '4',
    item_code: 'HDW-004',
    item: 'Hex Bolt M12',
    stock: 70,
    capacity: 150,
    specification: 'Stainless Steel, 50mm',
    category: 'Hardware',
    location: 'Bin D1',
    department: 'Maintenance',
    graph: 'N/A',
    description: 'Used in mechanical fastening across assemblies. High corrosion resistance.',
  },
  {
    key: '5',
    item_code: 'LUB-005',
    item: 'Engine Oil',
    stock: 60,
    capacity: 150,
    specification: '15W40, 1L Pack',
    category: 'Consumables',
    location: 'Shelf E2',
    department: 'Maintenance',
    graph: 'N/A',
    description: 'Essential for lubrication of engine components. Must be replaced regularly.',
  },
  {
    key: '7',
    item_code: 'MCH-007',
    item: 'Piston Ring Set',
    stock: 30,
    capacity: 150,
    specification: 'Set of 3, 85mm Bore',
    category: 'Mechanical',
    location: 'Bin G1',
    department: 'Engine Assembly',
    graph: 'N/A',
    description: 'Ensures proper compression and lubrication inside the combustion chamber.',
  },
  {
    key: '8',
    item_code: 'HDW-008',
    item: 'Washer M8',
    stock: 100,
    capacity: 150,
    specification: 'Zinc Coated',
    category: 'Hardware',
    location: 'Bin H4',
    department: 'Assembly',
    graph: 'N/A',
    description: 'Used to distribute load of bolts and prevent wear. Zinc for rust protection.',
  },
  {
    key: '9',
    item_code: 'ELC-009',
    item: 'Wiring Harness',
    stock: 20,
    capacity: 150,
    specification: 'Multi-core, 2m length',
    category: 'Electrical',
    location: 'Rack I2',
    department: 'Electrical',
    graph: 'N/A',
    description: 'Combines all wires into one harness for power and signal routing.',
  },
  {
    key: '2',
    item_code: 'MCH-002',
    item: 'Crankshaft',
    stock: 10,
    capacity: 150,
    threshold: '6.7%',
    ordered: true,
    specification: 'Forged Steel, 120mm',
    category: 'Mechanical',
    location: 'Rack B2',
    department: 'Machine Shop',
    graph: 'N/A',
    description: 'Connects pistons and converts linear motion into rotational motion.',
    statuses: [
      { step: 'order', time: '2025-05-13' },
      { step: 'delivered', time: '2025-05-14' },
      { step: 'quality check', time: '2025-05-15' },
      { step: 'quantity check', time: '2025-05-16' },
      { step: 'stored', time: '2025-05-16' },
    ],
    vendor: {
      name: 'Precision Forgings Ltd.',
      contact: '+91 98222 44556',
      email: 'sales@precisionforgings.in',
      location: 'Rajkot, Gujarat',
    },
    logistics: {
      transporter: 'TCI Freight',
      trackingId: 'TCI-998877',
      expectedDelivery: '2025-05-18',
      mode: 'Surface',
    },
    rejectQtn: 1,
    paymentInfo: {
      totalAmount: 25000,
      totalAdvance: 10000,
      remainingBalance: 15000,
      paymentDate: '2025-05-08',
    },
  },
  {
    key: '3',
    item_code: 'ELC-003',
    item: 'Starter Motor',
    stock: 8,
    capacity: 150,
    threshold: '5.3%',
    ordered: true,
    specification: '24V DC, 3kW',
    category: 'Electrical',
    location: 'Rack C3',
    department: 'Assembly',
    graph: 'N/A',
    description: 'Initial motor to start the engine. Must be high torque and reliable.',
    statuses: [
      { step: 'order', time: '2025-05-13' },
      { step: 'delivered', time: '2025-05-14' },
      { step: 'quality check', time: '2025-05-15' },
    ],
    vendor: {
      name: 'ElectroMotion India',
      contact: '+91 99765 12345',
      email: 'info@electromotion.in',
      location: 'Chennai, Tamil Nadu',
    },
    logistics: {
      transporter: 'Delhivery Express',
      trackingId: 'DLV-445566',
      expectedDelivery: '2025-05-18',
      mode: 'Air Cargo',
    },
    rejectQtn: 0,
    paymentInfo: {
      totalAmount: 18000,
      totalAdvance: 5000,
      remainingBalance: 13000,
      paymentDate: '2025-05-10',
    },
  },
  {
    key: '6',
    item_code: 'ELC-006',
    item: 'Control Panel',
    stock: 5,
    capacity: 150,
    threshold: '3.3%',
    ordered: true,
    specification: 'Digital, 3-Phase',
    category: 'Electrical',
    location: 'Rack F3',
    department: 'Electrical',
    graph: 'N/A',
    description: 'Main control interface for generator operation. Includes display and buttons.',
    statuses: [
      { step: 'order', time: '2025-05-13' },
      { step: 'delivered', time: '2025-05-14' },
    ],
    vendor: {
      name: 'Digitron Panels Pvt. Ltd.',
      contact: '+91 99001 33445',
      email: 'support@digitron.in',
      location: 'Bangalore, Karnataka',
    },
    logistics: {
      transporter: 'Gati Logistics',
      trackingId: 'GATI-234567',
      expectedDelivery: '2025-05-18',
      mode: 'Surface',
    },
    rejectQtn: 0,
    paymentInfo: {
      totalAmount: 32000,
      totalAdvance: 10000,
      remainingBalance: 22000,
      paymentDate: '2025-05-11',
    },
  },
  {
    key: '10',
    item_code: 'TOL-010',
    item: 'Torque Wrench',
    stock: 15,
    capacity: 150,
    threshold: '10%',
    ordered: true,
    specification: 'Adjustable, 10-100 Nm',
    category: 'Tool',
    location: 'Tool Room',
    department: 'Maintenance',
    graph: 'N/A',
    description: 'Used for precision tightening of bolts to specified torque. Prevents damage.',
    statuses: [
      { step: 'order', time: '2025-05-13' },
    ],
    vendor: {
      name: 'ProTools India',
      contact: '+91 99881 11223',
      email: 'orders@protools.in',
      location: 'Faridabad, Haryana',
    },
    logistics: {
      transporter: 'DTDC Express',
      trackingId: 'DTDC-778899',
      expectedDelivery: '2025-05-18',
      mode: 'Air Cargo',
    },
    rejectQtn: 0,
    paymentInfo: {
      totalAmount: 8000,
      totalAdvance: 3000,
      remainingBalance: 5000,
      paymentDate: '2025-05-07',
    },
  },
];

const orderMap = {};
orderdata.forEach((item) => {
    orderMap[item.item_code] = item.ordered;
});


let lowStockOrdered = 0;
let lowStockNotOrdered = 0;


orderdata.forEach((item) => {
    const percent = (item.stock / item.capacity) * 100;
    if (percent <= 30) {
        const isOrdered = orderMap[item.item_code];
        if (isOrdered) {
            lowStockOrdered += 1;
        } else {
            lowStockNotOrdered += 1;
        }
    }
});

const statusCounts = orderdata.reduce((acc, item) => {
  if (item.statuses && Array.isArray(item.statuses) && item.statuses.length > 0) {
    const lastStatus = item.statuses[item.statuses.length - 1];
    acc[lastStatus.step] = (acc[lastStatus.step] || 0) + 1;
  }
  return acc;
}, {});

const doughnutdata = {
    labels: ['Low Stock - Ordered', 'Low Stock - Not Ordered'],
    datasets: [
        {
            label: 'Low Stock Breakdown',
            data: [lowStockOrdered, lowStockNotOrdered],
            backgroundColor: ['#52c41a', '#ff4d4f'], // blue, red
        },
    ],
};

 const pieorderdata = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: 'Order status',
                data: Object.values(statusCounts),
                backgroundColor: [
                    '#a78bfa', // purple
                    '#52c41a', // green
                    '#ff4d4f', // red
                    '#60a5fa', // blue
                    '#faad14', // yellow
                    '#fb7185',
                ]  // blue, red
            },
        ],
    };
    const stockLevels = { Low: 0, Medium: 0, Normal: 0 };

    orderdata.forEach((item) => {
        const percent = (item.stock / item.capacity) * 100;
        if (percent <= 30) {
            stockLevels.Low += 1;
        } else if (percent <= 60) {
            stockLevels.Medium += 1;
        } else {
            stockLevels.Normal += 1;
        }
    });

    // Pie chart setup
    const pieChartData = {
        labels: ['Low (≤30%)', 'Medium (31-60%)', 'Normal (>60%)'],
        datasets: [
            {
                label: 'Stock Level',
                data: [stockLevels.Low, stockLevels.Medium, stockLevels.Normal],
                backgroundColor: ['#ff4d4f', '#faad14', '#52c41a'], // red, yellow, green
            },
        ],
    };

  
    return (

        <div className="analeticSectionPurchese">
            <div>
                <PieChart  data={pieChartData} title="Stock Break-Down"/>
            </div>
            <div>
                <DonutChart  doughnutdata={doughnutdata} title="Low Stock In-Order" />

            </div>
            <div>
                <PieChart  data={pieorderdata} title="Order Break-down"/>
            </div>
           
            {/* <PieChart options={options} data={pieChartData}/> */}
        </div>


    )
}

export default AnalysisSection