import React from 'react';
import { Typography, Button, Box } from '@mui/material';

import logo from '../../assets/logo.png';

export default function FirstPage() {
  return (
    <>
      <Box component="img" src={logo} sx={{ width: 200 }} />
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        아카데미 다이어리
      </Typography>
      <Typography align="center" sx={{ mb: 25 }}>
        우리들의 스마트한 학습 관리
      </Typography>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/login">
        로그인
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/signup" color="secondary">
        회원가입
      </Button>
    </>
  );
}
