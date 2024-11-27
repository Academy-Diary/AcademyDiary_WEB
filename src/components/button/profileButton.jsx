import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, Avatar, Menu, MenuItem, Box, Typography, Divider, ListItemIcon } from '@mui/material';
import { AccountBoxRounded, LogoutRounded } from '@mui/icons-material';

import useLogout from '../../api/queries/user/useLogout';
import { useUserAuthStore } from '../../store';
import { useProfileImage } from '../../api/queries/user/useProfile';

/**
 * 마우스 오버 시 프로필 보기, 로그아웃 메뉴가 펼쳐지는 프로필 버튼
 */
export default function ProfileButton({ position }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useUserAuthStore();
  const logoutMutation = useLogout();

  const { data: imageUrl } = useProfileImage(user.user_id);

  const handleMouseOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutMutation.mutate();
  };

  return (
    <>
      <IconButton onMouseOver={handleMouseOver}>
        <Avatar src={imageUrl} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={{ paddingX: 2 }}>
          <Typography variant="subtitle1">
            {user?.user_name}
            <br />
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'grey' }}>
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/${position}/profile`);
          }}
        >
          <AccountBoxRounded fontSize="small" />
          프로필 보기
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutRounded fontSize="small" />
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
}
