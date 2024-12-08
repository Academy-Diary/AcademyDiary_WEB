import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { BookmarkRounded } from '@mui/icons-material';

import DirectorHeader from './header/directorHeader';
import DirectorSidebar from './sidebar/directorSidebar';
import Colors from '../../styles/colors';

/**
 *@description 원장화면 헤더와 사이드바 있는 레이아웃

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
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: Colors.Beige,
      }}
    >
      <DirectorHeader />
      <DirectorSidebar />
      <Box
        sx={{
          position: 'fixed',
          width: '85%',
          height: 'calc(100vh - 80px)',
          top: '80px',
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
      <BookmarkRounded
        sx={{
          position: 'absolute',
          top: '60px',
          right: 200,
          fontSize: 50,
          color: Colors.Yellow,
        }}
      />
      <BookmarkRounded
        sx={{
          position: 'absolute',
          top: '60px',
          right: 160,
          fontSize: 50,
          color: Colors.Green,
        }}
      />
      <BookmarkRounded
        sx={{
          position: 'absolute',
          top: '60px',
          right: 120,
          fontSize: 50,
          color: Colors.Red,
        }}
      />
    </Box>
  );
}
