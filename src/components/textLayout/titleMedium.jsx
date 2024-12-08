import React from 'react';
import { Typography } from '@mui/material';

export default function TitleMedium({ title }) {
  return (
    <Typography variant="h6" sx={{ pt: 2, pb: 3 }} fontFamily="Pretendard-Regular" fontWeight="bold">
      {title}
    </Typography>
  );
}
