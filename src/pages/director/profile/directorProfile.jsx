import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { useUserAuthStore } from '../../../store';
import { CustomLink } from '../../../components';
import { PATH } from '../../../route/path';
import { useAcademyInfo } from '../../../api/queries/user/useAcademyInfo';

// const user = {
//   "user_id": "testuser",
//   "academy_id": "string",
//   "email": "string",
//   "birth_date": "2024-11-25T00:00:00.000Z",
//   "user_name": "string",
//   "phone_number": "string",
//   "role": "string",
//   "uploadProfileImage": "string"
// }

// const academyInfo = {
//   academy_id: '1234-5678-9012',
//   academy_name: '한빛 학원',
//   academy_email: 'info@hanbitacademy.com',
//   address: '서울시 강남구 테헤란로 123',
//   phone_number: '02-1234-5678',
// };

export default function DirectorProfile() {
  const navigate = useNavigate();
  const { user, profileImg } = useUserAuthStore(); // 기본 정보
  const hasRegistered = user.academy_id !== null;

  const { data: academyInfo } = useAcademyInfo(); // 학원 정보

  const handleClickUpdate = () => {
    navigate('/director/profile/update');
  };

  return (
    <Container sx={{ width: '50vw', padding: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar src={profileImg} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">{user.user_name} 원장</Typography>
          <IconButton sx={{ m: 2 }} onClick={handleClickUpdate}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">개인 정보</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">생년월일: {dayjs(user.birth_date).format('YYYY-MM-DD')}</Typography>
            <Typography variant="body1">전화번호: {user.phone_number}</Typography>
            <Typography variant="body1">이메일: {user.email}</Typography>
          </Box>
        </Grid>
        {hasRegistered && (
          <Grid item xs={12}>
            <Typography variant="h6">학원 정보</Typography>
            <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
              <Typography variant="body1">이름: {academyInfo?.academy_name}</Typography>
              <Typography variant="body1">전화번호: {academyInfo?.phone_number}</Typography>
              <Typography variant="body1">주소: {academyInfo?.address}</Typography>
              <Typography variant="body1">이메일: {academyInfo?.academy_email}</Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={6}>
          <CustomLink to={PATH.DIRECTOR.PROFILE.UPDATE_PW} text="비밀번호 변경" />
        </Grid>
      </Grid>
    </Container>
  );
}
