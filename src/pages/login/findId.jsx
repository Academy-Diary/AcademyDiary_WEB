import React from 'react';

import { Box, Button, TextField, Grid } from '@mui/material';
import { TitleMedium } from '../../components';
import useFindId from '../../api/queries/user/useFindId';

export default function FindId() {
  const findIdMutation = useFindId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      email: data.get('email'),
      phone_number: data.get('phonenumber'),
    };

    // console.log(submitData);
    findIdMutation.mutate(submitData, {
      onSuccess: (res) => {
        console.log(res.data.user_id);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  return (
    <>
      <TitleMedium title="아이디 찾기" />
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="이메일" name="email" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="전화번호" name="phonenumber" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }}>
              찾기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
