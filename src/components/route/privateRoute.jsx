import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuthStore } from '../../store';
import { PATH } from '../../route/path';

export default function PrivateRoute() {
  const { isLoggedIn } = useUserAuthStore();

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.root} />;
}
