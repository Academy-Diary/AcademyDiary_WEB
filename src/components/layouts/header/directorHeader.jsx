import React from 'react';

import { AppBar, Toolbar } from '@mui/material';
import ProfileButton from '../../button/profileButton';
import LogoImageTitle from '../../logo/logoImageTitle';

export default function DirectorHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LogoImageTitle />
        <ProfileButton position="director" />
      </Toolbar>
    </AppBar>
  );
}
