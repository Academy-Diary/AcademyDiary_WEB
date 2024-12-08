import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import logo from '../../assets/logo.png';
import Colors from '../../styles/colors';

/**
 * 로고(이미지 + '아카데미 다이어리') 상단 앱바용
 */
export default function LogoImageTitle({ role }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${role === 'TEACHER' ? 'teacher' : 'director'}/`);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleClick}>
      <Box component="img" src={logo} sx={{ width: 80 }} />
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: Colors.Black,
          fontWeight: 600,
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        아카데미 다이어리
      </Typography>
    </Box>
  );
}
