import React from 'react';

import { Box } from '@mui/material';

import DirectorHeader from '../header/directorHeader';

/**
 *@description 원장화면 헤더 있는 레이아웃

 @example 
 <Director>
   Contents
 </Director>
 
 */

export default function Director({ children }) {
  return (
    <Box component="main">
      <DirectorHeader />
      <Box sx={{ py: 2, px: 5 }}>{children}</Box>
    </Box>
  );
}
