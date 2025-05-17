import React, { useState } from 'react';
import { Table, Button, message, Tag, Layout } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const { Header, Content, Footer } = Layout;

const ReadyForDispatch = () => {
  const initialData = [
    {
      work_order_id: 101,
      item_id: 1,
      item_name: 'Steel Rod',
      passed_quantity: 100,
      status: 'Ready'
    },
    {
      work_order_id: 102,
      item_id: 2,
      item_name: 'Copper Wire',
      passed_quantity: 50,
      status: 'Ready'
    },
    {
      work_order_id: 103,
      item_id: 3,
      item_name: 'Aluminum Sheet',
      passed_quantity: 75,
      status: 'Ready'
    }
  ];

  const [data, setData] = useState(initialData);

  const handleDispatch = (record) => {
    const newData = data.map(item =>
      item.work_order_id === record.work_order_id
        ? { ...item, status: 'Dispatched' }
        : item
    );
    setData(newData);
    message.success(`${record.item_name} dispatched to store.`);
  };

  const exportToExcel = () => {
    const dispatched = data.filter(item => item.status === 'Dispatched');
    if (dispatched.length === 0) {
      message.warning('No dispatched records to export.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dispatched);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dispatched Items');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'dispatched_items.xlsx');
    message.success('Excel exported.');
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name'
    },
    {
      title: 'Quantity',
      dataIndex: 'passed_quantity',
      key: 'passed_quantity'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Ready' ? 'blue' : 'green'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.status === 'Ready' ? (
          <Button type="primary" onClick={() => handleDispatch(record)}>
            Dispatch
          </Button>
        ) : (
          <Tag color="green">Already Dispatched</Tag>
        )
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: '20px' }}>
        Factory Dashboard - Ready for Dispatch
      </Header>

      <Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Button type="primary" onClick={exportToExcel}>
            Export Dispatched to Excel
          </Button>
        </div>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="work_order_id"
          pagination={false}
          bordered
        />
      </Content>

      <Footer style={{ textAlign: 'center' }}>© 2025 Inventory System</Footer>
    </Layout>
  );
};

export default ReadyForDispatch;
