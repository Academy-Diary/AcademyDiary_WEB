import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TeacherSidebar() {
  const navigate = useNavigate();
  const items = [
    { name: 'My 강의 목록', link: '/teacher/#' },
    { name: '학생 상담', link: '/teacher/#' },
    { name: '전체 공지', link: '/teacher/#' },
  ];
  return (
    <Box sx={{ backgroundColor: 'lightgrey', height: '100%' }}>
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.name}
            onClick={() => {
              navigate(item.link);
            }}
          >
            <ListItemText>{item.name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
