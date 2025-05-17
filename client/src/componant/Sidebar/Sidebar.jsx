import React, { useState } from 'react';
import {
  BilibiliOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteRowOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './sidebar.css'
import {  Layout, Menu, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import logo from '../Assets/favicon.ico'

import { Link } from 'react-router-dom';
import { MdOutlineEnergySavingsLeaf, MdOutlineEngineering } from 'react-icons/md';

const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Inventory Managenment', 'sub1', <PieChartOutlined />, [

    getItem(<Link to="/details">Row Material</Link>, '2', <MdOutlineEnergySavingsLeaf/>),
    getItem('Finished Goods', '3' , <ProductOutlined/>),

  ]),
  getItem('Production & Manufacturing', 'sub2', <DesktopOutlined />, [
    getItem('Production Schedule', '4', <ClockCircleOutlined />),


    getItem('Assembly line Status', '5' , <CheckCircleOutlined/>),
    getItem('Work Order', '6' , <OrderedListOutlined/>),
   getItem(<Link to="/details/billofmaterials">Bill Of Materials</Link>, '7', <BilibiliOutlined/>),
  ]),
  getItem('Team', 'sub3', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{
          // background: 'linear-gradient(rgb(4, 120, 87) 0%, rgb(6, 95, 70) 100%)',
          background: 'rgb(4, 120, 87)',
          position: 'sticky',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          overflow: 'auto',

        }}
        width={260}
      >
        {/* Sidebar Header with Logo + Company Name */}
        <div
          style={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            background: ' rgba(255,255,255,0.2)',
            margin: '5px',
            borderRadius: '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0 24px',
            // borderBottom: '1px solid rgba(255,255,255,0.2)',
          }}

        >
          <img
            src={logo}// Replace with your logo path
            alt="Logo"
            style={{
              height: 25,
              marginRight: collapsed ? 0 : 12,
            }}
          />
          {!collapsed && (
            <Title level={5} style={{ color: '#A7F3D0', margin: 0 }}>
              Powerline
            </Title>
          )}
        </div>

        {!collapsed && <div style={{}}>
          <Title level={5} style={{ color: '#A7F3D0', marginLeft: '10px', paddingTop: '20px' }}>

            MAIN
          </Title>
        </div>}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{
            background: 'transparent',
            color: '#fff',
            borderRight: 0,
          }}
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />} style={{ color: '#fff' }}>
            <Link to={"/"} >Dashboard</Link>
          </Menu.Item>
        </Menu>
        {!collapsed && <div style={{}}>
          <Title level={5} style={{ color: '#A7F3D0', marginLeft: '10px', paddingTop: '20px' }}>
            MODULES
          </Title>
        </div>}

        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>

    </Layout>
  );
};
export default Sidebar;