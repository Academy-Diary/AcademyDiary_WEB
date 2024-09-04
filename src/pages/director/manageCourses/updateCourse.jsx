import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Button, TextField, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, IconButton, Dialog, DialogActions } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Director from '../../../components/layouts/director';
import { TransferList } from '../../../components';

function createData(name, phone, email) {
  return { name, phone, email };
}

const students = [
  createData('신짱구', '010-1234-5678', 'jjanggu33@naver.com'),
  createData('신짱아', '010-0000-0000', 'jjanga0@naver.com'),
  createData('김철수', '010-1004-1004', 'smartguy@gmail.com'),
  createData('이훈이', '010-1111-1111', 'hoonhoonguy@daum.net'),
];
const allStudents = ['신짱구', '신짱아', '이훈이', '김철수'];

export default function UpdateCourse() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleCancle = () => {
    navigate('/director/manage-courses/course-details');
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/director/manage-courses/');
  };

  return (
    <Director>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        강의 수정
      </Typography>
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" defaultValue="화법과 작문" sx={{ mt: 2, color: 'black' }} required />
          </Grid>
          <Grid item xs={12}>
            <Typography>강사명</Typography>
            <TextField label="강사명" defaultValue="나미리" sx={{ mt: 2 }} required />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1}>
                <Typography sx={{ py: 1 }}>수강생 목록</Typography>
              </Grid>
              <Grid item xs={11}>
                <IconButton onClick={handleOpenDialog}>
                  <OpenInNewIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Typography variant="body2">총 {students.length}명</Typography>
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
            <Button size="large" variant="outlined" sx={{ width: 100, mr: 2 }} onClick={handleCancle}>
              취소
            </Button>
            <Button type="submit" size="large" variant="contained" sx={{ width: 120 }}>
              수정 완료
            </Button>
          </Box>
        </Grid>
        <Dialog open={open} onClose={handleCloseDialog}>
          <Grid container spacing={5} sx={{ py: 3, px: 5 }}>
            <Grid item xs={12}>
              <Typography variant="h6">수강생 목록 수정</Typography>
            </Grid>
            <Grid item xs={12}>
              <TransferList leftList={allStudents} rightList={[]} leftTitle="전체 학생 목록" rightTitle="수강생 목록" />
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button variant="contained" onClick={handleCloseDialog}>
                  수정 완료
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </Box>
    </Director>
  );
}
