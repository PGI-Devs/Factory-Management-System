import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SalesSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = location.pathname.split("/")[2] || "sales_inventory";

  const menuItems = [
    {
      key: "",
      icon: <AppstoreOutlined style={{ color: "#ffffff" }} />,
      label: "Home",
    },
    {
      key: "sales_dashboard/sales_inventory",
      icon: <AppstoreOutlined style={{ color: "#ffffff" }} />,
      label: "Inventory / Stock",
    },
    {
      key: "sales_dashboard/sales_report",
      icon: <BarChartOutlined style={{ color: "#ffffff" }} />,
      label: "Sales Report",
    },
    {
      key: "sales_dashboard/sales_history",
      icon: <FileTextOutlined style={{ color: "#ffffff" }} />,
      label: "Sales History",
    },
    {
      key: "sales_dashboard/sales_invoices",
      icon: <FileDoneOutlined style={{ color: "#ffffff" }} />,
      label: "Invoices",
    },
    {
      key: "sales_dashboard/sales_customers",
      icon: <UserOutlined style={{ color: "#ffffff" }} />,
      label: "Customers",
    },
  ];

  const onMenuSelect = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={250}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #064e3b, #065f46)",
      }}
    >
      <div
        style={{
          height: 64,
          margin: 16,
          backgroundColor: "#10b981",
          textAlign: "center",
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: 20,
          lineHeight: "64px",
          userSelect: "none",
          borderRadius: 6,
          boxShadow: `0 0 10px #10b981aa`,
        }}
      >
        Sales Dept
      </div>

      <Menu
        theme="dark"
        selectedKeys={[`sales_dashboard/${selectedKey}`]}
        mode="inline"
        onClick={onMenuSelect}
        style={{
          background: "transparent",
          color: "#ffffff",
        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default SalesSidebar;
