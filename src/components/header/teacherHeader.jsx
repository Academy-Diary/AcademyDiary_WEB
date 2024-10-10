import React, { useState } from 'react';
import { Avatar, Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { AccountBoxRounded, LogoutRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserAuthStore } from '../../store';

export default function TeacherHeader() {
  const { user } = useUserAuthStore();
  const navigate = useNavigate();

  const [isMouseOver, setMouseOver] = useState(null);

  const handleClick = (e) => {
    setMouseOver(e.currentTarget);
  };
  const handleClose = () => {
    setMouseOver(null);
  };

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
          <Avatar onClick={handleClick} />
          <Menu anchorEl={isMouseOver} open={Boolean(isMouseOver)} onClose={handleClose}>
            <Box sx={{ paddingX : 2}}>
              <Typography variant='subtitle1'>{user?.user_name}<br/></Typography>
              <Typography variant='subtitle2' sx={{color: 'grey'}}>{user?.email}</Typography>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/teacher/profile');
              }}
            >
              <ListItemIcon>
                <AccountBoxRounded fontSize="small" />
              </ListItemIcon>
              <ListItemText>profile</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                console.log('Log out');
              }}
            >
              <ListItemIcon>
                <LogoutRounded fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
