import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Typography,
  Space,
  Popconfirm,
  Select,
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  CarOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const InventoryPage = () => {
  // Vendors mock or fetched from your vendors source
  const [vendors, setVendors] = useState([
    { key: 'v1', name: 'Alpha Supplies' },
    { key: 'v2', name: 'Beta Tools' },
    { key: 'v3', name: 'Gamma Traders' },
  ]);

  // Inventory items state
  const [items, setItems] = useState([]);
  // Delivery records state
  const [deliveries, setDeliveries] = useState([]);

  const [isItemModalVisible, setIsItemModalVisible] = useState(false);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);

  const [itemForm] = Form.useForm();
  const [deliveryForm] = Form.useForm();

  const [editingItem, setEditingItem] = useState(null);
  const [editingDelivery, setEditingDelivery] = useState(null);

  const tableRef = useRef();

  useEffect(() => {
    // Load dummy inventory
    const dummyItems = [
      {
        key: '1',
        name: 'Laptop',
        category: 'Electronics',
        quantity: 10,
        unitPrice: 800,
        supplier: 'Alpha Supplies',
        supplierKey: 'v1',
        description: 'Dell Inspiron 15',
      },
      {
        key: '2',
        name: 'Hammer',
        category: 'Tools',
        quantity: 50,
        unitPrice: 15,
        supplier: 'Beta Tools',
        supplierKey: 'v2',
        description: 'Steel hammer with rubber grip',
      },
    ];
    setItems(dummyItems);

    // Dummy deliveries
    const dummyDeliveries = [
      {
        key: 'd1',
        itemKey: '1',
        itemName: 'Laptop',
        quantity: 5,
        deliveryDate: moment('2025-05-01'),
        vehicleNo: 'MH12AB1234',
      },
      {
        key: 'd2',
        itemKey: '2',
        itemName: 'Hammer',
        quantity: 10,
        deliveryDate: moment('2025-05-10'),
        vehicleNo: 'MH12XY9876',
      },
    ];
    setDeliveries(dummyDeliveries);
  }, []);

  // Show Item Modal (add/edit)
  const showItemModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      itemForm.setFieldsValue(item);
    } else {
      itemForm.resetFields();
    }
    setIsItemModalVisible(true);
  };

  // Show Delivery Modal (add/edit)
  const showDeliveryModal = (delivery = null) => {
    setEditingDelivery(delivery);
    if (delivery) {
      deliveryForm.setFieldsValue({
        ...delivery,
        deliveryDate: delivery.deliveryDate ? moment(delivery.deliveryDate) : null,
      });
    } else {
      deliveryForm.resetFields();
    }
    setIsDeliveryModalVisible(true);
  };

  // Save Item (add or update)
  const handleItemOk = () => {
    itemForm.validateFields().then((values) => {
      // Link supplier name from vendor list by key
      const vendor = vendors.find((v) => v.key === values.supplierKey);
      const supplierName = vendor ? vendor.name : '';

      if (editingItem) {
        const updated = items.map((i) =>
          i.key === editingItem.key ? { ...i, ...values, supplier: supplierName } : i
        );
        setItems(updated);
        message.success('Item updated');
      } else {
        const newItem = {
          key: Date.now().toString(),
          ...values,
          supplier: supplierName,
        };
        setItems([newItem, ...items]);
        message.success('Item added');
      }
      setIsItemModalVisible(false);
      itemForm.resetFields();
      setEditingItem(null);
    });
  };

  // Save Delivery (add or update)
  const handleDeliveryOk = () => {
    deliveryForm.validateFields().then((values) => {
      // Get item name from items list
      const item = items.find((i) => i.key === values.itemKey);
      const itemName = item ? item.name : '';

      if (editingDelivery) {
        const updated = deliveries.map((d) =>
          d.key === editingDelivery.key ? { ...d, ...values, itemName } : d
        );
        setDeliveries(updated);
        message.success('Delivery updated');
      } else {
        const newDelivery = {
          key: Date.now().toString(),
          ...values,
          itemName,
        };
        setDeliveries([newDelivery, ...deliveries]);

        // Update inventory quantity on delivery (increase quantity)
        const updatedItems = items.map((i) => {
          if (i.key === values.itemKey) {
            return { ...i, quantity: (i.quantity || 0) + values.quantity };
          }
          return i;
        });
        setItems(updatedItems);

        message.success('Delivery added and inventory updated');
      }
      setIsDeliveryModalVisible(false);
      deliveryForm.resetFields();
      setEditingDelivery(null);
    });
  };

  // Delete item and related deliveries
  const deleteItem = (key) => {
    setItems(items.filter((i) => i.key !== key));
    setDeliveries(deliveries.filter((d) => d.itemKey !== key));
    message.success('Item and related deliveries deleted');
  };

  // Delete delivery
  const deleteDelivery = (key) => {
    setDeliveries(deliveries.filter((d) => d.key !== key));
    message.success('Delivery deleted');
  };

  // Export Inventory to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(items);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory.xlsx');
  };

  // Export Deliveries to Excel
  const exportDeliveriesToExcel = () => {
    // Format delivery date to string
    const exportData = deliveries.map((d) => ({
      ...d,
      deliveryDate: d.deliveryDate ? d.deliveryDate.format('YYYY-MM-DD') : '',
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Deliveries');
    XLSX.writeFile(wb, 'deliveries.xlsx');
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
      pdf.save('inventory.pdf');
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
          <Button onClick={() => confirm()} size="small" type="primary">
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small">
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  // Inventory Table columns
  const inventoryColumns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      sorter: (a, b) => a.unitPrice - b.unitPrice,
      render: (val) => `$${val}`,
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      ...getColumnSearchProps('supplier'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showItemModal(record)}
            size="small"
          />
          <Popconfirm
            title="Delete this item? This will remove related deliveries."
            onConfirm={() => deleteItem(record.key)}
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Deliveries Table columns
  const deliveryColumns = [
    {
      title: 'Item',
      dataIndex: 'itemName',
    },
    {
      title: 'Quantity Delivered',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      render: (date) => (date ? date.format('YYYY-MM-DD') : ''),
      sorter: (a, b) =>
        a.deliveryDate && b.deliveryDate
          ? a.deliveryDate.unix() - b.deliveryDate.unix()
          : 0,
    },
    {
      title: 'Vehicle No.',
      dataIndex: 'vehicleNo',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showDeliveryModal(record)}
            size="small"
          />
          <Popconfirm
            title="Delete this delivery record?"
            onConfirm={() => deleteDelivery(record.key)}
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Inventory Management with Delivery Tracking</Title>

      {/* Inventory Controls */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showItemModal()}
        >
          Add Item
        </Button>
        <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>
          Export Inventory to Excel
        </Button>
        <Button icon={<PrinterOutlined />} onClick={printTable}>
          Print
        </Button>
        <Button icon={<FilePdfOutlined />} onClick={saveAsPDF}>
          Save as PDF
        </Button>
      </Space>

      {/* Inventory Table */}
      <div ref={tableRef}>
        <Table
          columns={inventoryColumns}
          dataSource={items}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </div>

      {/* Delivery Controls */}
      <Space style={{ marginTop: 32, marginBottom: 16 }}>
        <Button
          type="dashed"
          icon={<CarOutlined />}
          onClick={() => showDeliveryModal()}
        >
          Add Delivery Record
        </Button>
        <Button icon={<FileExcelOutlined />} onClick={exportDeliveriesToExcel}>
          Export Deliveries to Excel
        </Button>
      </Space>

      {/* Deliveries Table */}
      <Table
        columns={deliveryColumns}
        dataSource={deliveries}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      {/* Item Modal */}
      <Modal
        title={editingItem ? 'Edit Item' : 'Add Item'}
        visible={isItemModalVisible}
        onOk={handleItemOk}
        onCancel={() => setIsItemModalVisible(false)}
        okText="Save"
      >
        <Form form={itemForm} layout="vertical" initialValues={{ quantity: 0, unitPrice: 0 }}>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[{ required: true, message: 'Please enter item name' }]}
          >
            <Input placeholder="Enter item name" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please enter category' }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="unitPrice"
            label="Unit Price"
            rules={[{ required: true, message: 'Please enter unit price' }]}
          >
            <InputNumber
              min={0}
              formatter={(value) => `$ ${value}`}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="supplierKey"
            label="Supplier (Vendor)"
            rules={[{ required: true, message: 'Please select supplier' }]}
          >
            <Select placeholder="Select supplier">
              {vendors.map((v) => (
                <Option key={v.key} value={v.key}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Description (optional)" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delivery Modal */}
      <Modal
        title={editingDelivery ? 'Edit Delivery' : 'Add Delivery Record'}
        visible={isDeliveryModalVisible}
        onOk={handleDeliveryOk}
        onCancel={() => setIsDeliveryModalVisible(false)}
        okText="Save"
      >
        <Form form={deliveryForm} layout="vertical" initialValues={{ quantity: 1 }}>
          <Form.Item
            name="itemKey"
            label="Item"
            rules={[{ required: true, message: 'Please select item' }]}
          >
            <Select placeholder="Select item">
              {items.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity Delivered"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="deliveryDate"
            label="Delivery Date"
            rules={[{ required: true, message: 'Please select delivery date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="vehicleNo"
            label="Vehicle Number"
            rules={[{ required: true, message: 'Please enter vehicle number' }]}
          >
            <Input placeholder="Enter vehicle number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryPage;
