import React from "react";
import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import QualitySidebar from "./quality_sidebar";

const { Header, Content } = Layout;

const greenTheme = {
  sidebarBg: "#1b4d1b",
  sidebarText: "#b5f5b5",
  sidebarSelectedBg: "#4caf50",
  sidebarSelectedText: "#fff",
  buttonBg: "#4caf50",
  buttonText: "#fff",
  contentBg: "#e8f5e9",
  contentText: "#1b4d1b",
};

const DashboardLayout = () => {
  // No theme toggle, fixed green theme here

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: greenTheme.contentBg }}>
      <QualitySidebar theme={greenTheme} />
      <Layout>
        <Header
          style={{
            backgroundColor: greenTheme.sidebarBg,
            color: greenTheme.sidebarSelectedText,
            padding: "0 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{
              backgroundColor: greenTheme.buttonBg,
              borderColor: greenTheme.buttonBg,
              color: greenTheme.buttonText,
              cursor: "default",
            }}
            disabled
          >
            Green Theme
          </Button>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            backgroundColor: greenTheme.contentBg,
            color: greenTheme.contentText,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
