import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const StoreSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = location.pathname.split("/")[2] || "requirements";

  const menuItems = [
    {
      key: "",
      icon: <FileTextOutlined style={{ color: "#ffffff" }} />,
      label: "Home",
    },
    {
      key: "store_dashboard/store_requirements",
      icon: <FileTextOutlined style={{ color: "#ffffff" }} />,
      label: "Requirements",
    },
    {
      key: "store_dashboard/delivered",
      icon: <CheckCircleOutlined style={{ color: "#ffffff" }} />,
      label: "Delivered",
    },
    {
      key: "store_dashboard/bill_of_materials",
      icon: <FileDoneOutlined style={{ color: "#ffffff" }} />,
      label: "Bill of Materials",
    },
    {
      key: "store_dashboard/assigned_items",
      icon: <ToolOutlined style={{ color: "#ffffff" }} />,
      label: "Assigned",
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
        background: "linear-gradient(180deg, #064e3b, #065f46)", // Green gradient
      }}
    >
      <div
        style={{
          height: 64,
          margin: 16,
          backgroundColor: "#10b981", // Emerald green
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
        Store Dept
      </div>

      <Menu
        theme="dark"
        selectedKeys={[`store_dashboard/${selectedKey}`]}
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

export default StoreSidebar;
