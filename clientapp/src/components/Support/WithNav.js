import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Nav';

export default () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};