import { Box, Button, Typography, Container } from '@mui/material';

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
      </Box>
    </Container>
  );
}

export default SignUp;
