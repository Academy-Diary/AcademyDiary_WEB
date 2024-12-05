import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CampaignRounded, CreditCardRounded, ExpandLess, ExpandMore, GroupsRounded, SchoolRounded } from '@mui/icons-material';

import Colors from '../../../styles/colors';

export default function DirectorSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);

  const handleClickExpand = () => {
    setExpand(!expand);
  };
  const handleClickExpand2 = () => {
    setExpand2(!expand2);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '15%',
        height: 'calc(100vh - 80px)',
        paddingTop: 5,
        backgroundColor: Colors.DarkBeige,
        borderTopRightRadius: 30,
      }}
    >
      <List component="nav">
        <ListItemButton
          selected={pathname.startsWith('/director/manage-members') && !expand}
          onClick={() => {
            handleClickExpand();
          }}
        >
          <ListItemIcon>
            <GroupsRounded />
          </ListItemIcon>
          <ListItemText primary="구성원 관리" />
          {expand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expand} timeout="auto">
          <List>
            <ListItemButton
              selected={pathname === '/director/manage-members/teachers'}
              onClick={() => {
                navigate('/director/manage-members/teachers');
              }}
            >
              <ListItemText primary="강사 관리" />
            </ListItemButton>
            <ListItemButton
              selected={pathname === '/director/manage-members/students'}
              onClick={() => {
                navigate('/director/manage-members/students');
              }}
            >
              <ListItemText primary="학생 관리" />
            </ListItemButton>
            <ListItemButton
              selected={pathname === '/director/manage-members/request-list'}
              onClick={() => {
                navigate('/director/manage-members/request-list');
              }}
            >
              <ListItemText primary="등록 요청 목록" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          selected={pathname.startsWith('/director/manage-courses')}
          onClick={() => {
            navigate('/director/manage-courses');
          }}
        >
          <ListItemIcon>
            <SchoolRounded />
          </ListItemIcon>
          <ListItemText primary="강의 관리" />
        </ListItemButton>
        <ListItemButton
          selected={pathname.startsWith('/director/tuition-fees') && !expand2}
          onClick={() => {
            handleClickExpand2();
          }}
        >
          <ListItemIcon>
            <CreditCardRounded />
          </ListItemIcon>
          <ListItemText primary="학원비" />
          {expand2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expand2} timeout="auto">
          <List>
            <ListItemButton
              selected={pathname === '/director/tuition-fees/payment-list'}
              onClick={() => {
                navigate('/director/tuition-fees/payment-list');
              }}
            >
              <ListItemText primary="학원비 납부 목록" />
            </ListItemButton>
            <ListItemButton
              selected={pathname === '/director/tuition-fees/claim'}
              onClick={() => {
                navigate('/director/tuition-fees/claim');
              }}
            >
              <ListItemText primary="학원비 청구" />
            </ListItemButton>
            <ListItemButton
              selected={pathname === '/director/tuition-fees/make-class'}
              onClick={() => {
                navigate('/director/tuition-fees/make-class');
              }}
            >
              <ListItemText primary="학원비 구성" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          selected={pathname.startsWith('/director/notice')}
          onClick={() => {
            navigate('/director/notice');
          }}
        >
          <ListItemIcon>
            <CampaignRounded />
          </ListItemIcon>
          <ListItemText primary="전체공지" />
        </ListItemButton>
      </List>
    </Box>
  );
}
