import React from 'react';

import { Box, Typography, AppBar, Toolbar, Button, IconButton, Avatar } from '@mui/material';

export default function Director() {
  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" mx={2}>
            AcademyPro
          </Typography>
          <Box sx={{ flexGrow: 1, ml: 5 }}>
            <Button color="inherit" size="large" sx={{ mx: 2 }}>
              구성원 관리
            </Button>
            <Button color="inherit" size="large" sx={{ mx: 2 }}>
              강의 관리
            </Button>
            <Button color="inherit" size="large" sx={{ mx: 2 }}>
              학원비
            </Button>
            <Button color="inherit" size="large" sx={{ mx: 2 }}>
              전체 공지
            </Button>
          </Box>
          <IconButton>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
