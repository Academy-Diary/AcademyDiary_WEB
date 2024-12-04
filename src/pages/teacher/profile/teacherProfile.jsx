import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import dayjs from 'dayjs';
import { useUserAuthStore } from '../../../store';
import { CustomLink, Title } from '../../../components';
import { PATH } from '../../../route/path';

export default function TeacherProfile() {
  const { user, profileImg, lectures } = useUserAuthStore();
  const navigate = useNavigate();

  return (
    <Container sx={{ padding: 5 }}>
      <Title title="계정 설정" />
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Avatar src={profileImg} sx={{ width: 160, height: 160, ml: '25%', border: '1px solid #000000' }} />
          <Typography fontFamily="Pretendard-Regular" textAlign="center">
            프로필 사진
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" fontFamily="Pretendard-Regular">
              {user?.user_name}
            </Typography>
            <IconButton
              sx={{ m: 2 }}
              onClick={() => {
                navigate('/teacher/profile/update');
              }}
            >
              <Edit />
            </IconButton>
          </Grid>
          <Typography variant="h6" sx={{ ml: 3, mt: 4 }} fontFamily="Pretendard-Regular">
            개인 정보
          </Typography>
          <Box sx={{ p: '1px', backgroundColor: '#EEEEEE', boxShadow: '0px 5px 8px 0px rgb(0, 0, 0, 0.3)' }}>
            <ul>
              <li style={{ padding: '6px' }}>
                <Typography variant="body1" fontFamily="Pretendard-Regular">
                  생년월일: {dayjs(user?.birth_date).format('YYYY-MM-DD')}
                </Typography>
              </li>
              <li style={{ padding: '6px' }}>
                <Typography variant="body1" fontFamily="Pretendard-Regular">
                  전화번호: {user?.phone_number}
                </Typography>
              </li>
              <li style={{ padding: '6px' }}>
                <Typography variant="body1" fontFamily="Pretendard-Regular">
                  이메일: {user?.email}
                </Typography>
              </li>
            </ul>
          </Box>
          <Typography variant="h6" sx={{ ml: 3, mt: 4 }}>
            담당강의
          </Typography>
          <Box sx={{ p: '1px', backgroundColor: '#EEEEEE', boxShadow: '0px 5px 8px 0px rgb(0, 0, 0, 0.3)', mb: 4 }}>
            <ul>
              {lectures.map((lecture) => (
                <li style={{ padding: '6px' }}>
                  <Typography variant="body1">{lecture.lecture_name}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <CustomLink to={PATH.DIRECTOR.PROFILE.UPDATE_PW} text="비밀번호 변경" />
        </Grid>
      </Grid>
    </Container>
  );
}
