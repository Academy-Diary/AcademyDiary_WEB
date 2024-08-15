import React from 'react';
import { Box, Button, Typography, Container, Link } from '@mui/material';

function SignUp() {
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
        <Typography variant="h4" align="center" mb={5}>
          Academy Pro
        </Typography>
        <Box mb={30}>
          <Typography variant="h5">회원가입</Typography>
        </Box>
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth>
          학원 대표
        </Button>
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth>
          학원 강사
        </Button>
        <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth>
          학생/학부모
        </Button>
        <Link href="/login" variant="body2" sx={{ mt: 1 }}>
          이미 계정이 있으신가요? 로그인
        </Link>
      </Box>
    </Container>
  );
}

export default SignUp;
