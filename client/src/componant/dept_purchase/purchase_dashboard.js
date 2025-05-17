import React from 'react';
import PurchaseSidebar from './purchase_sidebar';
import { Outlet } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    marginLeft: '250px', // width of sidebar
    padding: '30px',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f7f0',
    boxSizing: 'border-box',
  },
};

const PurchaseDashboard = () => {
  return (
    <div style={styles.container}>
      <PurchaseSidebar />
      <main style={styles.content}>
        <Outlet />
      </main>
      
    </div>
  );
};

export default PurchaseDashboard;
