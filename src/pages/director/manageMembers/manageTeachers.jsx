import React, { useState } from 'react';

import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogContent, DialogActions, DialogContentText, Box, DialogTitle } from '@mui/material';
import { TitleMedium } from '../../../components';
import useTeacherList from '../../../api/queries/members/useTeacherList';

// Teacher List
//
// {
//   academy_id: 'test_academy',
//   role: 'TEACHER',
//   status: 'APPROVED',
//   user: {
//     email: 'string',
//     phone_number: 'string',
//     lectures: [
//       {
//         lecture_id: 0,
//         lecture_name: 'string',
//       },
//     ],
//   },
//   user_id: 'test_teacher_2',
// };

export default function ManageTeachers() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ user_name: '', lectures: [], phone_number: '', email: '' });

  const { data: teachers } = useTeacherList('test_academy');

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickDelete = (selectedTeacher) => {
    setOpen(true);
    setSelected(selectedTeacher);
  };

  return (
    <>
      <TitleMedium title="강사 관리" />
      <Typography mb={2}>강사 인원: {teachers?.length}</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '65vh', width: '80vw' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
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
            {teachers?.map((teacher) => {
              const teacherInfo = teacher.user;

              return (
                <TableRow key={teacher.user_id}>
                  <TableCell component="th" scope="row">
                    {teacherInfo.user_name}
                  </TableCell>
                  <TableCell>
                    {teacherInfo.lectures.map((lecture, idx) => {
                      if (idx < teacherInfo.lectures.length - 1) return `${lecture.lecture_name}, `;
                      return lecture.lecture_name;
                    })}
                  </TableCell>
                  <TableCell>{teacherInfo.phone_number}</TableCell>
                  <TableCell>{teacherInfo.email}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleClickDelete(teacherInfo)}>
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
        <DialogTitle>{selected.user_name} 강사님을 강사 목록에서 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
            <DialogContentText>강사 이름: {selected.user_name}</DialogContentText>
            <DialogContentText>
              담당 과목:{' '}
              {selected.lectures.map((lecture, idx) => {
                if (idx < selected.lectures.length - 1) return `${lecture.lecture_name}, `;
                return lecture.lecture_name;
              })}
            </DialogContentText>
            <DialogContentText>연락처: {selected.phone_number}</DialogContentText>
            <DialogContentText>이메일: {selected.email}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleCloseDialog}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
