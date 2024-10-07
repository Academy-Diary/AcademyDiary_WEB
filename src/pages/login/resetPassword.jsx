import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { TitleMedium } from '../../components';

export default function ResetPassword() {
  return (
    <>
      <TitleMedium title="비밀번호 변경하기" />
      <Typography variant="body1">
        가입하신 이메일 주소를 적어주시면 <br />
        비밀번호 변경 메일을 보내드릴게요.
      </Typography>
      <Box component="form" sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="이메일" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" size="large" variant="contained" fullWidth>
              이메일 전송하기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
