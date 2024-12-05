import React from 'react';

import { AppBar, Toolbar } from '@mui/material';
import ProfileButton from '../../button/profileButton';
import LogoImageTitle from '../../logo/logoImageTitle';
import { useUserAuthStore } from '../../../store';

export default function DirectorHeader() {
  const { user } = useUserAuthStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LogoImageTitle role={user.role} />
        <ProfileButton position="director" />
      </Toolbar>
    </AppBar>
  );
}
