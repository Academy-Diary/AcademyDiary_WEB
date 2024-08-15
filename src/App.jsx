import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { Login, SignUp } from './pages';

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
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth>
          로그인
        </Button>
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth>
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

export default App;
