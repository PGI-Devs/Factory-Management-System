import React from 'react';
import { Card, Row, Col, Typography, Button, Progress, Table, Space } from 'antd';
import { PlayCircleOutlined, DatabaseOutlined, CheckCircleOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Dummy Data
const workOrders = [
  {
    key: '1',
    orderId: 'WO-101',
    product: 'Widget A',
    status: 'In Progress',
    progress: 65,
  },
  {
    key: '2',
    orderId: 'WO-102',
    product: 'Gadget B',
    status: 'Pending QC',
    progress: 95,
  },
  {
    key: '3',
    orderId: 'WO-103',
    product: 'Device C',
    status: 'Not Started',
    progress: 0,
  },
];

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (value) => <Progress percent={value} size="small" />,
  },
];

const ProductionDashboard = () => {
  return (
    <div style={{ padding: 30 }}>
      <Title level={2} style={{ color: '#2e7d32' }}>
        Production Dashboard
      </Title>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={6}>
          <Card title="View Work Orders" bordered={false}>
            <Button type="primary" icon={<FileSearchOutlined />} block>
              View Orders
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Start New Production" bordered={false}>
            <Button type="primary" icon={<PlayCircleOutlined />} block>
              Start Production
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Inventory Overview" bordered={false}>
            <Button type="primary" icon={<DatabaseOutlined />} block>
              View Inventory
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Ready for Dispatch" bordered={false}>
            <Button type="primary" icon={<CheckCircleOutlined />} block>
              View Dispatch
            </Button>
          </Card>
        </Col>
      </Row>

      <Card
        title="Ongoing Work Orders"
        style={{ marginTop: 30 }}
        bordered={false}
      >
        <Table
          dataSource={workOrders}
          columns={columns}
          pagination={false}
          rowKey="orderId"
        />
      </Card>
    </div>
  );
};

export default ProductionDashboard;
