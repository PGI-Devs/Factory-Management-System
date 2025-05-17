import React, { useRef, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Popconfirm,
  Form,
  message,
} from "antd";
import {
  DownloadOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const initialData = [
  {
    key: "1",
    partName: "Steel Rod",
    quantity: 10,
    unit: "kg",
    partCode: "SR1001",
    description: "Used in structural framework",
    assembly: "Frame",
  },
  {
    key: "2",
    partName: "Nuts & Bolts",
    quantity: 50,
    unit: "pcs",
    partCode: "NB1020",
    description: "Fasteners for joints",
    assembly: "Frame",
  },
  {
    key: "3",
    partName: "Copper Wire",
    quantity: 100,
    unit: "m",
    partCode: "CW2050",
    description: "Electrical connections",
    assembly: "Wiring",
  },
  {
    key: "4",
    partName: "Plastic Sheet",
    quantity: 20,
    unit: "sq m",
    partCode: "PS3003",
    description: "Insulation material",
    assembly: "Panels",
  },
  {
    key: "5",
    partName: "Glass Panel",
    quantity: 15,
    unit: "pcs",
    partCode: "GP1500",
    description: "Windows and screens",
    assembly: "Panels",
  },
  {
    key: "6",
    partName: "Rubber Seal",
    quantity: 30,
    unit: "m",
    partCode: "RS4500",
    description: "Sealing joints",
    assembly: "Frame",
  },
  {
    key: "7",
    partName: "Aluminum Sheet",
    quantity: 25,
    unit: "sq m",
    partCode: "AS6000",
    description: "Lightweight panels",
    assembly: "Panels",
  },
  {
    key: "8",
    partName: "Screws",
    quantity: 200,
    unit: "pcs",
    partCode: "SC7000",
    description: "Fastening components",
    assembly: "Frame",
  },
  {
    key: "9",
    partName: "Paint",
    quantity: 10,
    unit: "liters",
    partCode: "PT8000",
    description: "Surface finishing",
    assembly: "Finishing",
  },
  {
    key: "10",
    partName: "Lubricant",
    quantity: 5,
    unit: "liters",
    partCode: "LB9000",
    description: "Reducing friction",
    assembly: "Maintenance",
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? (
    <Input type="number" />
  ) : (
    <Input />
  );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
              ...(inputType === "number"
                ? { type: "number", min: 0 }
                : {}),
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BillOfMaterials = () => {
  const [dataSource, setDataSource] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const tableRef = useRef();
  const fileInputRef = useRef(null);

  const isEditing = (record) => record.key === editingKey;

  // Edit row
  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  // Cancel edit
  const cancel = () => {
    // If new row added and cancel pressed, remove it
    if (editingKey.startsWith("new_")) {
      setDataSource(dataSource.filter((item) => item.key !== editingKey));
    }
    setEditingKey("");
  };

  // Save edited row
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey("");
        message.success("Row updated successfully");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // Delete single row
  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
    setSelectedRowKeys(selectedRowKeys.filter((k) => k !== key));
    message.success("Row deleted");
  };

  // Bulk delete
  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("No rows selected");
      return;
    }
    Popconfirm.confirm({
      title: `Are you sure to delete ${selectedRowKeys.length} items?`,
      onConfirm: () => {
        setDataSource(
          dataSource.filter((item) => !selectedRowKeys.includes(item.key))
        );
        setSelectedRowKeys([]);
        message.success("Selected rows deleted");
      },
    });
  };

  // Add new empty row at top for adding new item
  const handleAddNew = () => {
    if (editingKey !== "") {
      message.warning("Please save or cancel the current editing row first");
      return;
    }
    const newKey = `new_${Date.now()}`;
    const newRow = {
      key: newKey,
      partName: "",
      quantity: 0,
      unit: "",
      partCode: "",
      description: "",
      assembly: "",
    };
    setDataSource([newRow, ...dataSource]);
    form.setFieldsValue(newRow);
    setEditingKey(newKey);
  };

  // Import from Excel
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((row, index) => ({
        key: `${Date.now()}-${index}`,
        partName: row["Part Name"] || "",
        quantity: row["Quantity"] || 0,
        unit: row["Unit"] || "",
        partCode: row["Part Code"] || "",
        description: row["Description"] || "",
        assembly: row["Assembly"] || "",
      }));

      setDataSource((prev) => [...prev, ...formattedData]);
      message.success("Imported successfully");
    };
    reader.readAsBinaryString(file);
    e.target.value = null; // reset file input
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BillOfMaterials");
    XLSX.writeFile(workbook, "bill_of_materials.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bill of Materials", 14, 20);
    doc.setFontSize(10);

    const headers = ["Part Name", "Qty", "Unit", "Code", "Assembly"];
    let y = 30;
    doc.text(headers.join(" | "), 14, y);
    y += 5;
    doc.line(14, y, 200, y);

    dataSource.forEach((item) => {
      y += 7;
      const row = [
        item.partName,
        item.quantity,
        item.unit,
        item.partCode,
        item.assembly,
      ].join(" | ");
      doc.text(row, 14, y);
    });

    doc.save("bill_of_materials.pdf");
  };

  // Print Table
  const printTable = () => {
    const content = tableRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");
    win.document.write("<html><head><title>Print</title></head><body>");
    win.document.write(content);
    win.document.write("</body></html>");
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  // Search filtered data
  const filteredData = dataSource.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Table columns with editing and actions
  const columns = [
    {
      title: "Part Name",
      dataIndex: "partName",
      key: "partName",
      editable: true,
      filters: [
        ...new Set(dataSource.map((item) => item.partName)),
      ].map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.partName === value,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      editable: true,
      filters: [...new Set(dataSource.map((item) => item.unit))].map(
        (unit) => ({
          text: unit,
          value: unit,
        })
      ),
      onFilter: (value, record) => record.unit === value,
    },
    {
      title: "Part Code",
      dataIndex: "partCode",
      key: "partCode",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Assembly",
      dataIndex: "assembly",
      key: "assembly",
      editable: true,
      filters: [...new Set(dataSource.map((item) => item.assembly))].map(
        (asm) => ({
          text: asm,
          value: asm,
        })
      ),
      onFilter: (value, record) => record.assembly === value,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              onClick={() => save(record.key)}
              type="link"
              icon={<SaveOutlined />}
            />
            <Button
              onClick={cancel}
              type="link"
              icon={<CloseOutlined />}
              danger
            />
          </Space>
        ) : (
          <Space>
            <Button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              type="link"
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                disabled={editingKey !== ""}
                type="link"
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // Merge columns with editable cell props
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "quantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // Row selection config
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
    getCheckboxProps: (record) => ({
      disabled: editingKey === record.key, // disable checkbox on editing row
    }),
  };

  return (
    <Card
      title="Bill of Materials"
      extra={
        <Space wrap>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            disabled={editingKey !== ""}
          >
            Add New Row
          </Button>
          <Popconfirm
            title={`Are you sure to delete ${selectedRowKeys.length} items?`}
            onConfirm={() => {
              setDataSource(
                dataSource.filter((item) => !selectedRowKeys.includes(item.key))
              );
              setSelectedRowKeys([]);
              message.success("Selected rows deleted");
            }}
            okText="Yes"
            cancelText="No"
            disabled={selectedRowKeys.length === 0}
          >
            <Button
              icon={<DeleteTwoTone />}
              danger
              disabled={selectedRowKeys.length === 0 || editingKey !== ""}
            >
              Delete Selected
            </Button>
          </Popconfirm>
          <Button icon={<PrinterOutlined />} onClick={printTable}>
            Print
          </Button>
          <Button icon={<FilePdfOutlined />} onClick={exportToPDF}>
            Export PDF
          </Button>
          <Button icon={<DownloadOutlined />} onClick={exportToExcel}>
            Export Excel
          </Button>
          <Button onClick={() => fileInputRef.current.click()}>
            Import Excel
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImportExcel}
          />
        </Space>
      }
    >
      <Form form={form} component={false}>
        <div ref={tableRef}>
          <Table
            rowSelection={rowSelection}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={filteredData}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Form>
    </Card>
  );
};

export default BillOfMaterials;
