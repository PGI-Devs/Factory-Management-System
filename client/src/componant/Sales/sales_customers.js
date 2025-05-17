import React, { useState, useRef } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Item } = Form;

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [form] = Form.useForm();
  const detailRef = useRef();

  // Add customer form submit
  const onFinish = values => {
    const newCustomer = {
      id: Date.now(),
      ...values,
    };
    setCustomers(prev => [newCustomer, ...prev]);
    message.success('Customer added');
    form.resetFields();
    setAddModalVisible(false);
  };

  // Show customer details
  const showCustomerDetails = customer => {
    setCurrentCustomer(customer);
    setViewModalVisible(true);
  };

  // Print customer details
  const handlePrint = () => {
    if (!detailRef.current) return;
    const printContents = detailRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Download PDF of customer details
  const handleDownloadPDF = () => {
    if (!detailRef.current) return;

    html2canvas(detailRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`customer_${currentCustomer.id}.pdf`);
    }).catch(() => {
      message.error('Failed to generate PDF');
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showCustomerDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Customers</h1>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setAddModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Customer
      </Button>

      <Table columns={columns} dataSource={customers} rowKey="id" />

      {/* Add Customer Modal */}
      <Modal
        title="Add Customer"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input placeholder="Customer Name" />
          </Item>
          <Item label="Email" name="email" rules={[{ type: 'email', message: 'Invalid email' }]}>
            <Input placeholder="Email" />
          </Item>
          <Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter phone' }]}>
            <Input placeholder="Phone Number" />
          </Item>
          <Item label="Address" name="address">
            <Input.TextArea rows={3} placeholder="Address" />
          </Item>

          <Item>
            <Button type="primary" htmlType="submit" block>
              Add Customer
            </Button>
          </Item>
        </Form>
      </Modal>

      {/* Customer Detail Modal */}
      <Modal
        title="Customer Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />} onClick={handlePrint}>
            Print
          </Button>,
          <Button key="download" icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
            Download PDF
          </Button>,
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={500}
      >
        {currentCustomer && (
          <div ref={detailRef} style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: 20 }}>
            <h2>{currentCustomer.name}</h2>
            <p><b>Email:</b> {currentCustomer.email || '-'}</p>
            <p><b>Phone:</b> {currentCustomer.phone}</p>
            <p><b>Address:</b> {currentCustomer.address || '-'}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomersPage;
