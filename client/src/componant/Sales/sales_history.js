import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Select,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  message,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  PrinterOutlined,
  FileExcelOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Option } = Select;

const SalesHistoryPage = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredSales, setFilteredSales] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const tableRef = useRef(null);

  useEffect(() => {
    // Dummy data
    const data = [
      {
        key: '1',
        product: 'Wrench',
        customer: 'ABC Ltd',
        amount: 500,
        date: dayjs().subtract(1, 'day'),
        salesperson: 'Admin',
        profit: 150,
      },
      {
        key: '2',
        product: 'Gear',
        customer: 'XYZ Pvt',
        amount: 800,
        date: dayjs().subtract(10, 'day'),
        salesperson: 'Manager',
        profit: 250,
      },
      {
        key: '3',
        product: 'Bolt Set',
        customer: 'LMN Corp',
        amount: 1200,
        date: dayjs().subtract(25, 'day'),
        salesperson: 'Admin',
        profit: 400,
      },
    ];
    setSales(data);
  }, []);

  useEffect(() => {
    let data = [...sales];

    if (search) {
      data = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (filter !== 'all') {
      const now = dayjs();
      data = data.filter(item => {
        const saleDate = dayjs(item.date);
        switch (filter) {
          case 'day':
            return saleDate.isSame(now, 'day');
          case 'week':
            return saleDate.isSame(now, 'week');
          case 'month':
            return saleDate.isSame(now, 'month');
          case 'year':
            return saleDate.isSame(now, 'year');
          default:
            return true;
        }
      });
    }

    setFilteredSales(data);
  }, [sales, search, filter]);

  const handleAddSale = values => {
    const newSale = {
      key: (sales.length + 1).toString(),
      ...values,
      date: dayjs(values.date),
    };
    setSales([...sales, newSale]);
    message.success('Sale added successfully!');
    setModalVisible(false);
    form.resetFields();
  };

  const handleDelete = key => {
    Modal.confirm({
      title: 'Are you sure you want to delete this sale?',
      onOk: () => {
        setSales(prev => prev.filter(item => item.key !== key));
        message.success('Sale deleted');
      },
    });
  };

  const totalRevenue = filteredSales.reduce((acc, item) => acc + item.amount, 0);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
    },
    {
      title: 'Salesperson',
      dataIndex: 'salesperson',
      key: 'salesperson',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  // Export to Excel function
  const exportToExcel = () => {
    if (filteredSales.length === 0) {
      message.warning('No data to export!');
      return;
    }

    const dataToExport = filteredSales.map(({ product, customer, amount, profit, salesperson, date }) => ({
      Product: product,
      Customer: customer,
      Amount: amount,
      Profit: profit,
      Salesperson: salesperson,
      Date: dayjs(date).format('YYYY-MM-DD'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesHistory');
    XLSX.writeFile(workbook, 'SalesHistory.xlsx');
  };

  // Export to PDF function
  const exportToPDF = () => {
    if (!tableRef.current) {
      message.error('Nothing to export!');
      return;
    }

    html2canvas(tableRef.current, { scale: 2 })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('SalesHistory.pdf');
      })
      .catch(() => {
        message.error('Failed to generate PDF');
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Sales History</h1>

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={filter} onChange={setFilter} style={{ width: 150 }}>
          <Option value="all">All</Option>
          <Option value="day">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
          <Option value="year">This Year</Option>
        </Select>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          Add New Sale
        </Button>

        <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
          Print
        </Button>

        <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>
          Export Excel
        </Button>

        <Button icon={<DownloadOutlined />} onClick={exportToPDF}>
          Download PDF
        </Button>
      </Space>

      <h3>Total Revenue: ₹{totalRevenue}</h3>

      {/* Wrap the table to capture for PDF */}
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredSales}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>

      <Modal
        title="Add New Sale"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddSale}>
          <Form.Item label="Product" name="product" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Customer" name="customer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Salesperson" name="salesperson" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Profit" name="profit" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalesHistoryPage;
