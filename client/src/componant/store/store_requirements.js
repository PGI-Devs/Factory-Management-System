import React, { useState, useRef } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  message,
  Space,
} from "antd";
import { DownloadOutlined, PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const StoreRequirements = () => {
  const [form] = Form.useForm();
  const [requirements, setRequirements] = useState([
    { item_name: "Cement", required_quantity: 100 },
    { item_name: "Bricks", required_quantity: 500 },
  ]);

  const currentStock = {
    Cement: 60,
    Bricks: 450,
    Steel: 150,
  };

  const tableRef = useRef();

  const handleAddRequirement = (values) => {
    setRequirements((prev) => [...prev, values]);
    form.resetFields();
    message.success("Requirement added!");
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item_name",
    },
    {
      title: "Required Quantity",
      dataIndex: "required_quantity",
    },
    {
      title: "Available Stock",
      render: (_, record) => currentStock[record.item_name] || 0,
    },
    {
      title: "Quantity Needed",
      render: (_, record) => {
        const current = currentStock[record.item_name] || 0;
        const needed = record.required_quantity - current;
        return needed > 0 ? needed : 0;
      },
    },
  ];

  const exportToExcel = () => {
    const data = requirements.map((record) => {
      const current = currentStock[record.item_name] || 0;
      const needed = record.required_quantity - current;
      return {
        Item: record.item_name,
        "Required Quantity": record.required_quantity,
        "Available Stock": current,
        "Quantity Needed": needed > 0 ? needed : 0,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requirements");
    XLSX.writeFile(workbook, "requirements.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Stock Requirements Report", 14, 20);
    doc.setFontSize(12);

    const startY = 30;
    const rowHeight = 10;
    let y = startY;

    doc.text("Item", 14, y);
    doc.text("Required", 64, y);
    doc.text("Available", 114, y);
    doc.text("Needed", 164, y);
    y += 6;
    doc.line(14, y, 200, y); // underline

    requirements.forEach((record, index) => {
      const current = currentStock[record.item_name] || 0;
      const needed = Math.max(record.required_quantity - current, 0);
      y += rowHeight;

      doc.text(record.item_name, 14, y);
      doc.text(record.required_quantity.toString(), 64, y);
      doc.text(current.toString(), 114, y);
      doc.text(needed.toString(), 164, y);
    });

    doc.save("requirements.pdf");
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write("<html><head><title>Print</title>");
    WinPrint.document.write("</head><body>");
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.write("</body></html>");
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Card title="Add Minimum Requirement" bordered style={{ maxWidth: 600 }}>
        <Form form={form} layout="vertical" onFinish={handleAddRequirement}>
          <Form.Item
            name="item_name"
            label="Item Name"
            rules={[{ required: true, message: "Please enter item name" }]}
          >
            <Input placeholder="Enter item name" />
          </Form.Item>

          <Form.Item
            name="required_quantity"
            label="Minimum Required Quantity"
            rules={[{ required: true, message: "Enter required quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Requirement
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        title="Current Requirements Status"
        bordered
        extra={
          <Space>
            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
              Print
            </Button>
            <Button icon={<FilePdfOutlined />} onClick={exportToPDF}>
              Export PDF
            </Button>
            <Button icon={<DownloadOutlined />} onClick={exportToExcel}>
              Export Excel
            </Button>
          </Space>
        }
      >
        <div ref={tableRef}>
          <Table
            dataSource={requirements}
            rowKey={(record) => `${record.item_name}-${record.required_quantity}`}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default StoreRequirements;
