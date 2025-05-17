import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  Typography,
  message,
} from 'antd';

const { Title } = Typography;
const { Option } = Select;

const SettingsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark/light theme to body
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#e0e0e0';
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  }, [darkMode]);

  const onFinish = (values) => {
    setLoading(true);

    // Example: validate old password is correct (hardcoded here for demo)
    if (values.oldPassword && values.oldPassword !== 'currentPassword123') {
      setLoading(false);
      message.error('Old password is incorrect');
      return;
    }

    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      setLoading(false);
      message.error('New passwords do not match');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Settings saved successfully!');
      // Clear password fields after success
      form.resetFields(['oldPassword', 'newPassword', 'confirmPassword']);
    }, 1500);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        backgroundColor: darkMode ? '#1f1f1f' : '#fff',
        borderRadius: 8,
        boxShadow: darkMode
          ? '0 0 10px rgba(255, 255, 255, 0.1)'
          : '0 0 10px rgba(0, 0, 0, 0.1)',
        color: darkMode ? '#e0e0e0' : '#000',
        transition: 'all 0.3s ease',
      }}
    >
      <Title
        level={2}
        style={{ color: darkMode ? '#90caf9' : '#1890ff', marginBottom: 24 }}
      >
        Settings
      </Title>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: 'John Doe',
          email: 'john@example.com',
          darkMode: false,
          notifications: true,
          language: 'en',
          timezone: 'UTC',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email address' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password change fields */}
        <Form.Item label="Old Password" name="oldPassword" hasFeedback>
          <Input.Password placeholder="Enter old password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          hasFeedback
          dependencies={['oldPassword']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value && !getFieldValue('oldPassword')) {
                  // No new password & no old password (means no change)
                  return Promise.resolve();
                }
                if (!value) {
                  return Promise.reject(
                    new Error('Please enter new password if changing')
                  );
                }
                if (value.length < 6) {
                  return Promise.reject(
                    new Error('New password must be at least 6 characters')
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!getFieldValue('newPassword')) {
                  return Promise.resolve();
                }
                if (!value) {
                  return Promise.reject(
                    new Error('Please confirm your new password')
                  );
                }
                if (value !== getFieldValue('newPassword')) {
                  return Promise.reject(
                    new Error('Passwords do not match')
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Form.Item
          label="Dark Mode"
          name="darkMode"
          valuePropName="checked"
          initialValue={darkMode}
        >
          <Switch
            checked={darkMode}
            onChange={(checked) => {
              setDarkMode(checked);
              form.setFieldsValue({ darkMode: checked });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Email Notifications"
          name="notifications"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Language"
          name="language"
          rules={[{ required: true, message: 'Please select language' }]}
        >
          <Select>
            <Option value="en">English</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
            <Option value="de">German</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Timezone"
          name="timezone"
          rules={[{ required: true, message: 'Please select timezone' }]}
        >
          <Select>
            <Option value="UTC">UTC</Option>
            <Option value="GMT">GMT</Option>
            <Option value="EST">EST</Option>
            <Option value="PST">PST</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPage;
