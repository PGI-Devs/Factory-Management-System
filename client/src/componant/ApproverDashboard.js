import React, { useState } from 'react';
import { Button, Space, message } from 'antd';
import ItemTable from './Table/Table';

const ApproverDashboard = () => {
  const [data, setData] = useState([
    {
      id: 1,
      item_code: 'ITM-003',
      item: 'Hammer',
      stock: 8,
      status: 'requested',
    },
  ]);

  const handleDecision = (id, decision) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: decision } : item
      )
    );
    message.success(`Item ${decision}`);
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
        record.status === 'requested' && (
          <Space>
            <Button type="primary" onClick={() => handleDecision(record.id, 'approved')}>
              Approve
            </Button>
            <Button danger onClick={() => handleDecision(record.id, 'rejected')}>
              Reject
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="dashboardContainerLayout">
      <h2>Approver Dashboard</h2>
      <ItemTable columns={columns} data={data} />
    </div>
  );
};

export default ApproverDashboard;
