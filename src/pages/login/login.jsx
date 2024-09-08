import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Link, Grid, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useLogin } from '../../api/queries/user/useLogin';
import { PATH } from '../../route/path';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      user_id: data.get('userId'),
      password: data.get('password'),
    });

    loginMutation.mutate(
      {
        user_id: data.get('userId'),
        password: data.get('password'),
      },
      {
        onSuccess: () => {
          navigate(PATH.root);
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );

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
            <Grid item>
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
