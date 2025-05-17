import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import * as XLSX from 'xlsx';
import {
  AiOutlineFileExcel,
  AiOutlineFileText,
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineUpload
} from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = [
  { itemId: 'I001', itemName: 'Steel Rod', category: 'Raw Material', quantity: 100, price: 250 },
  { itemId: 'I002', itemName: 'Plastic Sheets', category: 'Packaging', quantity: 200, price: 75 },
  { itemId: 'I003', itemName: 'Copper Wire', category: 'Electrical', quantity: 50, price: 400 },
  { itemId: 'I004', itemName: 'Paint', category: 'Finishing', quantity: 30, price: 150 },
  { itemId: 'I005', itemName: 'Bolts', category: 'Hardware', quantity: 500, price: 5 },
  { itemId: 'I006', itemName: 'Aluminum Sheets', category: 'Raw Material', quantity: 150, price: 180 },
  { itemId: 'I007', itemName: 'Screws', category: 'Hardware', quantity: 1000, price: 2 },
  { itemId: 'I008', itemName: 'PVC Pipes', category: 'Plumbing', quantity: 80, price: 300 },
  { itemId: 'I009', itemName: 'Rubber Seals', category: 'Sealing', quantity: 250, price: 10 },
  { itemId: 'I010', itemName: 'Glass Panels', category: 'Finishing', quantity: 40, price: 500 },
  { itemId: 'I011', itemName: 'Copper Tubes', category: 'Electrical', quantity: 60, price: 350 },
  { itemId: 'I012', itemName: 'Paint Brushes', category: 'Finishing', quantity: 120, price: 15 },
  { itemId: 'I013', itemName: 'Nails', category: 'Hardware', quantity: 800, price: 1 },
  { itemId: 'I014', itemName: 'Electrical Tape', category: 'Electrical', quantity: 300, price: 7 },
  { itemId: 'I015', itemName: 'Steel Plates', category: 'Raw Material', quantity: 90, price: 400 },
  { itemId: 'I016', itemName: 'Glue', category: 'Finishing', quantity: 70, price: 20 },
  { itemId: 'I017', itemName: 'Sandpaper', category: 'Finishing', quantity: 200, price: 5 },
  { itemId: 'I018', itemName: 'Plastic Caps', category: 'Packaging', quantity: 600, price: 3 },
  { itemId: 'I019', itemName: 'Thread', category: 'Sewing', quantity: 150, price: 8 },
  { itemId: 'I020', itemName: 'Washers', category: 'Hardware', quantity: 400, price: 4 },
];

const ExcelTemplate = () => {
  const [data, setData] = useState(initialData);
  const [importing, setImporting] = useState(false);
  const [importedFileName, setImportedFileName] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingImportData, setPendingImportData] = useState(null);
  const [pendingImportColumns, setPendingImportColumns] = useState(null);

  const validateRow = (item) => {
    return (
      item.itemId?.toString().trim() &&
      item.itemName?.toString().trim() &&
      item.category?.toString().trim() &&
      Number(item.quantity) >= 0 &&
      Number(item.price) >= 0
    );
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setData(updated);
  };

  const handleAddRow = () => {
    setData([...data, { itemId: '', itemName: '', category: '', quantity: 0, price: 0 }]);
    toast.success('Row added!');
  };

  const handleDeleteRow = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
    toast.info('Row deleted!');
  };

  const handleDownloadExcel = () => {
    const worksheetData = [
      ['Item ID', 'Item Name', 'Category', 'Quantity', 'Price'],
      ...data.map(item => [item.itemId, item.itemName, item.category, item.quantity, item.price]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
    XLSX.writeFile(workbook, 'Inventory_Data.xlsx');
    toast.success('Excel downloaded!');
  };

  const handleDownloadCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Inventory_Data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV downloaded!');
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
    toast.info('Row reordered!');
  };

  // --- Import File Handlers & UI Enhancements ---

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      toast.error('Unsupported file format. Please upload .xlsx or .xls file.');
      event.target.value = null;
      return;
    }

    setImporting(true);
    setImportedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (jsonData.length === 0) {
          toast.error('Excel file is empty!');
          setImporting(false);
          event.target.value = null;
          return;
        }

        const fileCols = Object.keys(jsonData[0]);
        const previewRows = jsonData.slice(0, 3);

        setPendingImportData(jsonData);
        setPendingImportColumns(fileCols);
        setPreviewData(previewRows);
        setShowConfirmModal(true);
      } catch (error) {
        toast.error('Failed to parse Excel file. Please check the file and try again.');
        setImporting(false);
        event.target.value = null;
      }
    };
    reader.readAsBinaryString(file);
    event.target.value = null;
  };

  const confirmImport = () => {
    // Convert quantity and price fields to number safely
    const formattedData = pendingImportData.map((row) => {
      const newRow = { ...row };
      if ('quantity' in newRow) newRow.quantity = Number(newRow.quantity) || 0;
      if ('price' in newRow) newRow.price = Number(newRow.price) || 0;
      return newRow;
    });

    setData(formattedData);
    setShowConfirmModal(false);
    setImporting(false);
    toast.success('Data imported successfully!');
  };

  const cancelImport = () => {
    setShowConfirmModal(false);
    setImporting(false);
    setPendingImportData(null);
    setPendingImportColumns(null);
    setPreviewData(null);
    toast.info('Import cancelled.');
  };

  return (
        <div className='layoutContainer'>
    <Sidebar/>
    <div style={{ padding: '20px' }}>
   
      <ToastContainer position="bottom-right" />
      <h2>Inventory Items (Draggable + Editable)</h2>

      {/* Import Button */}
      <label
        htmlFor="importExcelFile"
        style={{
          cursor: importing ? 'not-allowed' : 'pointer',
          backgroundColor: '#17a2b8',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '5px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '10px',
          userSelect: 'none',
        }}
      >
        <AiOutlineUpload />
        {importing ? 'Importing...' : 'Import Excel'}
      </label>
      <input
        id="importExcelFile"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleImportFile}
        style={{ display: 'none' }}
        disabled={importing}
      />

      {/* Show last imported file name */}
      {importedFileName && !showConfirmModal && (
        <p style={{ fontStyle: 'italic' }}>
          Last imported file: <strong>{importedFileName}</strong>
        </p>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              zIndex: 1000,
              width: '90%',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <h3>Confirm Import</h3>
            <p>You are about to replace the current data with this file's data. Preview (first 3 rows):</p>

            <div style={{ overflowX: 'auto', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#207245', color: 'white' }}>
                  <tr>
                    {pendingImportColumns.map((col) => (
                      <th key={col} style={{ border: '1px solid #ddd', padding: '6px' }}>
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i}>
                      {pendingImportColumns.map((col) => (
                        <td key={col} style={{ border: '1px solid #ddd', padding: '6px' }}>
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={cancelImport}
                style={{
                  backgroundColor: '#d9534f',
                  color: 'white',
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmImport}
                style={{
                  backgroundColor: '#5cb85c',
                  color: 'white',
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Confirm Import
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div
            onClick={cancelImport}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 999,
              cursor: 'pointer',
            }}
          />
        </>
      )}

      {/* Table */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-table">
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              <thead style={{ backgroundColor: '#207245', color: 'white' }}>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '6px' }}>Item ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '6px' }}>Item Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '6px' }}>Category</th>
                  <th style={{ border: '1px solid #ddd', padding: '6px' }}>Quantity</th>
                  <th style={{ border: '1px solid #ddd', padding: '6px' }}>Price</th>
                  <th style={{ border: '1px solid #ddd', padding: '6px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const isValid = validateRow(item);
                  return (
                    <Draggable key={index} draggableId={`row-${index}`} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            backgroundColor: snapshot.isDragging ? '#f0fff0' : 'white',
                            border: isValid ? '1px solid #ddd' : '2px solid #d9534f',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <td style={{ border: '1px solid #ddd', padding: '6px' }}>
                            <input
                              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
                              value={item.itemId}
                              onChange={(e) => handleChange(index, 'itemId', e.target.value)}
                              placeholder="Item ID"
                            />
                          </td>
                          <td style={{ border: '1px solid #ddd', padding: '6px' }}>
                            <input
                              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
                              value={item.itemName}
                              onChange={(e) => handleChange(index, 'itemName', e.target.value)}
                              placeholder="Item Name"
                            />
                          </td>
                          <td style={{ border: '1px solid #ddd', padding: '6px' }}>
                            <input
                              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
                              value={item.category}
                              onChange={(e) => handleChange(index, 'category', e.target.value)}
                              placeholder="Category"
                            />
                          </td>
                          <td style={{ border: '1px solid #ddd', padding: '6px' }}>
                            <input
                              type="number"
                              min="0"
                              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
                              value={item.quantity}
                              onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                            />
                          </td>
                          <td style={{ border: '1px solid #ddd', padding: '6px' }}>
                            <input
                              type="number"
                              min="0"
                              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
                              value={item.price}
                              onChange={(e) => handleChange(index, 'price', e.target.value)}
                            />
                          </td>
                          <td
                            style={{
                              border: '1px solid #ddd',
                              padding: '6px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              color: '#d9534f',
                            }}
                            title="Delete Row"
                            onClick={() => handleDeleteRow(index)}
                          >
                            <AiOutlineDelete size={20} />
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button
          onClick={handleAddRow}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <AiOutlinePlusCircle /> Add Row
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDownloadExcel}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <AiOutlineFileExcel /> Export Excel
          </button>

          <button
            onClick={handleDownloadCSV}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <AiOutlineFileText /> Export CSV
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExcelTemplate;
