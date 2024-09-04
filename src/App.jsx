import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { Login, SignUp, Register, NotFound, DirectorHome, TeacherHome, RequestList, ManageTeachers, ManageStudents } from './pages';
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
          <Route path="/teacher" element={<TeacherHome />} />
          {/* notFound : 일치하는 라우트 없는 경우 처리 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/director" element={<DirectorHome />} />
          <Route path="/director/manage-members/request-list" element={<RequestList />} />
          <Route path="/director/manage-members/teachers" element={<ManageTeachers />} />
          <Route path="/director/manage-members/students" element={<ManageStudents />} />
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
