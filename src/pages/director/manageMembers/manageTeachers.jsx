import React, { useState } from 'react';

import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogContent, DialogActions, DialogContentText, Box, DialogTitle } from '@mui/material';

import Director from '../../../components/layouts/director';

function createData(name, lectures, phone, email) {
  return { name, lectures, phone, email };
}

const teachers = [
  createData('미나리', ['화법과 작문', '비문학'], '010-1234-5678', 'minary@gmail.com'),
  createData('이하람', ['미적분 1'], '010-0000-0000', 'haram99@naver.com'),
  createData('권해담', ['물리 1'], '010-1004-1004', 'godeka@naver.com'),
  createData('김대성', ['확률과 통계'], '010-1111-1111', 'bigcastle@gmail.com'),
];

export default function ManageTeachers() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ name: '', lectures: [], phone: '', email: '' });

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickDelete = (selectedTeacher) => {
    setOpen(true);
    setSelected(selectedTeacher);
  };

  return (
    <Director>
      <Typography variant="h5" sx={{ mt: 2, mb: 5 }}>
        강사 관리
      </Typography>
      <Typography mb={2}>강사 인원: {teachers.length}</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '65vh' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>강사 이름</TableCell>
              <TableCell>담당 과목</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.name}>
                <TableCell component="th" scope="row">
                  {teacher.name}
                </TableCell>
                <TableCell>
                  {teacher.lectures.map((lecture, idx) => {
                    if (idx < teacher.lectures.length - 1) return `${lecture}, `;
                    return lecture;
                  })}
                </TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => handleClickDelete(teacher)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selected.name} 강사님을 강사 목록에서 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
            <DialogContentText>강사 이름: {selected.name}</DialogContentText>
            <DialogContentText>
              담당 과목:{' '}
              {selected.lectures.map((lecture, idx) => {
                if (idx < selected.lectures.length - 1) return `${lecture}, `;
                return lecture;
              })}{' '}
            </DialogContentText>
            <DialogContentText>연락처: {selected.phone}</DialogContentText>
            <DialogContentText>이메일: {selected.email}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>삭제</Button>
          <Button onClick={handleCloseDialog}>취소</Button>
        </DialogActions>
      </Dialog>
    </Director>
  );
}
