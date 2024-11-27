import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import dayjs from 'dayjs';
import { useUserAuthStore } from '../../../store';
import { CustomLink, TitleMedium } from '../../../components';
import { PATH } from '../../../route/path';

export default function TeacherProfile() {
  const { user, lectures } = useUserAuthStore();
  const navigate = useNavigate();
  return (
    <Container sx={{ width: '50vw', padding: 5 }}>
      <TitleMedium title="My Profile" />
      <Grid container spacing={5}>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">{user?.user_name}</Typography>
          <IconButton
            sx={{ m: 2 }}
            onClick={() => {
              navigate('/teacher/profile/update');
            }}
          >
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">개인 정보</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">생년월일: {dayjs(user?.birth_date).format('YYYY-MM-DD')}</Typography>
            <Typography variant="body1">전화번호: {user?.phone_number}</Typography>
            <Typography variant="body1">이메일: {user?.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">담당강의</Typography>
          {lectures.map((lecture) => (
            <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
              <Typography variant="body1">{lecture.lecture_name}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
          <CustomLink to={PATH.DIRECTOR.PROFILE.UPDATE_PW} text="비밀번호 변경" />
        </Grid>
      </Grid>
    </Container>
  );
}
