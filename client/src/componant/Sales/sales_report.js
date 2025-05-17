import React, { useState } from 'react';
import { Card, Row, Col, Button, Space, DatePicker, Select } from 'antd';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  DownloadOutlined,
  PrinterOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const COLORS = ['#52c41a', '#389e0d', '#237804', '#135200'];

// Sample data
const salesData = [
  { name: 'Electronics', value: 120000, date: '2025-05-01' },
  { name: 'Furniture', value: 85000, date: '2025-05-02' },
  { name: 'Clothing', value: 65000, date: '2025-05-04' },
  { name: 'Accessories', value: 30000, date: '2025-05-07' }
];

const monthlySalesData = [
  { month: 'Jan', total: 40000 },
  { month: 'Feb', total: 50000 },
  { month: 'Mar', total: 30000 },
  { month: 'Apr', total: 70000 },
  { month: 'May', total: 90000 }
];

const SalesReportPage = () => {
  const [dateRange, setDateRange] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtered pie chart data
  const filteredPieData = salesData.filter((item) => {
    const isInDateRange = !dateRange.length || (
      dayjs(item.date).isAfter(dateRange[0], 'day') &&
      dayjs(item.date).isBefore(dateRange[1], 'day')
    );
    const isCategoryMatch = selectedCategory === 'all' || item.name === selectedCategory;
    return isInDateRange && isCategoryMatch;
  });

  const handlePrint = () => window.print();

  const exportToExcel = () => {
    const table = [['Category', 'Sales'], ...filteredPieData.map(item => [item.name, item.value])];
    const csv = table.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sales-report.csv';
    a.click();
  };

  const exportPDF = () => {
    const win = window.open('', '_blank');
    win.document.write('<html><head><title>Sales Report</title></head><body>');
    win.document.write('<h1>Sales Report</h1><table border="1"><tr><th>Category</th><th>Sales</th></tr>');
    filteredPieData.forEach(item => {
      win.document.write(`<tr><td>${item.name}</td><td>${item.value}</td></tr>`);
    });
    win.document.write('</table></body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <h1>Sales Report & Analytics</h1>
        <Space>
          <RangePicker onChange={(dates) => setDateRange(dates || [])} />
          <Select
            style={{ width: 180 }}
            onChange={value => setSelectedCategory(value)}
            defaultValue="all"
          >
            <Option value="all">All Categories</Option>
            {salesData.map((item) => (
              <Option key={item.name} value={item.name}>{item.name}</Option>
            ))}
          </Select>
          <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
          <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>Export Excel</Button>
          <Button icon={<DownloadOutlined />} onClick={exportPDF}>Export PDF</Button>
        </Space>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Sales by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {filteredPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Monthly Sales">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalesReportPage;
