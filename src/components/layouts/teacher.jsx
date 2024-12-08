import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import TeacherHeader from './header/teacherHeader';
import TeacherSideBar from './sidebar/teacherSidebar';

/**
 *@description 강사화면 헤더, 사이드바 있는 레이아웃

 @example 
 <Teacher>
   Contents
 </Teacher>
 */

export default function Teacher() {
  return (
    <Box>
      <TeacherHeader />
      <Grid container height="100%">
        <Grid item xs={1.5} height="100%">
          <TeacherSideBar />
        </Grid>
        <Grid item xs={10.5} sx={{ px: 5, py: 5, backgroundColor: 'white', borderTopLeftRadius: 30 }}>
          <Grid container sx={{ width: 'inherit', position: 'absolute', top: 160, right: 200 }} spacing={10}>
            <Box
              sx={{
                width: '35px', // 리본 너비
                height: '44px', // 리본 전체 높이
                backgroundColor: '#ffd317', // 리본 색상
                marginRight: 2,
                transform: 'translate(50%)',
                borderRadius: '5px 5px 0 0', // 상단 둥근 모서리
                clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 80%)', // 가운데 삼각형을 파낸 모양
              }}
            />
            <Box
              sx={{
                width: '35px', // 리본 너비
                height: '44px', // 리본 전체 높이
                backgroundColor: '#015c33', // 리본 색상
                marginRight: 2,
                transform: 'translate(50%)',
                borderRadius: '5px 5px 0 0', // 상단 둥근 모서리
                clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 80%)', // 가운데 삼각형을 파낸 모양
              }}
            />
            <Box
              sx={{
                width: '35px', // 리본 너비
                height: '44px', // 리본 전체 높이
                backgroundColor: '#a61010', // 리본 색상
                marginRight: 2,
                transform: 'translate(50%)',
                borderRadius: '5px 5px 0 0', // 상단 둥근 모서리
                clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 80%)', // 가운데 삼각형을 파낸 모양
              }}
            />
          </Grid>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
