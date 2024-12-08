import React, { useState } from 'react';

import { Box, Button, TextField, Grid, Typography, Alert, CircularProgress } from '@mui/material';
import { CustomLink } from '../../components';
import { PATH } from '../../route/path';
import useFindId from '../../api/queries/user/useFindId';

export default function FindId() {
  const [found, setFound] = useState(false);
  const [userId, setUserId] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 스핀

  const [isLoading, setLoading] = useState(false);

  const findIdMutation = useFindId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      email: data.get('email'),
      phone_number: data.get('phonenumber'),
    };

    setLoading(true);
    // console.log(submitData);
    setIsLoading(true);
    findIdMutation.mutate(submitData, {
      onSuccess: (res) => {
        setLoading(false);
        setFound(true);
        setUserId(res.data.user_id);
        setIsLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        setIsError(true);
        setIsLoading(false);
        if (error.errorCode === 400) setErrorMsg('이메일 혹은 전화번호 형식을 올바르게 입력해주세요.');
        else if (error.errorCode === 404) setErrorMsg('계정이 존재하지 않습니다.');
        else if (error.errorCode === 500) setErrorMsg('서버 오류로 아이디를 찾을 수 없습니다.');
      },
    });
  };

  if (isLoading) return <Mosaic color={['#006336', '#024F51', '#064420', '#F4D65F']} />;

  return (
    <>
      <Typography variant="h5" align="center" sx={{ mt: 3, mb: 7 }}>
        아이디 찾기
      </Typography>
      {isLoading && <CircularProgress />}
      {found ? (
        <Grid container spacing={5} sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <TextField value={userId} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" fullWidth href={PATH.LOGIN.ROOT}>
              로그인하기
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="이메일" name="email" required fullWidth error={isError} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="전화번호" name="phonenumber" required fullWidth error={isError} />
            </Grid>
            <Grid item xs={12}>
              {isError && <Alert severity="error">{errorMsg}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                찾기
              </Button>
            </Grid>
            <Grid item xs={12}>
              <CustomLink to={PATH.LOGIN.ROOT} text="로그인" />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
