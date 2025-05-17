import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  DatePicker,
  Button,
  Modal,
  Table,
  message,
} from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6384"];

// Example categories and data with category field added to items
const itemsByCategory = [
  { name: "Electronics", value: 400 },
  { name: "Furniture", value: 300 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 200 },
  { name: "Books", value: 100 },
];

const allItems = [
  { id: 1, name: "Laptop", category: "Electronics", quantity: 50, price: 1200 },
  { id: 2, name: "Chair", category: "Furniture", quantity: 100, price: 150 },
  { id: 3, name: "T-Shirt", category: "Clothing", quantity: 200, price: 20 },
  { id: 4, name: "Apple", category: "Food", quantity: 500, price: 1 },
  { id: 5, name: "Novel", category: "Books", quantity: 300, price: 15 },
  { id: 6, name: "Headphones", category: "Electronics", quantity: 70, price: 100 },
  // Add more as needed
];

const HomeDashboard = () => {
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(30, "day"),
    dayjs(),
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

  // Filter items by selected category or all
  const filteredItems = selectedCategory
    ? allItems.filter((item) => item.category === selectedCategory)
    : allItems;

  // Calculate stats for filtered items
  const totalItemsCount = filteredItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalStockValue = filteredItems.reduce(
    (acc, i) => acc + i.quantity * i.price,
    0
  );

  // Pie chart click handler — open modal with filtered data
  const onPieSliceClick = (data) => {
    if (!data || !data.name) return;
    setSelectedCategory(data.name);
    setModalTitle(`Items in Category: ${data.name}`);
    setModalData(allItems.filter((item) => item.category === data.name));
    setModalVisible(true);
    message.info(`Showing details for category: ${data.name}`);
  };

  // Bar chart click handler — open modal with filtered data by item
  const onBarClick = (data) => {
    if (!data || !data.activePayload) return;
    const itemName = data.activePayload[0].payload.name;
    setModalTitle(`Details for Item: ${itemName}`);
    setModalData(allItems.filter((item) => item.name === itemName));
    setModalVisible(true);
    message.info(`Showing details for item: ${itemName}`);
  };

  // Reset filters and close modal
  const resetFilters = () => {
    setSelectedCategory(null);
    setModalVisible(false);
    message.success("Filters cleared");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Total Value",
      key: "totalValue",
      render: (record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Dashboard
      </Title>

      <RangePicker
        value={dateRange}
        onChange={setDateRange}
        style={{ marginBottom: 24 }}
        allowClear={false}
      />

      <Button
        onClick={resetFilters}
        disabled={!selectedCategory && !modalVisible}
        style={{ marginBottom: 16 }}
      >
        Reset Filters
      </Button>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={8} md={6}>
          <Card>
            <Statistic title="Total Items" value={totalItemsCount} suffix="units" />
          </Card>
        </Col>
        <Col xs={24} sm={8} md={6}>
          <Card>
            <Statistic
              title="Total Stock Value"
              value={totalStockValue.toFixed(2)}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card title="Items by Category">
            <PieChart width={300} height={300}>
              <Pie
                data={itemsByCategory}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
                onClick={onPieSliceClick}
                cursor="pointer"
              >
                {itemsByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={selectedCategory === entry.name ? "#000" : "none"}
                    strokeWidth={selectedCategory === entry.name ? 3 : 1}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Top Items">
            <BarChart
              width={600}
              height={300}
              data={allItems}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={onBarClick}
              cursor="pointer"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <Modal
        title={modalTitle}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Table
          columns={columns}
          dataSource={modalData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
        />
      </Modal>
    </div>
  );
};

export default HomeDashboard;
