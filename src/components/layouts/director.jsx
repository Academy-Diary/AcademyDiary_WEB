import React from 'react';

import { Box } from '@mui/material';

import DirectorHeader from '../header/directorHeader';

export default function Director({ children }) {
  return (
    <Box component="main">
      <DirectorHeader />
      <Box sx={{ py: 2, px: 5 }}>{children}</Box>
    </Box>
  );
}
