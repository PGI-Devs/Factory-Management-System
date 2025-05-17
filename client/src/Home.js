import React from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const departments = [
  { name: 'Admin', path: '/dashboard' },
  { name: 'Production Manager', path: '/production_dashboard' },
  { name: 'Purchase Manager', path: '/purchase_dashboard' },
  { name: 'General Manager', path: '/' },
  { name: 'Store Manager', path: '/store_dashboard' },
  { name: 'Sales Manager', path: '/sales_dashboard' },
  { name: 'Quality Manager', path: '/quality_dashboard' },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          backgroundColor: '#f6fff0',
        }}
        bodyStyle={{ padding: 40, textAlign: 'center' }}
      >
        <Title level={2} style={{ color: '#2e7d32', marginBottom: 40 }}>
          Select Department to Login
        </Title>

        <Row gutter={[16, 16]} justify="center">
          {departments.map(({ name, path }) => (
            <Col xs={24} sm={12} key={name}>
              <Button
                block
                size="large"
                style={{
                  backgroundColor: '#fff',
                  color: '#2e7d32',
                  fontWeight: '600',
                  borderRadius: 8,
                  border: '2px solid #2e7d32',
                  boxShadow: '0 4px 12px rgba(46,125,50,0.2)',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate(path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2e7d32';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#2e7d32';
                }}
              >
                {name}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default HomePage;
