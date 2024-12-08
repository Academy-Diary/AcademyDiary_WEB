import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Avatar, Box, Card, Grid, IconButton, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { useUserAuthStore } from '../../../store';
import { CustomLink, TitleMedium } from '../../../components';
import { PATH } from '../../../route/path';
import { useAcademyInfo } from '../../../api/queries/user/useAcademyInfo';
import Colors from '../../../styles/colors';

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
    <>
      <TitleMedium title="프로필" />
      <Grid container sx={{ width: '70vw', mt: 3 }}>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={profileImg} sx={{ width: 150, height: 150, mb: 2 }} />
            <Typography sx={{ fontWeight: 500 }}>프로필 사진</Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={4}>
            <Grid item xs={1.5}>
              <Typography variant="h6">{user.user_name}</Typography>
            </Grid>
            <Grid item xs={10.5}>
              <IconButton onClick={handleClickUpdate} sx={{ p: 0 }}>
                <EditOutlined />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>개인 정보</Typography>
              <Card sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, backgroundColor: Colors.LightGrey }}>
                <Typography>• 생년월일: {dayjs(user.birth_date).format('YYYY-MM-DD')}</Typography>
                <Typography>• 전화번호: {user.phone_number}</Typography>
                <Typography>• 이메일: {user.email}</Typography>
              </Card>
            </Grid>
            {hasRegistered && (
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>학원 정보</Typography>
                <Card sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, backgroundColor: Colors.LightGrey }}>
                  <Typography>• 이름: {academyInfo?.academy_name}</Typography>
                  <Typography>• 전화번호: {academyInfo?.phone_number}</Typography>
                  <Typography>• 주소: {academyInfo?.address}</Typography>
                  <Typography>• 이메일: {academyInfo?.academy_email}</Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
