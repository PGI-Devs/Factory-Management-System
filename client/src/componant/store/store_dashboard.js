import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import StoreSidebar from "./store_sidebar"; // Make sure StoreSidebar is correctly implemented

const { Content } = Layout;

const StoreDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StoreSidebar />

      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "linear-gradient(to bottom right, #f0f9ff, #e0f2fe)",
            borderRadius: 12,
            minHeight: 280,
          }}
        >
          <Outlet /> {/* This will render child routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StoreDashboard;
