import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, TextField, Typography, Grid, Avatar, Snackbar, IconButton, Alert, Badge, Card } from '@mui/material';
import { Close, EditOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SimpleDialog, SubmitButtons, TitleMedium } from '../../../components';
import { useUpdateProfile, useUpdateProfileImage } from '../../../api/queries/user/useProfile';
import { useAcademyInfo, useUpdateAcademyInfo } from '../../../api/queries/user/useAcademyInfo';
import { useUserAuthStore } from '../../../store';
import { useCancelAccount } from '../../../api/queries/user/useCancelAccount';
import { useCheckPassword } from '../../../api/queries/user/useCheckPw';
import Colors from '../../../styles/colors';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function UpdateProfile() {
  const [passed, setPassed] = useState(false);
  const ckpassword = useCheckPassword();

  if (passed) return <UpdateProfileForm />;
  return <CheckPasswd setPassed={setPassed} ckpassword={ckpassword} />;
}

function CheckPasswd({ setPassed, ckpassword }) {
  const [hasfailed, setfailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password1 = e.target.password.value;
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
    <Container sx={{ width: 400, p: 5 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mb: 7 }}>
          비밀번호 확인
        </Typography>
        <TextField name="password" label="비밀번호" required error={hasfailed} fullWidth type="password" sx={{ my: 1 }} />
        {hasfailed ? <Alert severity="error">잘못된 비밀번호입니다.</Alert> : null}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          확인
        </Button>
      </Box>
    </Container>
  );
}

function UpdateProfileForm() {
  const navigate = useNavigate();
  const { user, profileImg, updateProfileImg } = useUserAuthStore();
  const hasRegistered = user.academy_id !== null;

  const [date, setDate] = useState(dayjs(user.birth_date));
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { data: academyInfo, refetch: refetchAcademyInfo } = useAcademyInfo();
  const updateProfileMutation = useUpdateProfile(user.user_id);
  const updateAcademyMutation = useUpdateAcademyInfo();
  const updateProfileImgMutation = useUpdateProfileImage(user.user_id);
  const cancelAccountMutation = useCancelAccount(user.user_id);

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
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // 프로필 이미지 수정
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const submitData = new FormData();
    submitData.append('file', file);
    updateProfileImgMutation.mutate(submitData, {
      onSuccess: (data) => {
        alert('프로필 이미지 수정 성공!');
        updateProfileImg(`${data.image}?timestamp=${new Date().getTime()}`);
      },
      onError: () => {
        alert('프로필 이미지 수정 실패!');
      },
    });

    e.target.value = ''; // input value 초기화
  };

  // 기본정보 및 학원정보 수정
  // TODO: 두개 분리
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
    updateProfileMutation.mutate(submitData, {
      onSuccess: () => {
        // 학원정보 수정
        const submitData2 = {
          academy_name: data.get('academy_name'),
          academy_email: data.get('academy_email'),
          address: data.get('academy_address'),
          phone_number: data.get('academy_phone'),
        };
        // console.log(submitData2);
        updateAcademyMutation.mutate(submitData2, {
          onSuccess: () => {
            refetchAcademyInfo();
            alert('프로필 수정 성공!');
            navigate('/director/profile');
          },
        });
      },
    });
  };

  // 회원 탈퇴
  const handleCancelAccount = () => {
    handleCloseDialog();

    cancelAccountMutation.mutate('', {
      onError: (error) => {
        handleOpenSnackbar();
        if (error.errorCode === 403) setErrorMsg('학원에 소속된 사용자는 탈퇴할 수 없습니다.');
        else setErrorMsg('탈퇴 실패. 나중에 다시 시도해주세요.');
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TitleMedium title="프로필 수정" />
      <Grid container sx={{ width: '70vw', mt: 3 }}>
        <Grid item xs={4}>
          <Button component="label" role={undefined} tabIndex={-1} disableRipple>
            <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<EditOutlined />} tabIndex={-1}>
              <Avatar src={profileImg} sx={{ width: 150, height: 150 }} />
            </Badge>
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChangeImage} />
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>개인 정보</Typography>
          <Card sx={{ p: 2, backgroundColor: Colors.LightGrey }}>
            <Grid container>
              <Grid item xs={2}>
                <Typography>• 이름: </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name="user_name" defaultValue={user.user_name} required size="small" sx={{ width: 100 }} />
              </Grid>
              <Grid item xs={2}>
                <Typography>• 생년월일: </Typography>
              </Grid>
              <Grid item xs={10}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} sx={{ mb: 1 }}>
                    <DatePicker maxDate={dayjs()} value={date} onChange={(newValue) => setDate(newValue)} slotProps={{ textField: { size: 'small' } }} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2}>
                <Typography>• 전화번호: </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name="phone_number" defaultValue={user.phone_number} required size="small" sx={{ mb: 1, width: 250 }} />
              </Grid>
              <Grid item xs={2}>
                <Typography>• 이메일: </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name="email" defaultValue={user.email} required fullWidth size="small" sx={{ width: 250 }} />
              </Grid>
            </Grid>
          </Card>
          {hasRegistered && (
            <>
              <Typography sx={{ fontWeight: 500, mt: 4, mb: 1 }}>학원 정보</Typography>
              <Card sx={{ p: 2, backgroundColor: Colors.LightGrey }}>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography>• 이름: </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField name="academy_name" defaultValue={academyInfo?.academy_name} required size="small" sx={{ mb: 1, width: 250 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>• 전화번호: </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField name="academy_phone" defaultValue={academyInfo?.phone_number} required fullWidth size="small" sx={{ mb: 1, width: 250 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>• 주소: </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField name="academy_address" defaultValue={academyInfo?.address} required fullWidth size="small" sx={{ mb: 1 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>• 이메일: </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField name="academy_email" defaultValue={academyInfo?.academy_email} required size="small" sx={{ width: 250 }} />
                  </Grid>
                </Grid>
              </Card>
            </>
          )}
        </Grid>
      </Grid>
      <Box sx={{ position: 'absolute', bottom: '3vh', left: '3vw', display: 'flex', flexDirection: 'column' }}>
        <Button onClick={() => navigate('/director/profile/update-password')}>비밀번호 변경</Button>
        <Button onClick={handleOpenDialog}>회원 탈퇴</Button>
      </Box>

      <SimpleDialog openDialog={openDialog} handleClose={handleCloseDialog} text="정말로 탈퇴하시겠습니까?" second="탈퇴" handleClickSecond={handleCancelAccount} />
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
      <SubmitButtons submitTitle="수정 완료" />
    </Box>
  );
}
