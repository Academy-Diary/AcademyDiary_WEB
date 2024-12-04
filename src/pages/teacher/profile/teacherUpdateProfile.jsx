import React, { useState } from 'react';

import { Alert, Avatar, Badge, Box, Button, Container, Grid, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Close, EditOutlined, Update } from '@mui/icons-material';
import styled from '@emotion/styled';

import { useUserAuthStore } from '../../../store';
import { SubmitButtons, Title } from '../../../components';
import { useUpdateProfile, useUpdateProfileImage } from '../../../api/queries/user/useProfile';
import { useCancelAccount } from '../../../api/queries/user/useCancelAccount';
import { useCheckPassword } from '../../../api/queries/user/useCheckPw';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function TeacherUpdateProfile() {
  const { user } = useUserAuthStore();
  const [passed, setPassed] = useState(false);
  const ckpassword = useCheckPassword();

  if (passed) return <UpdateProfileForm currentInfo={user} />;

  return (
    <Container sx={{ width: 400, p: 5 }}>
      <CheckPasswd setPassed={setPassed} ckpassword={ckpassword} />;
    </Container>
  );
}

function CheckPasswd({ setPassed, ckpassword }) {
  const [hasfailed, setfailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password1 = e.target.password1.value;
    ckpassword.mutate(
      {
        password: password1,
      },
      {
        onSuccess: (data) => {
          if (data.isMatched) setPassed(true);
          else setfailed(true);
        },
      }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        비밀번호 확인
      </Typography>
      <TextField name="password1" label="비밀번호" required error={hasfailed} fullWidth type="password" sx={{ my: 1 }} />
      {hasfailed ? <Alert severity="error">잘못된 비밀번호입니다.</Alert> : null}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        확인
      </Button>
    </Box>
  );
}

function UpdateProfileForm({ currentInfo }) {
  const navigate = useNavigate();
  const { user, profileImg, updateProfileImg } = useUserAuthStore();
  const [date, setDate] = useState(dayjs(currentInfo.birth_date));
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const updateProfileMutation = useUpdateProfile(user.user_id);
  const updateProfileImgMutation = useUpdateProfileImage(user.user_id);
  const deleteAccountMutation = useCancelAccount(user.user_id);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaaway') return;
    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: 프로필 수정 요청
    const data = new FormData(e.currentTarget);
    const submitData = {
      user_name: data.get('user_name'),
      phone_number: data.get('phone_number'),
      email: data.get('email'),
      birth_date: date.toISOString(),
    };

    updateProfileMutation.mutate(submitData, { onSuccess: () => navigate('/teacher/profile') });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    const submitData = new FormData();
    submitData.append('file', file);
    updateProfileImgMutation.mutate(submitData, {
      onSuccess: (data) => {
        alert('프로필 이미지 수정 성공!');
        updateProfileImg(`${data.image}?timestamp=${new Date().getTime()}`);
      },
      onError: () => {
        alert('프로필 이미지 수정 실패');
      },
    });

    e.target.value = '';
  };

  const handleDeleteAccount = () => {
    handleCloseDialog();

    deleteAccountMutation.mutate('', {
      onError: (error) => {
        handleOpenSnackbar();
        if (error.errorCode === 403) setErrorMsg('학원에 소속된 사용자는 탈퇴할 수 없습니다.');
        else setErrorMsg('탈퇴 실패. 나중에 다시 시도해주세요.');
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Title title="프로필 수정" />
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Button component="label" role={undefined} tabIndex={-1} disableRipple sx={{ ml: '25%' }}>
            <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<EditOutlined />} tabIndex={-1} sx={{ color: '#006336' }}>
              <Avatar src={profileImg} sx={{ width: 160, height: 160 }} />
            </Badge>
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChangeImage} />
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={8}>
            <TextField label="이름" name="user_name" defaultValue={currentInfo.user_name} required />
          </Grid>
          <Typography variant="h6" sx={{ mb: 2, mt: 4, fontFamily: 'Pretendard-Regular' }}>
            개인 정보
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ mb: 2 }}>
              <DatePicker label="생년월일" maxDate={dayjs()} value={date} onChange={(newValue) => setDate(newValue)} format="YYYY-MM-DD" />
            </DemoContainer>
          </LocalizationProvider>
          <Stack>
            <TextField label="전화번호" name="phone_number" defaultValue={currentInfo.phone_number} required sx={{ mb: 2, width: 230 }} />
            <TextField label="이메일" name="email" defaultValue={currentInfo.email} required sx={{ mb: 2, width: 230 }} />
          </Stack>
          <Button sx={{ mt: 3, color: '#006336', fontFamily: 'Pretendard-Regular' }} onClick={handleDeleteAccount}>
            {' '}
            회원탈퇴{' '}
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message={errorMsg}
            action={
              <IconButton onClick={handleCloseSnackbar} color="inherit" size="small">
                <Close fontSize="small" />
              </IconButton>
            }
          />
        </Grid>
      </Grid>
      <SubmitButtons submitTitle="수정 완료" />
    </Box>
  );
}
