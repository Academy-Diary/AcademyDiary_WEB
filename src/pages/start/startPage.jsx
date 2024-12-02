import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Box } from '@mui/material';

export default function StartPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
}
