import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { LoginOutlined, PersonAddAlt1Outlined } from '@mui/icons-material';

import logo from '../../assets/logo.png';
import kakaoLogin from '../../assets/kakaotalk_logo.png';
import { LogoTitle } from '../../components';

export default function FirstPage() {
  return (
    <>
      <Box component="img" src={logo} sx={{ width: 200 }} />
      <LogoTitle mb={3} />
      <Typography align="center" sx={{ mb: 25 }}>
        우리들의 스마트한 학습 관리
      </Typography>
      <Button variant="contained" size="large" startIcon={<LoginOutlined />} sx={{ m: 1, width: 300, borderRadius: 10 }} fullWidth href="/login">
        로그인
      </Button>
      <Button variant="contained" size="large" startIcon={<PersonAddAlt1Outlined />} sx={{ m: 1, width: 300, borderRadius: 10 }} fullWidth href="/signup" color="secondary">
        회원가입
      </Button>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Box component="img" src={kakaoLogin} sx={{ m: 1, width: 30 }} />
        <Typography
          sx={{
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          카카오 계정으로 로그인
        </Typography>
      </Box>
    </>
  );
}
