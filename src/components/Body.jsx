import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Body = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
