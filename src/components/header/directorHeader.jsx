import React, { useState } from 'react';

import { Box, Typography, AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';

export default function DirectorHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleMouseOver = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMouseOver2 = (e) => {
    setAnchorEl2(e.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" mx={2}>
          AcademyPro
        </Typography>
        <Box sx={{ flexGrow: 1, ml: 5 }}>
          <Button color="inherit" size="large" sx={{ mx: 4 }} onMouseOver={handleMouseOver}>
            구성원 관리
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>등록 요청 목록</MenuItem>
            <MenuItem onClick={handleClose}>강사 목록</MenuItem>
            <MenuItem onClick={handleClose}>학생 목록</MenuItem>
          </Menu>
          <Button color="inherit" size="large" sx={{ mx: 4 }}>
            강의 관리
          </Button>
          <Button color="inherit" size="large" sx={{ mx: 4 }} onMouseOver={handleMouseOver2}>
            학원비
          </Button>
          <Menu anchorEl={anchorEl2} open={Boolean(anchorEl2)} onClose={handleClose2}>
            <MenuItem onClick={handleClose2}>학원비 납부 목록</MenuItem>
            <MenuItem onClick={handleClose2}>학원비 구성</MenuItem>
            <MenuItem onClick={handleClose2}>학원비 청구</MenuItem>
          </Menu>
          <Button color="inherit" size="large" sx={{ mx: 4 }}>
            전체 공지
          </Button>
        </Box>
        <IconButton>
          <Avatar />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
