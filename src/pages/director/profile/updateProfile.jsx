import React, { useState } from 'react';

import { Box, Button, Container, TextField, Typography, Grid, Avatar, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SubmitButtons } from '../../../components';
import { useUpdateProfile } from '../../../api/queries/user/useProfile';
import { useUserAuthStore } from '../../../store';
import { useCancelAccount } from '../../../api/queries/user/useCancelAccount';

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
  const { user } = useUserAuthStore();
  const [date, setDate] = useState(dayjs(user.birth_date));
  const [open, setOpen] = useState(false);

  const updateProfileMutation = useUpdateProfile(user.user_id);
  const cancelAccountMutation = useCancelAccount(user.user_id);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const submitData = {
      user_name: data.get('user_name'),
      phone_number: data.get('phone_number'),
      email: data.get('email'),
      birth_date: date.toISOString(),
    };

    // console.log(submitData);
    updateProfileMutation.mutate(submitData);
  };

  // 회원 탈퇴
  const handleCancelAccount = () => {
    handleCloseDialog();
    cancelAccountMutation.mutate();
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
          <TextField label="이름" name="user_name" defaultValue={user.user_name} required />
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
          <TextField label="전화번호" name="phone_number" defaultValue={user.phone_number} required fullWidth sx={{ mb: 2 }} />
          <TextField label="이메일" name="email" defaultValue={user.email} required fullWidth sx={{ mb: 2 }} />
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
      <Button sx={{ mt: 3 }} onClick={handleOpenDialog}>
        회원 탈퇴
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText color="black">정말로 탈퇴하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleCancelAccount}>탈퇴</Button>
        </DialogActions>
      </Dialog>
      <SubmitButtons submitTitle="수정 완료" />
    </Box>
  );
}
