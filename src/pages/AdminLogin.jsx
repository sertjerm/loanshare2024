// src/pages/AdminLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement login logic here
    navigate('/admin/dashboard'); // Change this to your desired route after login
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <p>Test</p>
      <Button type="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default AdminLogin;
