import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Select, Popconfirm, message } from 'antd';
import { PlusOutlined, SearchOutlined, PrinterOutlined, FilePdfOutlined, FileExcelOutlined, UploadOutlined } from '@ant-design/icons';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';

const { Option } = Select;

const initialData = [
  { key: '1', name: 'Steel Rod', category: 'Raw Material', quantity: 50, location: 'Warehouse A', status: 'Available' },
  { key: '2', name: 'Nuts & Bolts', category: 'Hardware', quantity: 200, location: 'Warehouse B', status: 'Available' },
  { key: '3', name: 'Paint', category: 'Chemicals', quantity: 75, location: 'Storage C', status: 'Available' },
  { key: '4', name: 'Wood Planks', category: 'Raw Material', quantity: 120, location: 'Warehouse A', status: 'Available' },
  { key: '5', name: 'Glue', category: 'Chemicals', quantity: 60, location: 'Storage C', status: 'Available' },
  { key: '6', name: 'Screws', category: 'Hardware', quantity: 500, location: 'Warehouse B', status: 'Available' },
  { key: '7', name: 'Varnish', category: 'Chemicals', quantity: 45, location: 'Storage C', status: 'Available' },
  { key: '8', name: 'Copper Wire', category: 'Raw Material', quantity: 80, location: 'Warehouse A', status: 'Available' },
  { key: '9', name: 'Paint Brushes', category: 'Hardware', quantity: 150, location: 'Warehouse B', status: 'Available' },
  { key: '10', name: 'Sandpaper', category: 'Hardware', quantity: 300, location: 'Warehouse B', status: 'Available' },
];

const SalesInventoryPage = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Filter the data based on search and filters
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase()) ||
      item.location.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    const matchesLocation = filterLocation ? item.location === filterLocation : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  const uniqueCategories = [...new Set(data.map(i => i.category))];
  const uniqueLocations = [...new Set(data.map(i => i.location))];
  const uniqueStatus = [...new Set(data.map(i => i.status))];

  const addItem = () => {
    const name = prompt('Enter item name:');
    if (!name) return;
    const category = prompt('Enter category:');
    if (!category) return;
    const quantityStr = prompt('Enter quantity:');
    const quantity = Number(quantityStr);
    if (!quantityStr || isNaN(quantity)) {
      alert('Quantity must be a number');
      return;
    }
    const location = prompt('Enter location:');
    if (!location) return;

    const newItem = {
      key: (data.length + 1).toString(),
      name,
      category,
      quantity,
      location,
      status: 'Available'
    };
    setData([...data, newItem]);
    message.success('Item added');
  };

  const markAsSold = (key) => {
    const newData = data.map(item => {
      if (item.key === key) {
        return {
          ...item,
          status: item.status === 'Available' ? 'Sold' : 'Available'
        };
      }
      return item;
    });
    setData(newData);
    message.success('Item status updated');
  };

  const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title={record.status === 'Available' ? "Mark as Sold?" : "Mark as Available?"}
          onConfirm={() => markAsSold(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type={record.status === 'Available' ? 'primary' : 'default'}>
            {record.status === 'Available' ? 'Mark Sold' : 'Mark Available'}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "inventory.xlsx");
  };

  const importFromExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const importedData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Skip header row & map to objects:
      const keys = importedData[0];
      const items = importedData.slice(1).map((row, i) => {
        let obj = {};
        keys.forEach((key, idx) => {
          obj[key.toLowerCase()] = row[idx];
        });
        return {
          key: (data.length + i + 1).toString(),
          name: obj['item name'] || '',
          category: obj['category'] || '',
          quantity: Number(obj['quantity']) || 0,
          location: obj['location'] || '',
          status: obj['status'] || 'Available',
        };
      });
      setData([...data, ...items]);
      message.success('Imported data successfully');
    };
    reader.readAsBinaryString(file);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const startY = 20;
    const rowHeight = 10;
    const colWidths = [50, 40, 20, 50, 30]; // widths for each column

    // Headers
    const headers = ['Item Name', 'Category', 'Quantity', 'Location', 'Status'];

    // Draw header row
    let x = margin;
    headers.forEach((header, i) => {
      doc.text(header, x + 2, startY);
      x += colWidths[i];
    });

    // Draw horizontal line below header
    doc.line(margin, startY + 2, pageWidth - margin, startY + 2);

    // Draw rows
    data.forEach((item, index) => {
      let y = startY + rowHeight * (index + 1);
      let x = margin;
      const row = [item.name, item.category, item.quantity.toString(), item.location, item.status];

      row.forEach((text, i) => {
        doc.text(text, x + 2, y);
        x += colWidths[i];
      });
    });

    doc.save('inventory.pdf');
  };

  const printTable = () => {
    const printContent = document.getElementById('inventory-table');
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write('<html><head><title>Print Inventory</title>');
    WinPrint.document.write('</head><body >');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.write('</body></html>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <div className="inventory-container" style={{ padding: 20 }}>
      <div className="inventory-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <h1>Inventory Management</h1>
        <Space style={{ flexWrap: 'wrap', gap: 8 }}>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ minWidth: 180 }}
          />

          <Select
            allowClear
            placeholder="Filter by Category"
            value={filterCategory}
            onChange={setFilterCategory}
            style={{ minWidth: 150 }}
          >
            {uniqueCategories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
          </Select>

          <Select
            allowClear
            placeholder="Filter by Location"
            value={filterLocation}
            onChange={setFilterLocation}
            style={{ minWidth: 150 }}
          >
            {uniqueLocations.map(loc => <Option key={loc} value={loc}>{loc}</Option>)}
          </Select>

          <Select
            allowClear
            placeholder="Filter by Status"
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ minWidth: 150 }}
          >
            {uniqueStatus.map(status => <Option key={status} value={status}>{status}</Option>)}
          </Select>

          <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>Add Item</Button>

          <Button icon={<PrinterOutlined />} onClick={printTable}>Print</Button>
          <Button icon={<FilePdfOutlined />} onClick={exportToPDF}>Export PDF</Button>
          <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>Export Excel</Button>

          <label htmlFor="file-upload" style={{ cursor: 'pointer', margin: 0 }}>
            <Button icon={<UploadOutlined />} >
              Import Excel
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            style={{ display: 'none' }}
            onChange={importFromExcel}
          />
        </Space>
      </div>

      <div id="inventory-table">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="key"
          bordered
          size="middle"
        />
      </div>
    </div>
  );
};

export default SalesInventoryPage;
