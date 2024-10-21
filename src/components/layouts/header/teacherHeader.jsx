import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserAuthStore } from '../../../store';
import ProfileButton from '../../button/profileButton';

export default function TeacherHeader() {
  const { user } = useUserAuthStore();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ height: '4rem', backgroundColor: 'grey', color: 'white', paddingX: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          component="span"
          fontWeight="bold"
          onClick={() => {
            navigate('/teacher');
          }}
        >
          AcademyPro
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>강사: {user?.user_name}</Typography>
          <ProfileButton position="teacher" />
        </Box>
      </Box>
    </Box>
  );
}
