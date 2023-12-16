import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './Products';
import Users from './Users';
import Receipts from './Receipts';
import ChangePassword from './ChangePassword';
import Logout from './Logout';

const MainArea = () => {
  return (
    <div className="main-area">
      <Routes>
        <Route path="/products" element={<Products/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/receipts" element={<Receipts/>} />
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </div>
  );
};

export default MainArea;
