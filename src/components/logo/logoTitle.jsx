import React from 'react';
import { Typography } from '@mui/material';

/**
 * '아카데미 다이어리' 로고 타이틀 (드래그 못하게 설정)
 * @param {Int} mt marginTop
 * @param {Int} mb marginBottom
 *
 */
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
