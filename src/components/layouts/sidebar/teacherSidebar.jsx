import React, { useEffect, useRef, useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CampaignRounded, QuestionAnswerRounded, SchoolRounded } from '@mui/icons-material';

export default function TeacherSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const items = [
    { name: 'My 강의 목록', link: '/teacher/class', bgcolor: 'rgb(255, 211, 23, 0.6)', icon: <SchoolRounded /> },
    { name: '학생 상담', link: '/teacher/counseling', bgcolor: 'rgb(6, 68, 32, 0.6)', icon: <QuestionAnswerRounded /> },
    { name: '학원 공지', link: '/teacher/notice', bgcolor: 'rgb(2, 79, 81, 0.6)', icon: <CampaignRounded /> },
  ];
  const originRef = useRef();
  const origin = originRef.current;
  const [isClicked, setClicked] = useState({ 'My 강의 목록': false, '학생 상담': false, '학원 공지': false });

  const handleMenu = (name) => {
    setClicked({ ...origin, [`${name}`]: true });
  };

  useEffect(() => {
    if (pathname === '/teacher' || pathname === '/teacher/profile') {
      originRef.current = { 'My 강의 목록': false, '학생 상담': false, '학원 공지': false };
      setClicked({ 'My 강의 목록': false, '학생 상담': false, '학원 공지': false });
    } else if (pathname.includes('/teacher/class')) {
      originRef.current = { 'My 강의 목록': true, '학생 상담': false, '학원 공지': false };
      setClicked({ 'My 강의 목록': true, '학생 상담': false, '학원 공지': false });
    } else if (pathname.includes('/teacher/counseling')) {
      originRef.current = { 'My 강의 목록': false, '학생 상담': true, '학원 공지': false };
      setClicked({ 'My 강의 목록': false, '학생 상담': true, '학원 공지': false });
    } else if (pathname.includes('/teacher/notice')) {
      originRef.current = { 'My 강의 목록': false, '학생 상담': false, '학원 공지': true };
      setClicked({ 'My 강의 목록': false, '학생 상담': false, '학원 공지': true });
    }
  }, [pathname]);
  return (
    <Box
      sx={{ backgroundColor: '#DFD3C3', height: '89vh', borderTopRightRadius: 30 }}
      onMouseLeave={() => {
        setClicked({ ...origin });
        console.log(origin);
      }}
    >
      <List sx={{ pt: 10 }}>
        {items.map((item) =>
          isClicked[`${item.name}`] ? (
            <ListItemButton
              key={item.name}
              onClick={() => {
                handleMenu(item.name);
                navigate(item.link);
              }}
              onMouseOver={() => handleMenu(item.name)}
              sx={{ mb: 2, padding: 2, bgcolor: 'rgb(202, 185, 170)' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={{ ml: 2 }}>{item.name}</ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton
              key={item.name}
              onClick={() => {
                handleMenu(item.name);
                navigate(item.link);
              }}
              onMouseOver={() => handleMenu(item.name)}
              sx={{ mb: 2, padding: 2 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={{ ml: 2 }}>{item.name}</ListItemText>
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
}
