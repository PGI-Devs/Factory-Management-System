import React, { useState } from 'react';
import { Button, Space, message } from 'antd';
import ItemTable from './Table/Table';

const RegistrarDashboard = () => {
  const [data, setData] = useState([
    {
      id: 1,
      item_code: 'ITM-001',
      item: 'Wrench',
      stock: 10,
      status: 'approved',
    },
    {
      id: 2,
      item_code: 'ITM-002',
      item: 'Paint',
      stock: 5,
      status: 'rejected',
    },
  ]);

  const handleReceived = (id, received) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: received ? 'received' : 'not_received' } : item
      )
    );
    message.success(received ? 'Marked as received' : 'Marked as not received');
  };

  const columns = [
    { title: 'Item Code', dataIndex: 'item_code', key: 'item_code' },
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        record.status === 'approved' && (
          <Space>
            <Button type="primary" onClick={() => handleReceived(record.id, true)}>
              Mark Received
            </Button>
            <Button danger onClick={() => handleReceived(record.id, false)}>
              Mark Not Received
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="dashboardContainerLayout">
      <h2>Registrar Dashboard</h2>
      <ItemTable columns={columns} data={data} />
    </div>
  );
};

export default RegistrarDashboard;
