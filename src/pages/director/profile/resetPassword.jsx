import React, { useState } from 'react';

import { Container, Box, TextField, InputAdornment, IconButton, Button, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { TitleMedium } from '../../../components';
import { useResetPassword } from '../../../api/queries/user/useProfile';
import { useUserAuthStore } from '../../../store';

export default function ResetPassword() {
  const { user } = useUserAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const resetPwMutation = useResetPassword(user.user_id);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const password2 = data.get('password2');

    if (password !== password2) {
      setIsError(true);
      setErrorMsg('입력하신 두 비밀번호가 일치하지 않습니다.');
    } else
      resetPwMutation.mutate(password, {
        onError: () => {
          setIsError(true);
          setErrorMsg('서버 오류로 비밀번호 변경에 실패하였습니다. \n나중에 다시 시도해주세요.');
        },
      });
  };

  return (
    <Container sx={{ width: '50vw', p: 5 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TitleMedium title="비밀번호 변경" />
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="비밀번호"
          required
          fullWidth
          sx={{ my: 1 }}
          error={isError}
        />
        <TextField type="password" name="password2" label="비밀번호 재입력" required fullWidth sx={{ my: 1 }} error={isError} />
        {isError && <Alert severity="error">{errorMsg}</Alert>}
        <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }}>
          변경하기
        </Button>
      </Box>
    </Container>
  );
}
