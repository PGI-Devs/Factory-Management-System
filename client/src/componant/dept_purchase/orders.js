import React, { useState, useRef } from 'react';
import {
  Table,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Popconfirm,
  Tag,
  message,
  Select,
  Row,
  Col,
  Timeline,
  Upload,
  Space,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  SearchOutlined,
  SendOutlined,
  PaperClipOutlined,
  EyeOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const initialOrders = [
  {
    id: 'ORD001',
    productName: 'Hydraulic Press',
    quantity: 3,
    price: 15000,
    discount: 10,
    orderDate: '2025-05-10',
    status: 'Placed',
    history: ['Placed'],
    file: null,
  },
  {
    id: 'ORD002',
    productName: 'Ball Bearings',
    quantity: 50,
    price: 200,
    discount: 5,
    orderDate: '2025-05-12',
    status: 'Approved',
    history: ['Placed', 'Approved'],
    file: null,
  },
  {
    id: 'ORD003',
    productName: 'Gear Motor',
    quantity: 2,
    price: 8000,
    discount: 0,
    orderDate: '2025-05-13',
    status: 'Dispatched',
    history: ['Placed', 'Approved', 'Dispatched'],
    file: null,
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const tableRef = useRef();

  const updateOrderStatus = (id, newStatus) => {
    const updated = orders.map((order) => {
      if (order.id === id) {
        const updatedHistory = [...order.history, newStatus];
        return { ...order, status: newStatus, history: updatedHistory };
      }
      return order;
    });
    setOrders(updated);
    message.success(`Order ${id} marked as ${newStatus}`);
  };

  const handleCreateOrder = (values) => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      ...values,
      orderDate: values.orderDate.format('YYYY-MM-DD'),
      status: 'Placed',
      history: ['Placed'],
      file: null,
    };
    setOrders([newOrder, ...orders]);
    form.resetFields();
    setIsModalVisible(false);
    message.success('Order created');
  };

  const exportToExcel = () => {
    const exportData = filteredOrders.map((order) => ({
      OrderID: order.id,
      Product: order.productName,
      Quantity: order.quantity,
      Price: order.price,
      Discount: order.discount,
      Total: order.quantity * order.price * (1 - order.discount / 100),
      OrderDate: order.orderDate,
      Status: order.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'orders.xlsx');
  };

  const saveAsPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('orders.pdf');
    });
  };

  const printOrders = () => {
  const input = tableRef.current;
  html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Orders</title></head><body>');
    printWindow.document.write(`<img src="${imgData}" style="width:100%" />`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  });
};

  const statusColorMap = {
    Placed: 'orange',
    Approved: 'blue',
    Dispatched: 'green',
    Cancelled: 'red',
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.productName.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter ? o.status === statusFilter : true;
    const matchDate =
      dateRange.length === 2
        ? dayjs(o.orderDate).isBetween(dateRange[0], dateRange[1], null, '[]')
        : true;
    return matchSearch && matchStatus && matchDate;
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      render: (text, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => setSelectedOrder(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'productName',
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
    },
    {
      title: 'Price/Unit (₹)',
      dataIndex: 'price',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discount',
    },
    {
      title: 'Total (₹)',
      render: (_, record) => {
        const total = record.quantity * record.price;
        const discount = (total * record.discount) / 100;
        return total - discount;
      },
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: 'Action',
      render: (_, record) => {
        switch (record.status) {
          case 'Placed':
            return (
              <>
                <Button
                  size="small"
                  type="primary"
                  icon={<CheckOutlined />}
                  style={{ marginRight: 8 }}
                  onClick={() => updateOrderStatus(record.id, 'Approved')}
                >
                  Approve
                </Button>
                <Popconfirm
                  title="Cancel this order?"
                  onConfirm={() => updateOrderStatus(record.id, 'Cancelled')}
                >
                  <Button size="small" icon={<DeleteOutlined />} danger>
                    Cancel
                  </Button>
                </Popconfirm>
              </>
            );
          case 'Approved':
            return (
              <Button
                size="small"
                icon={<SendOutlined />}
                onClick={() => updateOrderStatus(record.id, 'Dispatched')}
              >
                Dispatch
              </Button>
            );
          default:
            return <Tag color="gray">No Action</Tag>;
        }
      },
    },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <Title level={2} style={{ color: '#2e7d32' }}>Orders Dashboard</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Search by product"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Filter by status"
            allowClear
            style={{ width: '100%' }}
            onChange={(val) => setStatusFilter(val)}
          >
            <Option value="Placed">Placed</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Dispatched">Dispatched</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <RangePicker style={{ width: '100%' }} onChange={(dates) => setDateRange(dates || [])} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
            block
          >
            New Order
          </Button>
        </Col>
      </Row>

      <Space style={{ marginBottom: 16 }}>
        <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>Export Excel</Button>
        <Button icon={<PrinterOutlined />} onClick={printOrders}>Print</Button>
        <Button icon={<FilePdfOutlined />} onClick={saveAsPDF}>Save PDF</Button>
      </Space>

      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      <Modal
        title="Create New Order"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Create"
      >
        <Form layout="vertical" form={form} onFinish={handleCreateOrder}>
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: 'Enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Enter quantity' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Price per Unit (₹)"
            name="price"
            rules={[{ required: true, message: 'Enter price' }]}
          >
            <InputNumber min={1} step={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Discount (%)" name="discount" initialValue={0}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Order Date"
            name="orderDate"
            rules={[{ required: true, message: 'Select order date' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(d) => d.isAfter(dayjs())}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={!!selectedOrder}
        title={`Order Details: ${selectedOrder?.id}`}
        footer={null}
        onCancel={() => setSelectedOrder(null)}
      >
        {selectedOrder && (
          <>
            <p><b>Product:</b> {selectedOrder.productName}</p>
            <p><b>Quantity:</b> {selectedOrder.quantity}</p>
            <p><b>Price per Unit:</b> ₹{selectedOrder.price}</p>
            <p><b>Discount:</b> {selectedOrder.discount}%</p>
            <p><b>Total:</b> ₹{selectedOrder.quantity * selectedOrder.price * (1 - selectedOrder.discount / 100)}</p>
            <p><b>Status:</b> <Tag color={statusColorMap[selectedOrder.status]}>{selectedOrder.status}</Tag></p>

            <Timeline items={selectedOrder.history.map(step => ({ children: step }))} />

            <p><b>Invoice:</b></p>
            <Upload
              beforeUpload={() => false}
              onChange={({ file }) => {
                setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, file } : o));
                message.success('File attached');
              }}
            >
              <Button icon={<PaperClipOutlined />}>Attach Invoice</Button>
            </Upload>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
