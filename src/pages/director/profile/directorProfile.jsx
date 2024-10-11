import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useProfileBasic } from '../../../api/queries/user/useProfile';
import { useUserAuthStore } from '../../../store';

// 회원 basic info
// {
//   "user_id": "string",
//   "academy_id": "string",
//   "email": "user@example.com",
//   "birth_date": "2024-10-11",
//   "user_name": "string",
//   "phone_number": "string",
//   "role": "string",
//   "image": "string",
//   "family": "string"
// }

export default function DirectorProfile() {
  const navigate = useNavigate();
  const { user } = useUserAuthStore();

  const { data: basicInfo } = useProfileBasic(user.user_id);

  const handleClickUpdate = () => {
    navigate('/director/profile/update');
  };

  return (
    <Container sx={{ width: '50vw', padding: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">{basicInfo?.user_name} 원장</Typography>
          <IconButton sx={{ m: 2 }} onClick={handleClickUpdate}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">개인 정보</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">생년월일: {basicInfo?.birth_date}</Typography>
            <Typography variant="body1">전화번호: {basicInfo?.phone_number}</Typography>
            <Typography variant="body1">이메일: {basicInfo?.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">학원 정보</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">이름: 떡잎학원</Typography>
            <Typography variant="body1">전화번호: 010-8282-1111</Typography>
            <Typography variant="body1">주소: 서울특별시 서초구 서초1동 ...</Typography>
            <Typography variant="body1">이메일: tteokip@gmail.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
