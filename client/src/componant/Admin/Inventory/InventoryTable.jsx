import React from 'react'
import ItemTable from '../../Table/Table'

import { Button, Input } from 'antd'
import { AiOutlineDatabase, AiOutlineSearch } from 'react-icons/ai'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const InventoryTable = () => {





  const data = [
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
      key: '2',
      item_code: 'MCH-002',
      item: 'Crankshaft',
      stock: 10,
      capacity: 150,
      specification: 'Forged Steel, 120mm',
      category: 'Mechanical',
      location: 'Rack B2',
      department: 'Machine Shop',
      graph: 'N/A',
      description: 'Connects pistons and converts linear motion into rotational motion.',
    },
    {
      key: '3',
      item_code: 'ELC-003',
      item: 'Starter Motor',
      stock: 8,
      capacity: 150,
      specification: '24V DC, 3kW',
      category: 'Electrical',
      location: 'Rack C3',
      department: 'Assembly',
      graph: 'N/A',
      description: 'Initial motor to start the engine. Must be high torque and reliable.',
    },
    {
      key: '4',
      item_code: 'HDW-004',
      item: 'Hex Bolt M12',
      stock: 500,
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
      stock: 120,
      capacity: 150,
      specification: '15W40, 1L Pack',
      category: 'Consumables',
      location: 'Shelf E2',
      department: 'Maintenance',
      graph: 'N/A',
      description: 'Essential for lubrication of engine components. Must be replaced regularly.',
    },
    {
      key: '6',
      item_code: 'ELC-006',
      item: 'Control Panel',
      stock: 5,
      capacity: 150,
      specification: 'Digital, 3-Phase',
      category: 'Electrical',
      location: 'Rack F3',
      department: 'Electrical',
      graph: 'N/A',
      description: 'Main control interface for generator operation. Includes display and buttons.',
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
      stock: 1000,
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
      key: '10',
      item_code: 'TOL-010',
      item: 'Torque Wrench',
      stock: 15,
      capacity: 150,
      specification: 'Adjustable, 10-100 Nm',
      category: 'Tool',
      location: 'Tool Room',
      department: 'Maintenance',
      graph: 'N/A',
      description: 'Used for precision tightening of bolts to specified torque. Prevents damage.',
    },
  ];



  const columns = [
    {
      title: 'Item Code',
      dataIndex: 'item_code',
      key: 'item_code',

    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      fixed: 'left',

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<AiOutlineSearch />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.item.toLowerCase().includes(value.toLowerCase()),

    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      filterMultiple: false,
      filters: [
        { text: 'Low to High', value: 'asc' },
        { text: 'High to Low', value: 'desc' }
      ],
      onFilter: () => true,
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
      key: 'specification',

      filters: [...new Set(data.map(item => item.specification))].map(id => ({ text: String(id), value: id })),
      onFilter: (value, record) => record.specification === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',

      filters: [...new Set(data.map(item => item.category))].map(id => ({ text: String(id), value: id })),
      onFilter: (value, record) => record.category === value,

    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',

      filters: [...new Set(data.map(item => item.location))].map(id => ({ text: String(id), value: id })),
      onFilter: (value, record) => record.location === value,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: [...new Set(data.map(item => item.department))].map(id => ({ text: String(id), value: id })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Graph',
      dataIndex: 'graph',
      key: 'graph',
    },
  ];


  return (
    <div className="storeDetailsTable">
      <h3 className='h3Header'> <AiOutlineDatabase />Inventorys</h3>
      <ItemTable columns={columns} data={data} renderExpandedRow={(record) => (
        <div className="custom-expanded-row">
          <h1 style={{ margin: 0, color: 'green' }}>{record.name}</h1>
        
        </div>
      )} />
    </div>
  )
}

export default InventoryTable