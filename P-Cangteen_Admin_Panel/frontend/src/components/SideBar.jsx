import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/products">Products</Link>
      <Link to="/users">Users</Link>
      <Link to="/receipts">Receipts</Link>
      <Link to="/change-password">Change Password</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Sidebar;
