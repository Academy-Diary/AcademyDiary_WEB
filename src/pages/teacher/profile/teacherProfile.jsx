import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useUserAuthStore } from '../../../store';
import { TitleMedium } from '../../../components';

export default function TeacherProfile() {
  const { user } = useUserAuthStore();
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
            <Typography variant="body1">생년월일: {user?.birth_date.split('T')[0]}</Typography>
            <Typography variant="body1">전화번호: {user?.phone_number}</Typography>
            <Typography variant="body1">이메일: {user?.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">담당강의</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">확률과 통계</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
