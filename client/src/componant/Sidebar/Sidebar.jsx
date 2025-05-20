import React, { useState } from 'react';
import {
  BilibiliOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ProductOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './sidebar.css'
import { Layout, Menu } from 'antd';
import Title from 'antd/es/typography/Title';
import logo from '../Assets/favicon.ico'

import { Link } from 'react-router-dom';
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md';

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

    getItem(<Link to="/details/:id">Row Material</Link>, '2', <MdOutlineEnergySavingsLeaf />),
    getItem('Finished Goods', '3', <ProductOutlined />),

  ]),
  getItem('Production & Manufacturing', 'sub2', <DesktopOutlined />, [
    getItem(<Link to='/production'>Production Schedule</Link>, '4', <ClockCircleOutlined />),


    getItem('Assembly line Status', '5', <CheckCircleOutlined />),
    getItem('Work Order', '6', <OrderedListOutlined />),
    getItem('Bill Of Material', '7', <BilibiliOutlined />),
  ]),
  getItem('Team', 'sub3', <TeamOutlined />,
    [
      getItem(<Link to={'/Purchase'}>Purchase Department</Link>, '6' ,<ShoppingOutlined/>),
      getItem('Salses Department', '8' , < ShopOutlined/>)]

  ),
  getItem('Files', '9', <FileOutlined />),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();




  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setCollapsed(true); // Collapse when entering mobile view
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {isMobileView && (
        <button
          onClick={() => setCollapsed(prev => !prev)}
          style={{
            position: 'fixed',
            top: 10,
            left: 10,
            fontSize: '25px',
            zIndex: 1100,
            background: 'transparent',
            border: 'none',
            borderRadius: '4px',
            padding: '8px',
            color: 'black',
            cursor: 'pointer',
            transition: 'all 0.5s'
          }}
        >
          {collapsed ? (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="30" height="30">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            // Close (X) icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="30" height="30">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      )}



      <Sider
        collapsible
        collapsed={collapsed}
        // onCollapse={value => setCollapsed(value)}
        onCollapse={() => setCollapsed(prev => !prev)}
        collapsedWidth={isMobileView ? 0 : 80}

        style={{
          // background: 'linear-gradient(rgb(4, 120, 87) 0%, rgb(6, 95, 70) 100%)',
          background: 'rgb(4, 120, 87)',
          position: isMobileView ? 'fixed' : 'sticky',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          overflow: 'auto',
          width: collapsed ? (isMobileView ? 0 : 80) : 260,
        }}
        width={260}


      // breakpoint="md"
      // collapsedWidth={0}
      // onBreakpoint={(broken) => setIsMobileView(broken)}



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