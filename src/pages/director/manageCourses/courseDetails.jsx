import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Button, TextField, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';

function createData(name, phone, email) {
  return { name, phone, email };
}
const attendees = [createData('신짱구', '010-1234-5678', 'jjanggu33@naver.com')];

export default function CourseDetails() {
  const navigate = useNavigate();

  const handleCancle = () => {
    navigate('/director/manage-courses/');
  };
  const handleClickUpdate = () => {
    navigate('/director/manage-courses/update');
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        강의 상세
      </Typography>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" defaultValue="화법과 작문" sx={{ mt: 2, color: 'black' }} disabled />
          </Grid>
          <Grid item xs={12}>
            <Typography>강사명</Typography>
            <TextField label="강사명" defaultValue="나미리" sx={{ mt: 2 }} disabled />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ py: 1 }}>수강생 목록</Typography>
            <Typography variant="body2">총 {attendees.length}명</Typography>
            <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '40vh', width: '50vw' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>전화번호</TableCell>
                    <TableCell>이메일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendees.map((att) => (
                    <TableRow key={att.name}>
                      <TableCell>{att.name}</TableCell>
                      <TableCell>{att.phone}</TableCell>
                      <TableCell>{att.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
            <Button size="large" variant="outlined" sx={{ width: 120, mr: 2 }} onClick={handleCancle}>
              목록으로
            </Button>
            <Button size="large" variant="contained" sx={{ width: 120 }} onClick={handleClickUpdate}>
              수정하기
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
