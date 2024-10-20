import React, { useState } from 'react';
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';

import { TitleMedium, CustomLink } from '../../components';
import { PATH } from '../../route/path';
import useResetPw from '../../api/queries/user/useResetPw';

export default function ResetPassword() {
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false); // 이메일, 전화번호 형식 오류

  const resetPwMutation = useResetPw();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      user_id: data.get('userId'),
      phone_number: data.get('phonenumber'),
      email: data.get('email'),
    };

    resetPwMutation.mutate(submitData, {
      onSuccess: () => {
        setSent(true);
      },
      onError: (error) => {
        if (error.errorCode === 400) {
          setErrorMsg('이메일 혹은 전화번호 형식을 올바르게 입력해주세요.');
          setIsError(true);
        } else if (error.errorCode === 404) {
          setErrorMsg('등록된 계정이 없습니다.');
          setIsError(false);
        } else if (error.errorCode === 500) {
          setErrorMsg('서버 오류로 진행할 수 없습니다. 나중에 다시 시도해주세요.');
          setIsError(false);
        }
      },
    });
  };

  return (
    <>
      <TitleMedium title="비밀번호 변경하기" />
      {sent ? (
        <>
          <Typography variant="body1" align="center">
            입력하신 주소로 메일을 전송하였습니다.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 5 }} href={PATH.LOGIN.ROOT}>
            로그인하기
          </Button>
        </>
      ) : (
        <>
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
                <TextField label="전화번호" name="phonenumber" required fullWidth error={isError} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="이메일" name="email" required fullWidth error={isError} />
              </Grid>
              {errorMsg.length > 0 && (
                <Grid item xs={12}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Button type="submit" size="large" variant="contained" fullWidth>
                  이메일 전송하기
                </Button>
              </Grid>
              <Grid item xs={12}>
                <CustomLink to={PATH.LOGIN.ROOT} text="로그인" />
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
