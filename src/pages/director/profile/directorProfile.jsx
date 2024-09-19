import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function DirectorProfile() {
  const navigate = useNavigate();

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
          <Typography variant="h6">권지옹 원장</Typography>
          <IconButton sx={{ m: 2 }} onClick={handleClickUpdate}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">개인 정보</Typography>
          <Box sx={{ p: 2, backgroundColor: 'lightgray' }}>
            <Typography variant="body1">생년월일: 1963.10.24</Typography>
            <Typography variant="body1">전화번호: 010-9393-2929</Typography>
            <Typography variant="body1">이메일: geedragon@gmail.com</Typography>
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
