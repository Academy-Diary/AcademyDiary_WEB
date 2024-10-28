import React, { useState } from 'react';

import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { useUserAuthStore } from '../../../store';
import { SubmitButtons } from '../../../components';

export default function TeacherUpdateProfile() {
  const { user } = useUserAuthStore();
  const [passed, setPassed] = useState(false);

  return <Container sx={{ width: 400, p: 5 }}>{passed ? <UpdateProfileForm currentInfo={user} /> : <CheckPasswd setPassed={setPassed} />}</Container>;
}

function CheckPasswd({ setPassed }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const password1 = e.target.password1.value;

    // TODO: if 올바르지 않은 비밀번호일 때 처리.
    setPassed(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        비밀번호 확인
      </Typography>
      <TextField name="password1" label="비밀번호" required fullWidth type="password" sx={{ my: 1 }} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        확인
      </Button>
    </Box>
  );
}

function UpdateProfileForm({ currentInfo }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(dayjs(currentInfo.birth_date.split('T')[0]));

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: 프로필 수정 요청

    navigate('/teacher/profile');
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
          <TextField label="이름" defaultValue={currentInfo.user_name} required />
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
          <TextField label="전화번호" defaultValue={currentInfo.phone_number} required fullWidth sx={{ mb: 2 }} />
          <TextField label="이메일" defaultValue={currentInfo.email} required fullWidth sx={{ mb: 2 }} />
        </Grid>
      </Grid>
      <SubmitButtons submitTitle="수정 완료" />
    </Box>
  );
}
