import React, { useState } from 'react';

import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Box } from '@mui/material';
import { TitleMedium } from '../../../components';
import { useStudentList } from '../../../api/queries/members/useStudentList';
import { useUserAuthStore } from '../../../store';
import { useDeleteStudent } from '../../../api/queries/members/useDeleteStudent';

// Students Data
//
// [
//   {
//     user_id:'string',
//     user_name: 'string',
//     phone_number: 'string',
//     familiesAsStudent: [
//       {
//         parent: {
//           user_name: 'string',
//           phone_number: 'string',
//         },
//       },
//     ],
//   },
// ];

export default function ManageStudents() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ name: '', parentName: '', phone: '', parentPhone: '' });

  const { user } = useUserAuthStore();
  const { data: students } = useStudentList(user.academy_id, 1);
  const deleteStudentMutation = useDeleteStudent();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClickDelete = (selectedStudent) => {
    setOpen(true);
    setSelected(selectedStudent);
  };
  const handleDelete = () => {
    deleteStudentMutation.mutate(selected.user_id, {
      onSuccess: handleCloseDialog,
    });
  };

  return (
    <>
      <TitleMedium title="학생 관리" />
      <Typography mb={2}>학생 인원: {students?.length}</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '65vh', width: '80vw' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
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
            {students?.map((student) => {
              const parent = student.familiesAsStudent[0]?.parent;

              return (
                <TableRow key={student.user_id}>
                  <TableCell component="th" scope="row">
                    {student.user_name}
                  </TableCell>
                  <TableCell>{parent?.user_name}</TableCell>
                  <TableCell>{student.phone_number}</TableCell>
                  <TableCell>{parent?.phone_number}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleClickDelete(student)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selected.user_name} 학생을 학생 목록에서 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
            <DialogContentText>학생 이름: {selected.user_name}</DialogContentText>
            <DialogContentText>학부모 이름: {selected.familiesAsStudent && selected.familiesAsStudent[0]?.parent.user_name}</DialogContentText>
            <DialogContentText>학생 연락처: {selected.phone_number}</DialogContentText>
            <DialogContentText>학부모 연락처: {selected.familiesAsStudent && selected.familiesAsStudent[0]?.parent.phone_number}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
