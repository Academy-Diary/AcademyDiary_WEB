import React from 'react';
import { Typography } from '@mui/material';

// -webkit-user-select:none;
// -moz-user-select:none;
// -ms-user-select:none;
// user-select:none
export default function LogoTitle({ mt, mb }) {
  return (
    <Typography
      variant="h4"
      align="center"
      sx={{
        mt,
        mb,
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      아카데미 다이어리
    </Typography>
  );
}
