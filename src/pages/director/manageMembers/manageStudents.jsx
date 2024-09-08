import React, { useState } from 'react';

import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Box } from '@mui/material';

import Director from '../../../components/layouts/director';

function createData(name, parentName, phone, parentPhone) {
  return { name, parentName, phone, parentPhone };
}

const students = [
  createData('신짱구', '봉미선', '010-1234-5678', '010-8282-5959'),
  createData('신짱아', '봉미선', '010-0000-0000', '010-8282-5959'),
  createData('김철수', '김미영', '010-1004-1004', '010-9410-1494'),
  createData('이훈이', '토마토', '010-1111-1111', '010-3948-2839'),
];

export default function ManageStudents() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ name: '', parentName: '', phone: '', parentPhone: '' });

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickDelete = (selectedStudent) => {
    setOpen(true);
    setSelected(selectedStudent);
  };

  return (
    // <Director>
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 5 }}>
        학생 관리
      </Typography>
      <Typography mb={2}>학생 인원: {students.length}</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '65vh' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>학생 이름</TableCell>
              <TableCell>학부모 이름</TableCell>
              <TableCell>학생 연락처</TableCell>
              <TableCell>학부모 연락처</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.name}>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                <TableCell>{student.parentName}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.parentPhone}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => handleClickDelete(student)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selected.name} 학생을 학생 목록에서 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
            <DialogContentText>학생 이름: {selected.name}</DialogContentText>
            <DialogContentText>학부모 이름: {selected.parentName}</DialogContentText>
            <DialogContentText>학생 연락처: {selected.phone}</DialogContentText>
            <DialogContentText>학부모 연락처: {selected.parentPhone}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>삭제</Button>
          <Button onClick={handleCloseDialog}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
    // </Director>
  );
}
