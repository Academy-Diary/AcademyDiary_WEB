import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { useUserAuthStore } from '../../../store';
import { CustomLink } from '../../../components';
import { PATH } from '../../../route/path';
import { useProfileImage } from '../../../api/queries/user/useProfile';
import { useAcademyInfo } from '../../../api/queries/user/useAcademyInfo';

// const user = {
//   "user_id": "testuser",
//   "academy_id": "string",
//   "email": "string",
//   "birth_date": "2024-11-25",
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
  const { user } = useUserAuthStore(); // 기본 정보

  const { data: academyInfo } = useAcademyInfo(); // 학원 정보
  const { data: imageUrl } = useProfileImage(user.user_id);

  const handleClickUpdate = () => {
    navigate('/director/profile/update');
  };

  return (
    <Container sx={{ width: '50vw', padding: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar src={imageUrl} sx={{ width: 100, height: 100 }} />
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
            <Typography variant="body1">생년월일: {user.birth_date.split('T')[0]}</Typography>
            <Typography variant="body1">전화번호: {user.phone_number}</Typography>
            <Typography variant="body1">이메일: {user.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">학원 정보</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">이름: {academyInfo?.academy_name}</Typography>
            <Typography variant="body1">전화번호: {academyInfo?.phone_number}</Typography>
            <Typography variant="body1">주소: {academyInfo?.address}</Typography>
            <Typography variant="body1">이메일: {academyInfo?.academy_email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <CustomLink to={PATH.DIRECTOR.PROFILE.UPDATE_PW} text="비밀번호 변경" />
        </Grid>
      </Grid>
    </Container>
  );
}
