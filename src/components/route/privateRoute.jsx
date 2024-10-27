import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuthStore } from '../../store';
import { PATH } from '../../route/path';

export default function PrivateRoute() {
  const { isLoggedIn, logout } = useUserAuthStore();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken && isLoggedIn) {
      console.log('액세스 토큰이 없어 로그아웃 처리');
      logout();
    }
  });

  return accessToken ? <Outlet /> : <Navigate to={PATH.root} />;
}
