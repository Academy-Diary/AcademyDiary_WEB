import { Typography, Button } from '@mui/material';

export default function FirstPage() {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 30 }}>
        Academy Pro
      </Typography>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/login">
        로그인
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/signup">
        회원가입
      </Button>
    </>
  );
}
