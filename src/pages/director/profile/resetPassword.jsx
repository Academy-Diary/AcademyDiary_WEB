import React, { useState } from 'react';

import { Container, Box, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { TitleMedium } from '../../../components';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        />
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
          name="password2"
          label="비밀번호 재입력"
          required
          fullWidth
          sx={{ my: 1 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          확인
        </Button>
      </Box>
    </Container>
  );
}
