import React from 'react';

import { Box, Button, TextField } from '@mui/material';
import { TitleMedium } from '../../components';

export default function FindId() {
  return (
    <>
      <TitleMedium title="아이디 찾기" />
      <Box component="form">
        <TextField label="이메일" />
        <TextField label="전화번호" />
        <Button variant="contained">찾기</Button>
      </Box>
    </>
  );
}
