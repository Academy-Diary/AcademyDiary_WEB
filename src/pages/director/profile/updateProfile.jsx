import React, { useEffect, useState } from 'react';

import { Box, Button, Container, TextField, Typography, Grid, Avatar, Snackbar, IconButton, Alert, Badge } from '@mui/material';
import { Close, EditOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SimpleDialog, SubmitButtons } from '../../../components';
import { useProfileImage, useUpdateProfile, useUpdateProfileImage } from '../../../api/queries/user/useProfile';
import { useUserAuthStore } from '../../../store';
import { useCancelAccount } from '../../../api/queries/user/useCancelAccount';
import { useCheckPassword } from '../../../api/queries/user/useCheckPw';

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

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function UpdateProfile() {
  const [passed, setPassed] = useState(false);
  const ckpassword = useCheckPassword();

  return <Container sx={{ width: 400, p: 5 }}>{passed ? <UpdateProfileForm currentInfo={directorProfile} /> : <CheckPasswd setPassed={setPassed} ckpassword={ckpassword} />}</Container>;
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
  );
}

function UpdateProfileForm({ currentInfo }) {
  const { user } = useUserAuthStore();
  const [date, setDate] = useState(dayjs(user.birth_date));
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imgUrl, setImgUrl] = useState(''); // Avatar 띄우기 용
  const [imgFile, setImgFile] = useState(null); // 서버에 전송하는 용

  const { data: profileImg } = useProfileImage(user.user_id);
  const updateProfileImgMutation = useUpdateProfileImage(user.user_id);
  const updateProfileMutation = useUpdateProfile(user.user_id);
  const cancelAccountMutation = useCancelAccount(user.user_id);

  useEffect(() => {
    if (profileImg) setImgUrl(profileImg);
  }, [profileImg]);

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

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };
  };
  // 프로필 수정
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
        // 프로필 이미지 수정
        const submitData2 = new FormData();
        submitData2.append('file', imgFile);
        updateProfileImgMutation.mutate(submitData2, {
          onSuccess: () => {
            alert('프로필 수정 성공!');
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
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h6">프로필 수정</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button component="label" role={undefined} tabIndex={-1} disableRipple>
            <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<EditOutlined />} tabIndex={-1}>
              <Avatar src={imgUrl} sx={{ width: 100, height: 100 }} />
            </Badge>
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChangeImage} />
          </Button>
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
