import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import clip from '../../../img/Binder clip.png';
import lectureIcon from '../../../img/lecture_icon.png';
import consultationIcon from '../../../img/consultation_icon.png';
import noticeIcon from '../../../img/notice_icon.png';

export default function TeacherSidebar() {
  const navigate = useNavigate();
  const items = [
    { name: 'My 강의 목록', link: '/teacher/class', bgcolor: 'rgb(255, 211, 23, 0.6)', icon: lectureIcon },
    { name: '학생 상담', link: '/teacher/counseling', bgcolor: 'rgb(6, 68, 32, 0.6)', icon: consultationIcon },
    { name: '학원 공지', link: '/teacher/notice', bgcolor: 'rgb(2, 79, 81, 0.6)', icon: noticeIcon },
  ];
  const [isClicked, setClicked] = useState();
  return (
    <Box sx={{ backgroundColor: '#DFD3C3', height: '89vh', borderTopRightRadius: 30 }}>
      <Box sx={{ position: 'absolute', top: '70px', left: '10px' }}>
        <img width="48px" src={clip} alt="" />
      </Box>
      <List sx={{ pt: 10 }}>
        {items.map((item) => (
          <ListItemButton
            key={item.name}
            onClick={() => {
              navigate(item.link);
            }}
            sx={{ backgroundColor: `${item.bgcolor}`, mb: 2 }}
          >
            <img width="32px" alt="" src={item.icon} />
            <ListItemText sx={{ ml: 2 }}>{item.name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
