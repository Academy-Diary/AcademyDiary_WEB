import React, { useState } from 'react';
import { Box, Button, Typography, Container, Link, Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUp() {
  const [selected, setSelected] = useState(false);
  const [role, setRole] = useState('');

  const handleClickRole = (_role) => {
    setSelected(true);
    setRole(_role);
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
        <Box mb={10}>
          <Typography variant="h5">회원가입</Typography>
        </Box>
        {selected ? <SignupForm setSelected={setSelected} role={role} /> : <RoleSelection handleClickRole={handleClickRole} />}
      </Box>
    </Container>
  );
}

function RoleSelection({ handleClickRole }) {
  return (
    <Box mt={20}>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleClickRole('director')}>
        학원 대표
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleClickRole('teacher')}>
        학원 강사
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleClickRole('student')}>
        학생/학부모
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            이미 계정이 있으신가요? 로그인
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

function SignupForm({ setSelected }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
    };

    if (submitData.password !== submitData.password2) alert('입력한 두 비밀번호가 일치하지 않습니다.');
    else console.log(submitData);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField name="userid" id="userid" label="아이디" required fullWidth autoFocus />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" size="large" sx={{ m: 1 }}>
            중복확인
          </Button>
        </Grid>
        <Grid item xs={12}>
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
            required
            fullWidth
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="password"
          />
        </Grid>
        <Grid item xs={12}>
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
            required
            fullWidth
            name="password2"
            label="비밀번호 확인"
            id="password2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField name="name" required fullWidth id="name" label="이름" />
        </Grid>
        <Grid item xs={12}>
          <Typography>생년월일</Typography>
          <input type="date" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="email" label="이메일 주소" name="email" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="phonenumber" label="전화번호" name="phonenumber" />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }}>
        가입하기
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant="text" onClick={() => setSelected(false)}>
            이전 화면으로
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
