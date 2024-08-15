import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { Login, NotFound, SignUp } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<FirstPage />} />
          {/* notFound : 일치하는 라우트 없는 경우 처리 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function FirstPage() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ padding: '50px', marginBottom: '200px' }}>
        <Typography variant="h4" align="center">
          Academy Pro
        </Typography>
      </Box>
      <Box sx={{ margin: '10px' }}>
        <Button variant="contained" size="large" sx={{ minWidth: '250px' }}>
          로그인
        </Button>
      </Box>
      <Box sx={{ margin: '10px' }}>
        <Button variant="contained" size="large" sx={{ minWidth: '250px' }}>
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

export default App;
