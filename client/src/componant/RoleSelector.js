import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRole = (role) => {
    navigate(`/dashboard/${role}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <Typography.Title level={2}>Select Your Role</Typography.Title>
      <Space direction="vertical" size="large">
        <Button onClick={() => navigate('/details/registrar')}>Go Registrar</Button>

        <Button onClick={() => navigate('/details/approver')}>Approver</Button>

      </Space>
    </div>
  );
};

export default RoleSelector;
