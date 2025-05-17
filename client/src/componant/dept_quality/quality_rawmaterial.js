import React, { useRef, useState } from 'react';
import {
  Table, Button, Modal, Form, Input, Space, Typography, Popconfirm, message, DatePicker, Tag,
} from 'antd';
import {
  PlusOutlined, FileExcelOutlined, FilePdfOutlined, PrinterOutlined, DeleteOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const RawMaterialsPage = () => {
  const dummyData = [
    {
      key: '1',
      date: '2025-05-01',
      name: 'Steel Rods',
      batch: 'SR001',
      inspector: 'John Doe',
      result: 'Pass',
      remarks: 'Meets all specifications',
    },
    {
      key: '2',
      date: '2025-05-02',
      name: 'Aluminum Sheets',
      batch: 'AL023',
      inspector: 'Jane Smith',
      result: 'Fail',
      remarks: 'Surface defects noted',
    },
    {
      key: '3',
      date: '2025-05-03',
      name: 'Copper Wire',
      batch: 'CW045',
      inspector: 'Ali Khan',
      result: 'Pass',
      remarks: 'Good conductivity',
    },
    {
      key: '4',
      date: '2025-05-04',
      name: 'Plastic Granules',
      batch: 'PG034',
      inspector: 'Meena Roy',
      result: 'Borderline',
      remarks: 'Moisture content slightly high',
    },
    {
      key: '5',
      date: '2025-05-05',
      name: 'Rubber Sheets',
      batch: 'RS019',
      inspector: 'Sara Paul',
      result: 'Pass',
      remarks: 'Durability tested okay',
    },
    {
      key: '6',
      date: '2025-05-06',
      name: 'Glass Tubes',
      batch: 'GT112',
      inspector: 'Amit Das',
      result: 'Fail',
      remarks: 'Cracks found during inspection',
    },
    {
      key: '7',
      date: '2025-05-07',
      name: 'Carbon Powder',
      batch: 'CP056',
      inspector: 'Nina Patil',
      result: 'Pass',
      remarks: 'Particle size within range',
    },
    {
      key: '8',
      date: '2025-05-08',
      name: 'PVC Resin',
      batch: 'PR089',
      inspector: 'Rahul Mehra',
      result: 'Borderline',
      remarks: 'Requires recheck on viscosity',
    },
    {
      key: '9',
      date: '2025-05-09',
      name: 'Iron Plates',
      batch: 'IP101',
      inspector: 'Lara Singh',
      result: 'Pass',
      remarks: 'All tests cleared',
    },
    {
      key: '10',
      date: '2025-05-10',
      name: 'Silicon Chips',
      batch: 'SC990',
      inspector: 'Dev Kumar',
      result: 'Fail',
      remarks: 'Failed thermal stress test',
    },
  ];

  const [data, setData] = useState(dummyData);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);
  const [filterDates, setFilterDates] = useState(null);
  const tableRef = useRef();

  const showModal = (record = null) => {
    if (record) {
      form.setFieldsValue({ ...record, date: dayjs(record.date) });
      setEditing(record);
    } else {
      form.resetFields();
      setEditing(null);
    }
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const entry = {
        ...values,
        key: editing ? editing.key : Date.now().toString(),
        date: values.date.format('YYYY-MM-DD'),
      };

      const updated = editing
        ? data.map(item => (item.key === editing.key ? { ...item, ...entry } : item))
        : [entry, ...data];

      setData(updated);
      setFilteredData(applyDateFilter(updated));
      message.success(editing ? 'Record updated' : 'Record added');
      setIsModalVisible(false);
      setEditing(null);
      form.resetFields();
    });
  };

  const deleteRecord = key => {
    const updated = data.filter(item => item.key !== key);
    setData(updated);
    setFilteredData(applyDateFilter(updated));
    message.success('Record deleted');
  };

  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(filteredData);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, 'RawMaterialReport');
    XLSX.writeFile(book, 'raw_material_quality.xlsx');
  };

  const exportPDF = () => {
    html2canvas(tableRef.current).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(img, 'PNG', 10, 10, 190, 0);
      pdf.save('raw_material_quality.pdf');
    });
  };

  const printData = () => {
    window.print();
  };

  const applyDateFilter = (dataSet) => {
    if (!filterDates) return dataSet;
    return dataSet.filter(item => {
      const checkDate = dayjs(item.date);
      return (
        checkDate.isAfter(filterDates[0].startOf('day')) &&
        checkDate.isBefore(filterDates[1].endOf('day'))
      );
    });
  };

  const onDateRangeChange = (dates) => {
    setFilterDates(dates);
    setFilteredData(dates ? applyDateFilter(data) : data);
  };

  const getResultTag = (result) => {
    const r = result.toLowerCase();
    if (r.includes('pass')) return <Tag color="green">Pass</Tag>;
    if (r.includes('fail')) return <Tag color="red">Fail</Tag>;
    return <Tag color="orange">{result}</Tag>;
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix() },
    { title: 'Material Name', dataIndex: 'name' },
    { title: 'Batch No.', dataIndex: 'batch' },
    { title: 'Checked By', dataIndex: 'inspector' },
    {
      title: 'Result',
      dataIndex: 'result',
      render: result => getResultTag(result),
      filters: [
        { text: 'Pass', value: 'pass' },
        { text: 'Fail', value: 'fail' },
        { text: 'Borderline', value: 'borderline' }
      ],
      onFilter: (value, record) => record.result.toLowerCase().includes(value.toLowerCase())
    },
    { title: 'Remarks', dataIndex: 'remarks' },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Popconfirm title="Delete this entry?" onConfirm={() => deleteRecord(record.key)}>
            <Button danger type="link" icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#2e7d32' }}>Raw Material Quality Check</Title>
      <Space wrap style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Add Entry</Button>
        <Button icon={<FileExcelOutlined />} onClick={exportExcel}>Export Excel</Button>
        <Button icon={<FilePdfOutlined />} onClick={exportPDF}>Save as PDF</Button>
        <Button icon={<PrinterOutlined />} onClick={printData}>Print</Button>
        <RangePicker onChange={onDateRangeChange} />
      </Space>

      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredData.length ? filteredData : data}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </div>

      <Modal
        title={editing ? 'Edit Record' : 'Add Record'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditing(null);
        }}
        okText={editing ? 'Update' : 'Add'}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="name" label="Material Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="batch" label="Batch Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="inspector" label="Checked By" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="result" label="Quality Result" rules={[{ required: true }]}>
            <Input placeholder="e.g., Pass, Fail, Borderline" />
          </Form.Item>
          <Form.Item name="remarks" label="Remarks">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RawMaterialsPage;
