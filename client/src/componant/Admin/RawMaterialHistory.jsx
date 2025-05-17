import React, { useState, useRef } from 'react';
import { Table, Input, Button, DatePicker } from 'antd';
import { AiOutlineHistory, AiOutlineSearch, AiOutlineDownload, AiOutlinePrinter, AiFillFilePdf } from 'react-icons/ai';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const RawMaterialHistory = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredDates, setFilteredDates] = useState([]);

  const printRef = useRef();

  const rawData = [
    { key: '1', date: '2025-05-10', item_code: 'ELC-001', item_name: 'Voltage Regulator', action: 'Added', quantity: 10, remarks: 'Initial stock received' },
    { key: '2', date: '2025-05-11', item_code: 'HDW-004', item_name: 'Hex Bolt M12', action: 'Issued', quantity: -50, remarks: 'Issued to maintenance team' },
    { key: '3', date: '2025-05-12', item_code: 'MCH-002', item_name: 'Crankshaft', action: 'Added', quantity: 5, remarks: 'Received from supplier' },
    { key: '4', date: '2025-05-13', item_code: 'TOL-010', item_name: 'Torque Wrench', action: 'Updated', quantity: 0, remarks: 'Updated specifications' },
    { key: '5', date: '2025-05-14', item_code: 'LUB-005', item_name: 'Engine Oil', action: 'Issued', quantity: -20, remarks: 'Used in engine testing' }
  ];

  const filteredData = rawData.filter((entry) => {
    const matchesSearch = entry.item_name.toLowerCase().includes(searchText.toLowerCase());
    const withinDateRange =
      filteredDates.length === 0 ||
      (dayjs(entry.date).isAfter(filteredDates[0].startOf('day')) &&
        dayjs(entry.date).isBefore(filteredDates[1].endOf('day')));
    return matchesSearch && withinDateRange;
  });

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix() },
    { title: 'Item Code', dataIndex: 'item_code', key: 'item_code' },
    { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      filters: ['Added', 'Issued', 'Updated'].map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.action === value,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: value => (
        <span style={{ color: value < 0 ? 'red' : value > 0 ? 'green' : 'gray' }}>{value}</span>
      )
    },
    { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' }
  ];

  // PDF Export
  const handlePDFExport = () => {
    const input = printRef.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const width = canvas.width * ratio;
      const height = canvas.height * ratio;
      pdf.addImage(imgData, 'PNG', 20, 20, width, height);
      pdf.save('raw_material_history.pdf');
    });
  };

  // Print only the table
  const handleNativePrint = () => {
    const input = printRef.current;
    html2canvas(input).then(canvas => {
      const dataUrl = canvas.toDataURL();
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                text-align: center;
              }
              img {
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AiOutlineHistory /> Raw Material History
      </h3>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <Input
          placeholder="Search Item Name"
          prefix={<AiOutlineSearch />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
        <RangePicker
          onChange={(dates) => setFilteredDates(dates || [])}
          style={{ width: 280 }}
        />
        <CSVLink data={filteredData} filename="raw_material_history.csv">
          <Button icon={<AiOutlineDownload />} type="primary">Export CSV</Button>
        </CSVLink>
        <Button icon={<AiFillFilePdf />} onClick={handlePDFExport}>Export PDF</Button>
        <Button onClick={handleNativePrint} icon={<AiOutlinePrinter />}>Print Table Only</Button>
      </div>

      <div ref={printRef}>
        <Table columns={columns} dataSource={filteredData} pagination={false} bordered size="small" />
      </div>
    </div>
  );
};

export default RawMaterialHistory;
