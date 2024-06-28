// src/pages/AdminLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement login logic here
    navigate('/request-admin'); // Change this to your desired route after login
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <Button type="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default AdminLogin;
