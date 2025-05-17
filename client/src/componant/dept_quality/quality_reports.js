import React, { useRef, useEffect, useState } from 'react';
import { Table, Button, Space, DatePicker, Select, Upload, message } from 'antd';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const QualityReportsPage = () => {
  const reportRef = useRef();
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  // Initial dummy data
  const initialData = [
    { key: '1', item: 'Engine', process: 'PDI', result: 'Pass', date: '2025-05-17' },
    { key: '2', item: 'Frame', process: 'Welding', result: 'Fail', date: '2025-05-16' },
    { key: '3', item: 'Panel', process: 'Powder-Coating', result: 'Pass', date: '2025-05-15' },
    { key: '4', item: 'Canopy', process: 'Fabrication', result: 'Pass', date: '2025-05-14' },
    { key: '5', item: 'Wheel', process: 'Sheet Cutting', result: 'Fail', date: '2025-05-13' },
  ];

  const [dataSource, setDataSource] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  // Filters state
  const [dateRange, setDateRange] = useState(null); // [moment, moment]
  const [resultFilter, setResultFilter] = useState(null); // 'Pass' | 'Fail' | null

  // Columns with colored result
  const columns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Process', dataIndex: 'process', key: 'process' },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      filters: [
        { text: 'Pass', value: 'Pass' },
        { text: 'Fail', value: 'Fail' },
      ],
      onFilter: (value, record) => record.result === value,
      render: (text) => (
        <span style={{ color: text === 'Pass' ? 'green' : 'red', fontWeight: 'bold' }}>
          {text}
        </span>
      ),
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  // Filter data whenever filters change
  useEffect(() => {
    let filtered = [...dataSource];

    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter(({ date }) => {
        const d = dayjs(date);
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day');
      });
    }

    if (resultFilter) {
      filtered = filtered.filter(({ result }) => result === resultFilter);
    }

    setFilteredData(filtered);
  }, [dateRange, resultFilter, dataSource]);

  // Chart data recalculated from filteredData
  const getChartData = () => {
    const processes = [...new Set(filteredData.map((d) => d.process))];

    // Calculate pass rate per process
    const labels = processes;
    const data = processes.map((process) => {
      const processItems = filteredData.filter((d) => d.process === process);
      if (processItems.length === 0) return 0;
      const passCount = processItems.filter((d) => d.result === 'Pass').length;
      return Math.round((passCount / processItems.length) * 100);
    });

    // Color: green if > 80% pass else red, fallback yellow
    const backgroundColor = data.map((rate) =>
      rate > 80 ? '#4CAF50' : rate > 50 ? '#FFC107' : '#F44336'
    );

    return {
      labels,
      datasets: [
        {
          label: 'Pass Rate (%)',
          data,
          backgroundColor,
        },
      ],
    };
  };

  // Render or update chart on filteredData change
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: getChartData(),
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 10,
                callback: (value) => `${value}%`,
              },
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [filteredData]);

  const exportToExcel = () => {
    const sheetData = filteredData.map(({ item, process, result, date }) => ({
      Item: item,
      Process: process,
      Result: result,
      Date: date,
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quality Report');
    XLSX.writeFile(workbook, 'quality_report.xlsx');
  };

  const exportToPDF = () => {
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'quality_report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(reportRef.current)
      .save();
  };

  const printReport = () => {
    const printContents = reportRef.current.innerHTML;
    const newWin = window.open('', '_blank');
    newWin.document.write(`
      <html>
        <head>
          <title>Print Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            h3 { margin-top: 30px; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
    newWin.document.close();
  };

  // Upload props for XLSX import
  const uploadProps = {
    name: 'file',
    accept: '.xlsx,.xls',
    showUploadList: false,
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Validate and map excel data to our data format
          const newData = jsonData.map((row, idx) => ({
            key: `${dataSource.length + idx + 1}`,
            item: row.Item || 'Unknown',
            process: row.Process || 'Unknown',
            result: row.Result === 'Pass' ? 'Pass' : 'Fail',
            date: row.Date ? dayjs(row.Date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
          }));

          setDataSource((prev) => [...prev, ...newData]);
          message.success('Report(s) uploaded successfully');
        } catch (error) {
          console.error(error);
          message.error('Failed to parse Excel file');
        }
      };
      reader.readAsArrayBuffer(file);
      // Prevent upload since we handle data manually
      return false;
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Quality Reports Dashboard</h2>

      {/* Filters */}
      <Space style={{ marginBottom: 20 }} wrap>
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          allowClear
          placeholder={['Start Date', 'End Date']}
          style={{ minWidth: 240 }}
        />

        <Select
          allowClear
          placeholder="Filter by Result"
          onChange={(val) => setResultFilter(val)}
          style={{ width: 150 }}
        >
          <Option value="Pass">Pass</Option>
          <Option value="Fail">Fail</Option>
        </Select>

        {/* Export and print buttons */}
        <Button type="primary" onClick={exportToExcel}>
          Export Excel
        </Button>
        <Button onClick={exportToPDF}>Export PDF</Button>
        <Button onClick={printReport}>Print</Button>

        {/* Upload */}
        <Upload {...uploadProps}>
          <Button>Upload Reports (Excel)</Button>
        </Upload>
      </Space>

      {/* Report content */}
      <div ref={reportRef}>
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          rowKey="key"
          style={{ marginBottom: 40 }}
        />

        <h3>Process Pass Rate Graph</h3>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default QualityReportsPage;
