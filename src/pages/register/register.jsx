import React, { useState } from 'react';

import { Box, Container, Typography, Button, TextField, Grid } from '@mui/material';
import useLogout from '../../api/queries/user/useLogout';

export default function Register({ name, position }) {
  // 0: 요청 버튼, 1: 학원 등록, 2: 강사 등록
  const [status, setStatus] = useState(0);

  const logoutMutation = useLogout();

  const handleClick = () => {
    if (position === 'director') setStatus(1);
    else if (position === 'teacher') setStatus(2);
  };

  const handleSignOut = () => {
    logoutMutation.mutate();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" align="center">
          Academy Pro
        </Typography>
        {status === 0 && <BeforeRegister name={name} position={position} handleClick={handleClick} handleSignOut={handleSignOut} />}
        {status === 1 && <RegisterAcademy />}
        {status === 2 && <RegisterTeacher />}
      </Box>
    </Container>
  );
}

function BeforeRegister({ name, position, handleClick, handleSignOut }) {
  return (
    <Box mt={10} sx={{ width: '100%' }}>
      {position === 'director' && (
        <Typography variant="h5" align="center" mb={20}>
          {name}(원장)님,
          <br />
          학원을 등록해주세요.
        </Typography>
      )}
      {position === 'teacher' && (
        <Typography variant="h5" align="center" mb={20}>
          {name}(강사)님,
          <br />
          근무하고 계신 학원에 강사 등록을 요청하세요.
        </Typography>
      )}
      <Button variant="contained" size="large" fullWidth onClick={handleClick}>
        {position === 'director' ? '우리 학원 등록하기' : '학원에 등록 요청하기'}
      </Button>
      <Button size="large" fullWidth onClick={handleSignOut}>
        로그아웃
      </Button>
    </Box>
  );
}

function RegisterAcademy() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const submitData = {
      academyname: data.get('academyname'),
      academyemail: data.get('academyemail'),
      academyphone: data.get('academyphone'),
      academyaddress: data.get('academyaddress'),
    };

    console.log(submitData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={5}>
      <Typography variant="h5" align="center" mb={10}>
        학원 등록
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <TextField name="academyname" id="academyname" label="학원 이름" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="academyemail" id="academyemail" label="학원 이메일" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="academyphone" id="academyphone" label="학원 전화번호" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="academyaddress" id="academyaddress" label="학원 주소" required fullWidth />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" size="large" fullWidth>
        등록 요청하기
      </Button>
    </Box>
  );
}

function RegisterTeacher() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const submitData = {
      invitkey: data.get('invitkey'),
      name: data.get('name'),
    };

    console.log(submitData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={5}>
      <Typography variant="h5" align="center" mb={10}>
        강사 등록
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <TextField name="invitkey" id="invitkey" label="학원 초대키" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="name" id="name" label="강사 이름" required fullWidth />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" size="large" fullWidth mt={2}>
        등록 요청하기
      </Button>
    </Box>
  );
}
