import React, { useState } from 'react';
import ItemTable from '../Table/Table';
import DashboardNavBar from './DashboardNavBar/DashboardNavBar';
import { navOptions } from '../Navdata/dashboardNavData';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Input, Space, message } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';

const ItemRequest = () => {
  const [data, setData] = useState([
    {
      id: 1,
      item_code: 'ITM-001',
      item: 'Wrench',
      stock: 10,
      category: 'Tools',
      location: 'Warehouse A',
      department: 'Maintenance',
      status: 'requested',
    },
    {
      id: 2,
      item_code: 'ITM-002',
      item: 'Screwdriver',
      stock: 25,
      category: 'Tools',
      location: 'Warehouse B',
      department: 'Electrical',
      status: 'approved',
    },
    {
      id: 3,
      item_code: 'ITM-003',
      item: 'Paint',
      stock: 15,
      category: 'Supplies',
      location: 'Warehouse C',
      department: 'Civil',
      status: 'received',
    },
  ]);

  const handleApprove = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: 'approved' } : item
      )
    );
    message.success('Item approved for transfer');
  };

  const handleReceived = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: 'received' } : item
      )
    );
    message.success('Item marked as received');
  };

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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Search Item"
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
      onFilter: (value, record) =>
        record.item.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'requested' && (
            <Button type="primary" onClick={() => handleApprove(record.id)}>
              Approve
            </Button>
          )}
          {record.status === 'approved' && (
            <Button type="default" onClick={() => handleReceived(record.id)}>
              Mark Received
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="layoutContainer">
      <Sidebar />
      <div className="dashboardContainerLayout">
        <DashboardNavBar navOptions={navOptions} />
        <ItemTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ItemRequest;
