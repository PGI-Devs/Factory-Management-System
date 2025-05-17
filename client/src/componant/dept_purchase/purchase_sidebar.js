// purchase_sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

// Define sidebar styles
const sidebarStyles = {
  sidebar: {
    height: '100vh',
    width: '250px',
    background: 'linear-gradient(180deg, #1e4620, #3ca34d)',
    color: '#e6f2e6',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '30px',
    letterSpacing: '2px',
    userSelect: 'none',
    color: '#d4efd4',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  navItem: {
    margin: 0,
  },
  navLink: {
    display: 'block',
    color: '#d4efd4',
    textDecoration: 'none',
    padding: '12px 30px',
    fontSize: '1rem',
    borderLeft: '4px solid transparent',
    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
    cursor: 'pointer',
  },
  navLinkActive: {
    backgroundColor: 'rgba(58, 163, 77, 0.8)',
    borderLeftColor: '#adebad',
    color: '#1b3d1b',
    fontWeight: '600',
  },
  sidebarFooter: {
    padding: '15px 30px',
    fontSize: '0.85rem',
    textAlign: 'center',
    borderTop: '1px solid rgba(173, 235, 173, 0.5)',
    color: '#b8d8b8',
  },
};

// Define links for the sidebar
const links = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/purchase_dashboard/purchase_home' },
  { name: 'Purchase Orders', path: '/purchase_dashboard/purchase_orders' },
  { name: 'Vendors', path: '/purchase_dashboard/purchase_vendors' },
  { name: 'Inventory', path: '/purchase_dashboard/purchase_inventory' },
  { name: 'Reports', path: '/purchase_dashboard/purchase_reports' },
  { name: 'Settings', path: '/purchase_dashboard/purchase_settings' },
];

const PurchaseSidebar = () => {
  return (
    <aside style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.logo}>Purchase Dept.</div>
      <nav>
        <ul style={sidebarStyles.navList}>
          {links.map(({ name, path }) => (
            <li key={name} style={sidebarStyles.navItem}>
              <NavLink
                to={path}
                end
                style={({ isActive }) => ({
                  ...sidebarStyles.navLink,
                  ...(isActive ? sidebarStyles.navLinkActive : {}),
                })}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div style={sidebarStyles.sidebarFooter}>© 2025 Company</div>
    </aside>
  );
};

export default PurchaseSidebar;
