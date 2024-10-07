import React from 'react';

import { Box, Button, TextField, Grid } from '@mui/material';
import { TitleMedium } from '../../components';

export default function FindId() {
  return (
    <>
      <TitleMedium title="아이디 찾기" />
      <Box component="form" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="이메일" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="전화번호" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{ mt: 3 }}>
              찾기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
