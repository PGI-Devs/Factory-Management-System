import React, { useState, useMemo, useRef } from "react";
import {
  Card,
  Table,
  Input,
  Select,
  Space,
  Button,
  Modal,
  Form,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const { Option } = Select;

const AssignedItems = () => {
  const departments = [
    { id: "dept1", name: "Construction" },
    { id: "dept2", name: "Logistics" },
    { id: "dept3", name: "Maintenance" },
  ];

  const [assignedItems, setAssignedItems] = useState([
    { id: 1, item_name: "Cement", quantity: 100, dept_id: "dept1" },
    { id: 2, item_name: "Bricks", quantity: 500, dept_id: "dept1" },
    { id: 3, item_name: "Steel Rods", quantity: 200, dept_id: "dept3" },
    { id: 4, item_name: "Paint", quantity: 150, dept_id: "dept3" },
    { id: 5, item_name: "Truck", quantity: 10, dept_id: "dept2" },
  ]);

  const [searchItem, setSearchItem] = useState("");
  const [filterDept, setFilterDept] = useState(null);
  const [quantityRange, setQuantityRange] = useState([null, null]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [invoiceItem, setInvoiceItem] = useState(null);

  const [form] = Form.useForm();

  // For print, we can create a ref for invoice content
  const invoiceRef = useRef();

  const getDeptName = (id) => {
    const dept = departments.find((d) => d.id === id);
    return dept ? dept.name : "";
  };

  const filteredData = useMemo(() => {
    return assignedItems.filter((item) => {
      const matchesDept = filterDept ? item.dept_id === filterDept : true;
      const matchesSearch = item.item_name
        .toLowerCase()
        .includes(searchItem.toLowerCase());

      const [minQ, maxQ] = quantityRange;
      const matchesQuantity =
        (minQ === null || item.quantity >= minQ) &&
        (maxQ === null || item.quantity <= maxQ);

      return matchesDept && matchesSearch && matchesQuantity;
    });
  }, [searchItem, filterDept, quantityRange, assignedItems]);

  // Open invoice modal for the item
  const onViewInvoice = (record) => {
    setInvoiceItem(record);
    setInvoiceVisible(true);
  };

  // Print invoice content
  const handlePrintInvoice = () => {
    if (!invoiceRef.current) return;
    const printWindow = window.open("", "_blank", "width=600,height=600");
    printWindow.document.write("<html><head><title>Invoice</title></head><body>");
    printWindow.document.write(invoiceRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Export invoice as PDF using jsPDF (manual formatting, no autotable)
  const handleExportInvoicePDF = () => {
    if (!invoiceItem) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    doc.setFontSize(12);
    doc.text(`Item Name: ${invoiceItem.item_name}`, 14, 40);
    doc.text(`Department: ${getDeptName(invoiceItem.dept_id)}`, 14, 50);
    doc.text(`Quantity Assigned: ${invoiceItem.quantity}`, 14, 60);

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      14,
      80
    );

    doc.save(`Invoice_${invoiceItem.item_name}.pdf`);
  };

  // Export full table to Excel
  const exportExcel = () => {
    // Prepare data for XLSX
    const dataForExcel = filteredData.map(({ id, ...rest }) => ({
      ...rest,
      Department: getDeptName(rest.dept_id),
    }));

    // Remove dept_id key, add Department name instead
    dataForExcel.forEach((row) => delete row.dept_id);

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AssignedItems");
    XLSX.writeFile(workbook, "AssignedItems.xlsx");
  };

  // Print full table
  const handlePrintTable = () => {
    const printContent = document.getElementById("table-container");
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write("<html><head><title>Assigned Items</title>");
    printWindow.document.write('<style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ddd;padding:8px;text-align:left;}th{background:#f4f4f4;}</style>');
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Export full table to PDF (manual)
  const exportTablePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Assigned Items to Departments", 14, 22);
    doc.setFontSize(11);

    const startY = 40;
    let y = startY;

    // Headers
    doc.text("Department", 14, y);
    doc.text("Item Name", 60, y);
    doc.text("Quantity", 140, y);

    y += 8;

    filteredData.forEach((item) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(getDeptName(item.dept_id), 14, y);
      doc.text(item.item_name, 60, y);
      doc.text(item.quantity.toString(), 140, y);
      y += 8;
    });

    doc.save("AssignedItems.pdf");
  };

  const onEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const onDelete = (id) => {
    setAssignedItems((prev) => prev.filter((item) => item.id !== id));
    message.success("Item deleted");
  };

  const onAddNew = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const onModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingItem) {
          setAssignedItems((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? { ...item, ...values } : item
            )
          );
          message.success("Item updated");
        } else {
          const newItem = {
            id: Date.now(),
            ...values,
          };
          setAssignedItems((prev) => [...prev, newItem]);
          message.success("Item added");
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const onModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Table columns including View Invoice button
  const columns = [
    {
      title: "Department",
      dataIndex: "dept_id",
      key: "dept_id",
      render: (dept_id) => getDeptName(dept_id),
      filters: departments.map((d) => ({ text: d.name, value: d.id })),
      onFilter: (value, record) => record.dept_id === value,
      sorter: (a, b) => getDeptName(a.dept_id).localeCompare(getDeptName(b.dept_id)),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
      sorter: (a, b) => a.item_name.localeCompare(b.item_name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Quantity Assigned",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onViewInvoice(record)}>View Invoice</Button>
          <Popconfirm
            title="Are you sure delete this item?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "1rem" }}>
      <Card
        title="Assigned Items to Departments"
        bordered
        extra={<Button type="primary" onClick={onAddNew}>Add New Item</Button>}
      >
        <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
          <Input
            placeholder="Search by item name"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />

          <Select
            placeholder="Filter by department"
            style={{ width: 200 }}
            allowClear
            value={filterDept}
            onChange={setFilterDept}
          >
            {departments.map((dept) => (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            ))}
          </Select>

          <InputNumber
            placeholder="Min Quantity"
            min={0}
            value={quantityRange[0]}
            onChange={(value) => setQuantityRange([value, quantityRange[1]])}
            style={{ width: 120 }}
          />

          <InputNumber
            placeholder="Max Quantity"
            min={0}
            value={quantityRange[1]}
            onChange={(value) => setQuantityRange([quantityRange[0], value])}
            style={{ width: 120 }}
          />

          <Button onClick={() => setQuantityRange([null, null])}>Reset Qty Filter</Button>

          {/* Export/Print Buttons */}
          <Button onClick={exportExcel}>Export Excel</Button>
          <Button onClick={handlePrintTable}>Print Table</Button>
          <Button onClick={exportTablePDF}>Export PDF</Button>
        </Space>

        <div id="table-container">
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal
        title={editingItem ? "Edit Assigned Item" : "Add Assigned Item"}
        visible={isModalVisible}
        onOk={onModalOk}
        onCancel={onModalCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical" initialValues={{ quantity: 1 }}>
          <Form.Item
            name="item_name"
            label="Item Name"
            rules={[{ required: true, message: "Please enter item name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, type: "number", min: 1, message: "Enter quantity" }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>

          <Form.Item
            name="dept_id"
            label="Department"
            rules={[{ required: true, message: "Select department" }]}
          >
            <Select placeholder="Select department">
              {departments.map((dept) => (
                <Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

       {/* Invoice Modal */}
      <Modal
        title={`Invoice for ${invoiceItem?.item_name || ""}`}
        visible={invoiceVisible}
        footer={[
          <Button key="print" onClick={handlePrintInvoice}>
            Print
          </Button>,
          <Button key="pdf" onClick={handleExportInvoicePDF}>
            Export PDF
          </Button>,
          <Button key="close" onClick={() => setInvoiceVisible(false)}>
            Close
          </Button>,
        ]}
        onCancel={() => setInvoiceVisible(false)}
        width={500}
      >
        <div ref={invoiceRef} style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
          <style>
            {`
              .invoice-box {
                max-width: 480px;
                padding: 20px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 14px;
                line-height: 24px;
                color: #555;
              }
              .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                border-collapse: collapse;
              }
              .invoice-box table td {
                padding: 5px;
                vertical-align: top;
              }
              .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
              }
              .invoice-box table tr.details td {
                padding-bottom: 20px;
              }
              .invoice-box table tr.item td{
                border-bottom: 1px solid #eee;
              }
              .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
              }
              .invoice-header {
                margin-bottom: 20px;
              }
              .invoice-title {
                font-size: 24px;
                font-weight: bold;
                color: #222;
              }
              .company-name {
                font-size: 18px;
                color: #222;
                margin-bottom: 5px;
              }
              .date {
                font-size: 12px;
                color: #777;
                margin-top: 0;
              }
            `}
          </style>
          <div className="invoice-box">
            <div className="invoice-header">
              <div className="company-name">Your Company Name</div>
              <div className="invoice-title">Invoice</div>
              <p className="date">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <table>
              <tbody>
                <tr className="heading">
                  <td>Item</td>
                  <td>Department</td>
                  <td>Quantity</td>
                </tr>

                <tr className="item">
                  <td>{invoiceItem?.item_name}</td>
                  <td>{getDeptName(invoiceItem?.dept_id)}</td>
                  <td>{invoiceItem?.quantity}</td>
                </tr>

                <tr className="total">
                  <td></td>
                  <td>Total Quantity</td>
                  <td>{invoiceItem?.quantity}</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: 20, fontSize: 12, color: "#999" }}>
              Thank you for your business!
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AssignedItems;
