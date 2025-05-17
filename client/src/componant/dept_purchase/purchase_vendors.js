import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Space,
  Popconfirm,
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Title } = Typography;

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingVendor, setEditingVendor] = useState(null);
  const tableRef = useRef();

  // Load dummy data on mount
  useEffect(() => {
    const dummyVendors = [
      {
        key: '1',
        name: 'Alpha Supplies',
        address: '123 Main St, Springfield',
        dealsIn: 'Electronics',
        details: 'Bulk supplier for microchips and sensors',
      },
      {
        key: '2',
        name: 'Beta Tools',
        address: '456 Industrial Zone, Metropolis',
        dealsIn: 'Mechanical Tools',
        details: 'Provides industrial grade toolkits',
      },
      {
        key: '3',
        name: 'Gamma Traders',
        address: '789 Central Ave, Gotham',
        dealsIn: 'Safety Equipment',
        details: 'Helmets, gloves, and safety gear',
      },
    ];
    setVendors(dummyVendors);
  }, []);

  const showModal = (vendor = null) => {
    setEditingVendor(vendor);
    if (vendor) {
      form.setFieldsValue(vendor);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingVendor) {
        const updated = vendors.map((v) =>
          v.key === editingVendor.key ? { ...v, ...values } : v
        );
        setVendors(updated);
        message.success('Vendor updated');
      } else {
        const newVendor = {
          key: Date.now().toString(),
          ...values,
        };
        setVendors([newVendor, ...vendors]);
        message.success('Vendor added');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingVendor(null);
    });
  };

  const deleteVendor = (key) => {
    setVendors(vendors.filter((v) => v.key !== key));
    message.success('Vendor deleted');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(vendors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendors');
    XLSX.writeFile(wb, 'vendors.xlsx');
  };

  const printTable = () => {
    window.print();
  };

  const saveAsPDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('vendors.pdf');
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button onClick={() => confirm()} size="small" type="primary">Search</Button>
          <Button onClick={() => clearFilters()} size="small">Reset</Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: 'Vendor Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Deals In',
      dataIndex: 'dealsIn',
      ...getColumnSearchProps('dealsIn'),
    },
    {
      title: 'Additional Details',
      dataIndex: 'details',
      ...getColumnSearchProps('details'),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} size="small">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this vendor?"
            onConfirm={() => deleteVendor(record.key)}
          >
            <Button icon={<DeleteOutlined />} danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <Title level={2} style={{ color: '#2e7d32' }}>Vendors</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Vendor
        </Button>
        <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>Export to Excel</Button>
        <Button icon={<PrinterOutlined />} onClick={printTable}>Print</Button>
        <Button icon={<FilePdfOutlined />} onClick={saveAsPDF}>Save to PDF</Button>
      </Space>

      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={vendors}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </div>

      <Modal
        title={editingVendor ? 'Edit Vendor' : 'Add Vendor'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingVendor(null);
        }}
        okText={editingVendor ? 'Update' : 'Add'}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Vendor Name" name="name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item label="Deals In" name="dealsIn" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item label="Additional Details" name="details"> <Input.TextArea rows={3} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorsPage;
