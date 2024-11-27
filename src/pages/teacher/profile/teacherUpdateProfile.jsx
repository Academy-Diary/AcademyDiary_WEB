import React, { useState } from 'react';

import { Alert, Avatar, Box, Button, Container, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Close } from '@mui/icons-material';

import { useUserAuthStore } from '../../../store';
import { SubmitButtons } from '../../../components';
import { useUpdateProfile } from '../../../api/queries/user/useProfile';
import { useCancelAccount } from '../../../api/queries/user/useCancelAccount';
import { useCheckPassword } from '../../../api/queries/user/useCheckPw';

export default function TeacherUpdateProfile() {
  const { user } = useUserAuthStore();
  const [passed, setPassed] = useState(false);
  const ckpassword = useCheckPassword();

  return <Container sx={{ width: 400, p: 5 }}>{passed ? <UpdateProfileForm currentInfo={user} /> : <CheckPasswd setPassed={setPassed} ckpassword={ckpassword} />}</Container>;
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
  const { user } = useUserAuthStore();
  const [date, setDate] = useState(dayjs(currentInfo.birth_date));
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const updateProfileMutation = useUpdateProfile(user.user_id);
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
    const { target } = e;
    const name = target[0].value;
    const birth = new Date(target[2].value);
    const phone = target[5].value;
    const eMail = target[7].value;
    const submitData = {
      user_name: name,
      phone_number: phone,
      email: eMail,
      birth_date: birth.toISOString(),
    };

    updateProfileMutation.mutate(submitData, { onSuccess: (data) => navigate('/teacher/profile') });
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
              <DatePicker label="생년월일" maxDate={dayjs()} value={date} onChange={(newValue) => setDate(newValue)} format="YYYY-MM-DD" />
            </DemoContainer>
          </LocalizationProvider>
          <TextField label="전화번호" defaultValue={currentInfo.phone_number} required fullWidth sx={{ mb: 2 }} />
          <TextField label="이메일" defaultValue={currentInfo.email} required fullWidth sx={{ mb: 2 }} />
        </Grid>
        <Button sx={{ mt: 3 }} onClick={handleDeleteAccount}>
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
      <SubmitButtons submitTitle="수정 완료" />
    </Box>
  );
}
