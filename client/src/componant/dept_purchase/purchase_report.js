import React, { useState, useRef, useEffect } from 'react';
import { Table, Button, DatePicker, Select, Typography, Space, message } from 'antd';
import { FileExcelOutlined, PrinterOutlined, FilePdfOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dummyInventory = [
  { key: '1', itemName: 'Item A', supplier: 'Supplier X', quantity: 10, vehicleNo: 'AB-1234', deliveryDate: '2025-05-01' },
  { key: '2', itemName: 'Item B', supplier: 'Supplier Y', quantity: 5, vehicleNo: 'XY-5678', deliveryDate: '2025-05-05' },
  { key: '3', itemName: 'Item C', supplier: 'Supplier X', quantity: 20, vehicleNo: 'AB-1234', deliveryDate: '2025-05-10' },
];

const dummyVendors = [
  { key: '1', name: 'Supplier X', address: 'Address 1', dealsIn: 'Electronics', details: '' },
  { key: '2', name: 'Supplier Y', address: 'Address 2', dealsIn: 'Furniture', details: '' },
];

const ReportsPage = () => {
  const [reportType, setReportType] = useState('inventory');
  const [dateRange, setDateRange] = useState([]);
  const [supplierFilter, setSupplierFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();

  // Update filtered data when filters or reportType change
  useEffect(() => {
    let data = reportType === 'inventory' ? dummyInventory : dummyVendors;

    if (reportType === 'inventory') {
      if (dateRange.length === 2) {
        data = data.filter(item => {
          const delivery = moment(item.deliveryDate, 'YYYY-MM-DD');
          return delivery.isBetween(dateRange[0], dateRange[1], 'day', '[]');
        });
      }
      if (supplierFilter) {
        data = data.filter(item => item.supplier === supplierFilter);
      }
    }

    setFilteredData(data);
  }, [dateRange, supplierFilter, reportType]);

  const columnsInventory = [
    { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Vehicle No.', dataIndex: 'vehicleNo', key: 'vehicleNo' },
    { title: 'Delivery Date', dataIndex: 'deliveryDate', key: 'deliveryDate' },
  ];

  const columnsVendors = [
    { title: 'Vendor Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Deals In', dataIndex: 'dealsIn', key: 'dealsIn' },
    { title: 'Details', dataIndex: 'details', key: 'details' },
  ];

  const exportToExcel = () => {
    if (filteredData.length === 0) {
      message.warning('No data to export');
      return;
    }
    const dataToExport = filteredData.map(({ key, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, reportType === 'inventory' ? 'Inventory' : 'Vendors');
    XLSX.writeFile(workbook, `${reportType}_report.xlsx`);
  };

  const printTable = () => {
    if (!tableRef.current) return;
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write('<html><head><title>Report</title>');
    printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #888; padding: 8px; text-align: left; } th { background: #1890ff; color: white; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const saveAsPDF = () => {
    if (!tableRef.current) return;
    html2canvas(tableRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`${reportType}_report.pdf`);
    });
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <Title level={2} style={{ color: '#1890ff', marginBottom: 24 }}>Reports</Title>

      <Space style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        <Select value={reportType} onChange={setReportType} style={{ width: 160 }}>
          <Option value="inventory">Inventory Report</Option>
          <Option value="vendors">Vendors Report</Option>
        </Select>

        {reportType === 'inventory' && (
          <>
            <RangePicker
              onChange={(dates) => setDateRange(dates || [])}
              style={{ width: 260 }}
              allowClear
            />

            <Select
              placeholder="Filter by Supplier"
              allowClear
              style={{ width: 180 }}
              onChange={setSupplierFilter}
              value={supplierFilter}
            >
              {[...new Set(dummyInventory.map(i => i.supplier))].map(sup => (
                <Option key={sup} value={sup}>{sup}</Option>
              ))}
            </Select>
          </>
        )}

        <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>
          Export Excel
        </Button>
        <Button icon={<PrinterOutlined />} onClick={printTable}>
          Print
        </Button>
        <Button icon={<FilePdfOutlined />} onClick={saveAsPDF}>
          Save PDF
        </Button>
      </Space>

      <div ref={tableRef}>
        <Table
          columns={reportType === 'inventory' ? columnsInventory : columnsVendors}
          dataSource={filteredData}
          pagination={{ pageSize: 7 }}
          bordered
          rowKey="key"
        />
      </div>
    </div>
  );
};

export default ReportsPage;
