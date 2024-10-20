import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import DirectorHeader from './header/directorHeader';

/**
 *@description 원장화면 헤더 있는 레이아웃

 @example 
 <Director>
   Contents
 </Director>
 
 */

export default function Director() {
  return (
    <Box component="main">
      <DirectorHeader />
      <Box sx={{ py: 10, px: 5, maxHeight: '100vh', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
