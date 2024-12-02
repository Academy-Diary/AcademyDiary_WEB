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
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
