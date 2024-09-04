import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Button, TextField, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';

import Director from '../../../components/layouts/director';

function createData(name, phone, email) {
  return { name, phone, email };
}

const students = [
  createData('신짱구', '010-1234-5678', 'jjanggu33@naver.com'),
  createData('신짱아', '010-0000-0000', 'jjanga0@naver.com'),
  createData('김철수', '010-1004-1004', 'smartguy@gmail.com'),
  createData('이훈이', '010-1111-1111', 'hoonhoonguy@daum.net'),
];

export default function CourseDetails() {
  const navigate = useNavigate();

  const handleCancle = () => {
    navigate('/director/manage-courses/');
  };
  return (
    <Director>
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
            <Typography variant="body2">총 {students.length}명</Typography>
            <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '40vh' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>전화번호</TableCell>
                    <TableCell>이메일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.name}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.email}</TableCell>
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
            <Button type="submit" size="large" variant="contained" sx={{ width: 120 }}>
              수정하기
            </Button>
          </Box>
        </Grid>
      </Box>
    </Director>
  );
}
