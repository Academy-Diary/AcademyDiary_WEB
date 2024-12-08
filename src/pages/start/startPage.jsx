import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Box } from '@mui/material';
import Colors from '../../styles/colors';

export default function StartPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: Colors.Beige,
      }}
    >
      <Box
        sx={{
          width: '80%',
          minHeight: '95%',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: Colors.White,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1, // 내용이 배경 위로 올라오도록 설정
            position: 'relative', // zIndex를 적용하려면 필요
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
