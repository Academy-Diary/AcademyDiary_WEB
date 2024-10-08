import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { TitleMedium } from '../../components';
import useResetPw from '../../api/queries/user/useResetPw';

export default function ResetPassword() {
  const resetPwMutation = useResetPw();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      user_id: data.get('userId'),
      phone_number: data.get('phonenumber'),
      email: data.get('email'),
    };

    resetPwMutation.mutate(submitData);
  };

  return (
    <>
      <TitleMedium title="비밀번호 변경하기" />
      <Typography variant="body1" align="center">
        가입하신 정보를 적어주시면 <br />
        비밀번호 변경 메일을 보내드릴게요.
      </Typography>
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="아이디" name="userId" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="전화번호" name="phonenumber" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="이메일" name="email" required fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button type="submit" size="large" variant="contained" fullWidth>
              이메일 전송하기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
