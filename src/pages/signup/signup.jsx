import React, { useState } from 'react';
import { Box, Button, Typography, Container, Link, Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SignUp() {
  // 0: 선택화면, 1: 회원가입화면 2: 완료화면
  const [status, setStatus] = useState(0);
  const [position, setPosition] = useState('');

  const handleSelect = (pos) => {
    setStatus(1);
    setPosition(pos);
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
        {status === 0 && <SelectPosition handleSelect={handleSelect} />}
        {status === 1 && <SignupForm position={position} setStatus={setStatus} />}
        {status === 2 && <Succeed name="홍길동" position={position} />}
      </Box>
    </Container>
  );
}

function SelectPosition({ handleSelect }) {
  return (
    <>
      <Typography variant="h5" align="center" mb={30}>
        회원가입
      </Typography>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleSelect('director')}>
        학원 대표
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleSelect('teacher')}>
        학원 강사
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            이미 계정이 있으신가요? 로그인
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

function SignupForm({ position, setStatus }) {
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
    else {
      console.log(submitData);
      setStatus(2);
    }
  };

  return (
    <Box>
      <Typography variant="h5" align="center" mb={1}>
        회원가입
      </Typography>
      <Typography variant="body1" align="center" mb={10}>
        {position === 'director' && '학원 대표'}
        {position === 'teacher' && '학원 강사'}
      </Typography>
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
          <PersonalInfo title="개인 정보" />
        </Grid>
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
          가입하기
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 1, mb: 3 }}>
          <Grid item>
            <Button variant="text" onClick={() => setStatus(0)}>
              이전 화면으로
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function PersonalInfo({ title }) {
  const [value, setValue] = useState(null);

  return (
    <>
      <Grid item xs={12} mt={2}>
        <Typography fontWeight="medium">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField name="name" required fullWidth id="name" label="이름" />
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DemoItem label="생년월일">
              <DatePicker maxDate={dayjs()} value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField required fullWidth id="email" label="이메일 주소" name="email" />
      </Grid>
      <Grid item xs={12}>
        <TextField required fullWidth id="phonenumber" label="전화번호" name="phonenumber" />
      </Grid>
    </>
  );
}

function Succeed({ name, position }) {
  return (
    <Box>
      <Typography variant="h5" align="center" mb={20}>
        {name}
        {position === 'director' && '(원장)'}
        {position === 'teacher' && '(강사)'}
        님, <br />
        회원가입이 완료되었습니다!
      </Typography>
      <Button variant="contained" size="large" fullWidth href="/login">
        로그인
      </Button>
    </Box>
  );
}
