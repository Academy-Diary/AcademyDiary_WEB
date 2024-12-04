import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import DirectorHeader from './header/directorHeader';
import Colors from '../../styles/colors';

/**
 *@description 원장화면 헤더 있는 레이아웃

 @example 
 <Director>
   Contents
 </Director>
 
 */

export default function Director() {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: Colors.Beige,
      }}
    >
      <DirectorHeader />
      <Box
        sx={{
          position: 'fixed',
          width: '85%',
          height: 'calc(100vh - 64px)',
          top: '64px',
          right: 0,
          backgroundColor: Colors.White,
          borderTopLeftRadius: 30,
          overflow: 'auto',
        }}
      >
        <Box sx={{ py: 3, px: 5, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
