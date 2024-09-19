import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';

export default function DirectorHeader() {
  const navigate = useNavigate();

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
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/director/manage-members/request-list');
              }}
            >
              등록 요청 목록
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/director/manage-members/teachers');
              }}
            >
              강사 관리
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/director/manage-members/students');
              }}
            >
              학생 관리
            </MenuItem>
          </Menu>
          <Button color="inherit" size="large" sx={{ mx: 4 }} onClick={() => navigate('/director/manage-courses')}>
            강의 관리
          </Button>
          <Button color="inherit" size="large" sx={{ mx: 4 }} onMouseOver={handleMouseOver2}>
            학원비
          </Button>
          <Menu anchorEl={anchorEl2} open={Boolean(anchorEl2)} onClose={handleClose2}>
            <MenuItem
              onClick={() => {
                handleClose2();
                navigate('/director/tuition-fees/payment-list');
              }}
            >
              학원비 납부 목록
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose2();
                navigate('/director/tuition-fees/claim');
              }}
            >
              학원비 청구
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose2();
                navigate('/director/tuition-fees/make-class');
              }}
            >
              학원비 구성
            </MenuItem>
          </Menu>
          <Button color="inherit" size="large" sx={{ mx: 4 }} onClick={() => navigate('/director/notice')}>
            전체 공지
          </Button>
        </Box>
        <IconButton onClick={() => navigate('/director/profile')}>
          <Avatar />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
