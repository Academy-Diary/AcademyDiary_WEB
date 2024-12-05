import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CampaignRounded, CreditCardRounded, ExpandLess, ExpandMore, GroupsRounded, SchoolRounded } from '@mui/icons-material';

import Colors from '../../../styles/colors';

export default function DirectorSidebar() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null); // 선택된 메뉴 인덱스
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
          selected={selected === 0 && expand}
          onClick={() => {
            setSelected(0);
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
              onClick={() => {
                navigate('/director/manage-members/teachers');
              }}
            >
              <ListItemText primary="강사 관리" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate('/director/manage-members/students');
              }}
            >
              <ListItemText primary="학생 관리" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate('/director/manage-members/request-list');
              }}
            >
              <ListItemText primary="등록 요청 목록" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          selected={selected === 1}
          onClick={() => {
            setSelected(1);
            navigate('/director/manage-courses');
          }}
        >
          <ListItemIcon>
            <SchoolRounded />
          </ListItemIcon>
          <ListItemText primary="강의 관리" />
        </ListItemButton>
        <ListItemButton
          selected={selected === 2 && expand2}
          onClick={() => {
            setSelected(2);
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
              onClick={() => {
                navigate('/director/tuition-fees/payment-list');
              }}
            >
              <ListItemText primary="학원비 납부 목록" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate('/director/tuition-fees/claim');
              }}
            >
              <ListItemText primary="학원비 청구" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate('/director/tuition-fees/make-class');
              }}
            >
              <ListItemText primary="학원비 구성" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          selected={selected === 3}
          onClick={() => {
            setSelected(3);
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
