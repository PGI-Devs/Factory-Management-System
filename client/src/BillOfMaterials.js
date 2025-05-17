import React, { useState, useEffect } from 'react';
import {
  Select,
  Table,
  Typography,
  Card,
  InputNumber,
  Input,
  Button,
  Space,
  Popconfirm,
  message,
  Row,
  Col,
  Tag,
} from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const { Title } = Typography;
const { Option } = Select;

const products = [
  { id: 1, name: 'Bicycle' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Smartphone' },
];

// Simulated stock for inventory items (component name => available quantity)
const inventoryStock = {
  Frame: 5,
  Wheel: 10,
  Chain: 3,
  Pedal: 7,
  Motherboard: 4,
  CPU: 6,
  RAM: 12,
  Battery: 15,
  SSD: 8,
  Screen: 6,
  Camera: 5,
  Processor: 7,
};

const LOCAL_STORAGE_KEY = 'bom_storage';

const defaultBOMs = {
  1: [ // Bicycle components
    { key: '1', component: 'Frame', quantity: 1 },
    { key: '2', component: 'Wheel', quantity: 2 },
    { key: '3', component: 'Chain', quantity: 1 },
    { key: '4', component: 'Pedal', quantity: 2 },
  ],
  2: [ // Laptop components
    { key: '1', component: 'Motherboard', quantity: 1 },
    { key: '2', component: 'CPU', quantity: 1 },
    { key: '3', component: 'RAM', quantity: 2 },
    { key: '4', component: 'Battery', quantity: 1 },
    { key: '5', component: 'SSD', quantity: 1 },
  ],
  3: [ // Smartphone components
    { key: '1', component: 'Screen', quantity: 1 },
    { key: '2', component: 'Battery', quantity: 1 },
    { key: '3', component: 'Camera', quantity: 2 },
    { key: '4', component: 'Processor', quantity: 1 },
  ],
};

const BillOfMaterials = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({ component: '', quantity: 1 });
  const [loading, setLoading] = useState(false);

  // Load saved BOMs from localStorage or default data
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (selectedProductId && parsed[selectedProductId]) {
        setComponents(parsed[selectedProductId]);
      }
    } else {
      // load default on first mount or on product change
      if (selectedProductId) {
        setComponents(defaultBOMs[selectedProductId] || []);
      }
    }
  }, [selectedProductId]);

  // Save components to localStorage whenever components or product changes
  useEffect(() => {
    if (!selectedProductId) return;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[selectedProductId] = components;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
  }, [components, selectedProductId]);

  // Handle product selection change
  const handleProductChange = (value) => {
    setSelectedProductId(value);
    setNewComponent({ component: '', quantity: 1 });
  };

  // Add new component row
  const handleAddComponent = () => {
    if (!newComponent.component.trim()) {
      message.error('Component name cannot be empty');
      return;
    }
    if (newComponent.quantity <= 0) {
      message.error('Quantity must be positive');
      return;
    }

    // Check for duplicates
    if (components.find((c) => c.component.toLowerCase() === newComponent.component.trim().toLowerCase())) {
      message.error('Component already exists');
      return;
    }

    const newKey = components.length > 0 ? String(Number(components[components.length - 1].key) + 1) : '1';
    setComponents([
      ...components,
      { key: newKey, component: newComponent.component.trim(), quantity: newComponent.quantity },
    ]);
    setNewComponent({ component: '', quantity: 1 });
    message.success('Component added');
  };

  // Remove a component
  const handleDelete = (key) => {
    setComponents(components.filter((c) => c.key !== key));
    message.success('Component removed');
  };

  // Update quantity inline
  const handleQuantityChange = (key, value) => {
    if (value <= 0) return;
    setComponents(
      components.map((c) => (c.key === key ? { ...c, quantity: value } : c))
    );
  };

  // Update component name inline
  const handleComponentChange = (key, value) => {
    setComponents(
      components.map((c) => (c.key === key ? { ...c, component: value } : c))
    );
  };

  // Export BOM to Excel
  const exportToExcel = () => {
    if (!selectedProductId) {
      message.warning('Select a product first');
      return;
    }
    if (components.length === 0) {
      message.warning('No components to export');
      return;
    }
    setLoading(true);

    const worksheet = XLSX.utils.json_to_sheet(components.map(({ key, ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BOM');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `BOM_${products.find(p => p.id === selectedProductId)?.name || 'product'}.xlsx`);

    setLoading(false);
    message.success('BOM exported to Excel');
  };

  // Print BOM
  const handlePrint = () => {
    if (!selectedProductId) {
      message.warning('Select a product first');
      return;
    }
    if (components.length === 0) {
      message.warning('No components to print');
      return;
    }
    const printContent = `
      <html>
        <head>
          <title>BOM Print</title>
          <style>
            table {
              width: 100%; border-collapse: collapse;
            }
            th, td {
              border: 1px solid #333; padding: 8px; text-align: left;
            }
            th {
              background: #eee;
            }
          </style>
        </head>
        <body>
          <h1>Bill of Materials - ${products.find(p => p.id === selectedProductId)?.name}</h1>
          <table>
            <thead>
              <tr><th>Component</th><th>Quantity</th><th>Stock Status</th></tr>
            </thead>
            <tbody>
              ${components
                .map(({ component, quantity }) => {
                  const stock = inventoryStock[component] ?? 0;
                  const stockStatus = stock >= quantity
                    ? '<span style="color:green;">In Stock</span>'
                    : `<span style="color:red;">Low Stock (${stock})</span>`;
                  return `<tr><td>${component}</td><td>${quantity}</td><td>${stockStatus}</td></tr>`;
                })
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const columns = [
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleComponentChange(record.key, e.target.value)}
          placeholder="Component name"
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      render: (value, record) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => handleQuantityChange(record.key, val)}
        />
      ),
    },
    {
      title: 'Stock Status',
      key: 'stock',
      render: (_, record) => {
        const stock = inventoryStock[record.component] ?? 0;
        return stock >= record.quantity ? (
          <Tag color="green">In Stock ({stock})</Tag>
        ) : (
          <Tag color="red">Low Stock ({stock})</Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure delete this component?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Bill of Materials
      </Title>

      <Card style={{ marginBottom: 20 }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Select
              placeholder="Select a product"
              style={{ width: '100%' }}
              onChange={handleProductChange}
              value={selectedProductId}
              allowClear
            >
              {products.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      {selectedProductId && (
        <>
          <Table
            dataSource={components}
            columns={columns}
            pagination={false}
            bordered
            rowKey="key"
            summary={() => {
              const total = components.reduce((sum, c) => sum + c.quantity, 0);
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell>Total Components</Table.Summary.Cell>
                  <Table.Summary.Cell>{total}</Table.Summary.Cell>
                  <Table.Summary.Cell />
                  <Table.Summary.Cell />
                </Table.Summary.Row>
              );
            }}
          />

          <Card
            size="small"
            style={{ marginTop: 20, background: '#fafafa' }}
            title="Add New Component"
          >
            <Space>
              <Input
                placeholder="Component name"
                value={newComponent.component}
                onChange={(e) =>
                  setNewComponent((prev) => ({ ...prev, component: e.target.value }))
                }
              />
              <InputNumber
                min={1}
                placeholder="Quantity"
                value={newComponent.quantity}
                onChange={(val) =>
                  setNewComponent((prev) => ({ ...prev, quantity: val || 1 }))
                }
              />
              <Button type="primary" onClick={handleAddComponent}>
                Add Component
              </Button>
            </Space>
          </Card>

          <Row justify="end" style={{ marginTop: 20 }} gutter={16}>
            <Col>
              <Button onClick={handlePrint}>Print BOM</Button>
            </Col>
            <Col>
              <Button type="primary" loading={loading} onClick={exportToExcel}>
                Export to Excel
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default BillOfMaterials;
