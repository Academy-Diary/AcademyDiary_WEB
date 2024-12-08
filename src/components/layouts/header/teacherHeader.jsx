import React from 'react';
import { Box, Typography } from '@mui/material';
import { useUserAuthStore } from '../../../store';
import ProfileButton from '../../button/profileButton';
import LogoImageTitle from '../../logo/logoImageTitle';

export default function TeacherHeader() {
  const { user } = useUserAuthStore();

  return (
    <Box>
      <Box sx={{ height: '6rem', backgroundColor: '#EEEBDD', color: 'white', paddingX: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <LogoImageTitle role={user.role} />
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
