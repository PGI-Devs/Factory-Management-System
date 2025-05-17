import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  BarcodeOutlined,
  CheckCircleOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const QualitySidebar = ({ theme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = location.pathname.split("/")[1] || "raw";

  const menuItems = [
    {
      key: "",
      icon: <BarcodeOutlined style={{ color: theme.sidebarText }} />,
      label: "Home",
    },
    {
      key: "quality_dashboard/quality_raw",
      icon: <BarcodeOutlined style={{ color: theme.sidebarText }} />,
      label: "Raw Materials",
    },
    {
      key: "quality_dashboard/inprocess_dashboard",
      icon: <CheckCircleOutlined style={{ color: theme.sidebarText }} />,
      label: "In-Process Checks",
    },
    {
      key: "quality_dashboard/pdipage",
      icon: <FileTextOutlined style={{ color: theme.sidebarText }} />,
      label: "Finished Goods",
    },
    {
      key: "quality_dashboard/quality_reports",
      icon: <PieChartOutlined style={{ color: theme.sidebarText }} />,
      label: "Reports",
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
      style={{ minHeight: "100vh", backgroundColor: theme.sidebarBg }}
    >
      <div
        style={{
          height: 64,
          margin: 16,
          backgroundColor: theme.sidebarSelectedBg,
          textAlign: "center",
          color: theme.sidebarSelectedText,
          fontWeight: "bold",
          fontSize: 20,
          lineHeight: "64px",
          userSelect: "none",
          borderRadius: 6,
          boxShadow: `0 0 10px ${theme.sidebarSelectedBg}aa`,
        }}
      >
        Quality Dept
      </div>

      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={onMenuSelect}
        style={{ backgroundColor: theme.sidebarBg, color: theme.sidebarText }}
        items={menuItems}
      />
    </Sider>
  );
};

export default QualitySidebar;
