import React from 'react';

import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function AddButton({ title, onClick }) {
  return (
    <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
      <Button size="large" variant="contained" startIcon={<Add />} onClick={onClick}>
        {title}
      </Button>
    </Box>
  );
}
