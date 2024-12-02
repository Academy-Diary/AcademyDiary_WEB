import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserAuthStore } from '../../../store';
import ProfileButton from '../../button/profileButton';
import logoImage from '../../../img/logo.png';

export default function TeacherHeader() {
  const { user } = useUserAuthStore();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ height: '6rem', backgroundColor: '#EEEBDD', color: 'white', paddingX: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          onClick={() => {
            navigate('/teacher');
          }}
        >
          <img width="130px" src={logoImage} alt="logo" style={{ marginTop: '5px' }} />
          <Typography fontWeight="bold" fontFamily="Pretendard-Regular" fontSize="36px" color="black" sx={{ cursor: 'default' }}>
            아카데미 다이어리
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
          <ProfileButton position="teacher" />
          <Typography color="black" sx={{ padding: 1 }}>
            강사: {user?.user_name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
