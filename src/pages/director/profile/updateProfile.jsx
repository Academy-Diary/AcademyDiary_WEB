import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, TextField, Typography, Grid, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SubmitButtons } from '../../../components';

const directorProfile = {
  personal: {
    name: '권지옹',
    birthdate: '1963-10-24',
    phone: '010-9393-2929',
    email: 'geedragon@gmail.com',
  },
  academy: {
    name: '떡잎학원',
    phone: '010-8282-1111',
    address: '서울특별시 서초구 서초1동 ...',
    email: 'tteokip@gmail.com',
  },
};

export default function UpdateProfile() {
  const [passed, setPassed] = useState(false);

  return <Container sx={{ width: 400, p: 5 }}>{passed ? <UpdateProfileForm currentInfo={directorProfile} /> : <CheckPasswd setPassed={setPassed} />}</Container>;
}

function CheckPasswd({ setPassed }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (password !== password2) alert('입력한 두 비밀번호가 일치하지 않습니다.');
    // else if 올바르지 않은 비밀번호일 때 처리
    else setPassed(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        비밀번호 확인
      </Typography>
      <TextField name="password" label="비밀번호" required fullWidth sx={{ my: 1 }} />
      <TextField name="password2" label="비밀번호 재입력" required fullWidth sx={{ my: 1 }} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        확인
      </Button>
    </Box>
  );
}

function UpdateProfileForm({ currentInfo }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(dayjs(currentInfo.personal.birthdate));

  const handleSubmit = (e) => {
    e.preventDefault();

    // 프로필 수정 요청

    navigate('/director/profile');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h6">프로필 수정</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField label="이름" defaultValue={currentInfo.personal.name} required />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            개인 정보
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ mb: 2 }}>
              <DatePicker label="생년월일" maxDate={dayjs()} value={date} onChange={(newValue) => setDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField label="전화번호" defaultValue={currentInfo.personal.phone} required fullWidth sx={{ mb: 2 }} />
          <TextField label="이메일" defaultValue={currentInfo.personal.email} required fullWidth sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            학원 정보
          </Typography>
          <TextField label="이름" defaultValue={currentInfo.academy.name} required fullWidth sx={{ mb: 2 }} />
          <TextField label="전화번호" defaultValue={currentInfo.academy.phone} required fullWidth sx={{ mb: 2 }} />
          <TextField label="주소" defaultValue={currentInfo.academy.address} required fullWidth sx={{ mb: 2 }} />
          <TextField label="이메일" defaultValue={currentInfo.academy.email} required fullWidth sx={{ mb: 2 }} />
        </Grid>
      </Grid>
      <SubmitButtons submitTitle="수정 완료" />
    </Box>
  );
}
