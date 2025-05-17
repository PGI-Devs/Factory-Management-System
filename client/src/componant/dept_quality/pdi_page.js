
import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

import './pdi.css';

function PDIPage() {
  const [finishedGoods, setFinishedGoods] = useState([]);
  const [results, setResults] = useState({});
  const tableRef = useRef();

  useEffect(() => {
    const mockGoods = [
      { id: 1, name: 'Generator Model A' },
      { id: 2, name: 'Pump Assembly B' },
      { id: 3, name: 'Compressor C' },
    ];
    setFinishedGoods(mockGoods);
  }, []);

  const handleChange = (id, field, value) => {
    setResults((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Submitted PDI:', results);
    alert('PDI submitted successfully!');
  };

  const exportToExcel = () => {
    const data = finishedGoods.map((item) => ({
      Item: item.name,
      'Test Result': results[item.id]?.status || '',
      Remarks: results[item.id]?.remarks || ''
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PDI Results');
    XLSX.writeFile(workbook, 'PDI_Results.xlsx');
  };

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('PDI Results', 14, 20);

  let y = 30; // Initial vertical position
  doc.setFontSize(12);
  doc.text('Item', 14, y);
  doc.text('Test Result', 80, y);
  doc.text('Remarks', 140, y);
  y += 10;

  finishedGoods.forEach((item) => {
    const status = results[item.id]?.status || '';
    const remarks = results[item.id]?.remarks || '';
    doc.text(item.name, 14, y);
    doc.text(status, 80, y);
    doc.text(remarks, 140, y);
    y += 10;

    // Start new page if content goes beyond page height
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('PDI_Results.pdf');
};


  const printTable = () => {
    const printContent = tableRef.current.innerHTML;
    const win = window.open('', '', 'width=900,height=700');
    win.document.write(`
      <html>
        <head>
          <title>Print PDI Report</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>PDI Report</h2>
          <table>${printContent}</table>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="pdi-page">
      <h2>Pre-Delivery Inspection (PDI)</h2>
      <div className="action-buttons">
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={printTable}>Print</button>
      </div>
      <table className="pdi-table" ref={tableRef}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Test Result</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {finishedGoods.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <select
                  value={results[item.id]?.status || ''}
                  onChange={(e) => handleChange(item.id, 'status', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={results[item.id]?.remarks || ''}
                  onChange={(e) => handleChange(item.id, 'remarks', e.target.value)}
                  placeholder="Remarks"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Inspection
      </button>
    </div>
  );
}

export default PDIPage;
