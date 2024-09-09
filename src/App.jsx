import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { Director, Teacher } from './components';
import {
  Login,
  SignUp,
  Register,
  NotFound,
  DirectorHome,
  TeacherHome,
  RequestList,
  ManageTeachers,
  ManageStudents,
  ManageCourses,
  AddCourse,
  CourseDetails,
  UpdateCourse,
  DirectorNotice,
  AddNotice,
  UpdateNotice,
} from './pages';
import { PATH } from './route/path';
import { useUserAuthStore } from './store';

function App() {
  const { isLoggedIn } = useUserAuthStore();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={PATH.root} element={isLoggedIn ? <Register name="홍길동" position="teacher" /> : <FirstPage />} />
          <Route path={PATH.SIGNUP} element={<SignUp />} />
          <Route path={PATH.LOGIN} element={<Login />} />

          <Route path={PATH.TEACHER.ROOT} element={<Teacher />}>
            <Route path="" element={<TeacherHome />} />
            <Route path="*" element={<NotFound path={PATH.TEACHER.ROOT} />} />
          </Route>

          <Route path={PATH.DIRECTOR.ROOT} element={<Director />}>
            <Route path="" element={<DirectorHome />} />
            <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.ROOT} element={<Outlet />}>
              <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.REQUESTLIST} element={<RequestList />} />
              <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.TEACHERS} element={<ManageTeachers />} />
              <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.STUDENTS} element={<ManageStudents />} />
            </Route>
            <Route path={PATH.DIRECTOR.MANAGE_COURSES.ROOT} element={<Outlet />}>
              <Route path="" element={<ManageCourses />} />
              <Route path={PATH.DIRECTOR.MANAGE_COURSES.ADDCOURSE} element={<AddCourse />} />
              <Route path={PATH.DIRECTOR.MANAGE_COURSES.COURSEDETAILS} element={<CourseDetails />} />
              <Route path={PATH.DIRECTOR.MANAGE_COURSES.UPDATE} element={<UpdateCourse />} />
            </Route>
            <Route path={PATH.DIRECTOR.NOTICE.ROOT} element={<Outlet />}>
              <Route path="" element={<DirectorNotice />} />
              <Route path={PATH.DIRECTOR.NOTICE.ADD} element={<AddNotice />} />
              <Route path={PATH.DIRECTOR.NOTICE.UPDATE} element={<UpdateNotice />} />
            </Route>
            <Route path="*" element={<NotFound path={PATH.DIRECTOR.ROOT} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function FirstPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" align="center" sx={{ mt: 5, mb: 30 }}>
          Academy Pro
        </Typography>
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/login">
          로그인
        </Button>
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/signup">
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

export default App;
