import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CampaignRounded, CreditCardRounded, ExpandLess, ExpandMore, GroupsRounded, SchoolRounded } from '@mui/icons-material';

import Colors from '../../../styles/colors';

const StyledListItemButton = styled(ListItemButton)({
  '&': {
    height: 70,
  },
  '&:hover': {
    backgroundColor: Colors.Brown10,
  },
  '&.Mui-selected': {
    backgroundColor: Colors.Brown20,
    '&:hover': {
      backgroundColor: Colors.Brown30,
    },
  },
});

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
        <StyledListItemButton
          selected={pathname.startsWith('/director/manage-members') && !expand}
          onClick={() => {
            setExpand(!expand);
            setExpand2(false);
          }}
          divider
        >
          <ListItemIcon>
            <GroupsRounded />
          </ListItemIcon>
          <ListItemText primary="구성원 관리" />
          {expand ? <ExpandLess /> : <ExpandMore />}
        </StyledListItemButton>
        <Collapse in={expand} timeout="auto">
          <List>
            <StyledListItemButton
              selected={pathname === '/director/manage-members/teachers'}
              onClick={() => {
                navigate('/director/manage-members/teachers');
              }}
              divider
            >
              <ListItemText primary="강사 관리" />
            </StyledListItemButton>
            <StyledListItemButton
              selected={pathname === '/director/manage-members/students'}
              onClick={() => {
                navigate('/director/manage-members/students');
              }}
              divider
            >
              <ListItemText primary="학생 관리" />
            </StyledListItemButton>
            <StyledListItemButton
              selected={pathname === '/director/manage-members/request-list'}
              onClick={() => {
                navigate('/director/manage-members/request-list');
              }}
              divider
            >
              <ListItemText primary="등록 요청 목록" />
            </StyledListItemButton>
          </List>
        </Collapse>
        <StyledListItemButton
          selected={pathname.startsWith('/director/manage-courses')}
          onClick={() => {
            setExpand(false);
            setExpand2(false);

            navigate('/director/manage-courses');
          }}
          divider
        >
          <ListItemIcon>
            <SchoolRounded />
          </ListItemIcon>
          <ListItemText primary="강의 관리" />
        </StyledListItemButton>
        <StyledListItemButton
          selected={pathname.startsWith('/director/tuition-fees') && !expand2}
          onClick={() => {
            setExpand2(!expand2);
            setExpand(false);
          }}
          divider
        >
          <ListItemIcon>
            <CreditCardRounded />
          </ListItemIcon>
          <ListItemText primary="학원비" />
          {expand2 ? <ExpandLess /> : <ExpandMore />}
        </StyledListItemButton>
        <Collapse in={expand2} timeout="auto">
          <List>
            <StyledListItemButton
              selected={pathname === '/director/tuition-fees/payment-list'}
              onClick={() => {
                navigate('/director/tuition-fees/payment-list');
              }}
              divider
            >
              <ListItemText primary="학원비 납부 목록" />
            </StyledListItemButton>
            <StyledListItemButton
              selected={pathname === '/director/tuition-fees/claim'}
              onClick={() => {
                navigate('/director/tuition-fees/claim');
              }}
              divider
            >
              <ListItemText primary="학원비 청구" />
            </StyledListItemButton>
            <StyledListItemButton
              selected={pathname === '/director/tuition-fees/make-class'}
              onClick={() => {
                navigate('/director/tuition-fees/make-class');
              }}
              divider
            >
              <ListItemText primary="학원비 구성" />
            </StyledListItemButton>
          </List>
        </Collapse>
        <StyledListItemButton
          selected={pathname.startsWith('/director/notice')}
          onClick={() => {
            setExpand(false);
            setExpand2(false);

            navigate('/director/notice');
          }}
          divider
        >
          <ListItemIcon>
            <CampaignRounded />
          </ListItemIcon>
          <ListItemText primary="전체공지" />
        </StyledListItemButton>
      </List>
    </Box>
  );
}
