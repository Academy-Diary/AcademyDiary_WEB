import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Link, Grid, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // 로그인 성공 시
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" align="center" mb={5}>
          Academy Pro
        </Typography>
        <Typography variant="h5" align="center" mb={3}>
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="userId" label="아이디" name="userId" autoComplete="on" autoFocus />
          <TextField
            margin="normal"
            required
            fullWidth
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
            id="password"
            autoComplete="off"
          />
          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ my: 2 }}>
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                계정이 없으신가요? 회원가입하러 가기
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;