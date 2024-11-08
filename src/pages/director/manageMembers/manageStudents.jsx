import React, { useState } from 'react';

import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Box,
  OutlinedInput,
  Checkbox,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { SimpleDialog, TitleMedium } from '../../../components';
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
  const [searchInput, setSearchInput] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [checkedStudents, setCheckedStudents] = useState([]);

  const { user } = useUserAuthStore();
  const { data: students } = useStudentList(user.academy_id);
  const deleteStudentMutation = useDeleteStudent();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInputSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleCheckAll = () => {
    setCheckedStudents(allChecked ? [] : students);
    setAllChecked(!allChecked);
  };
  const handleCheckTeacher = (student) => {
    const currentIdx = checkedStudents.indexOf(student);
    const newChecked = [...checkedStudents];

    if (currentIdx === -1) newChecked.push(student);
    else newChecked.splice(currentIdx, 1);

    setCheckedStudents(newChecked);
  };

  const handleClickDelete = () => {
    if (checkedStudents && checkedStudents.length > 0) setOpen(true);
  };
  const handleDelete = () => {
    // deleteStudentMutation.mutate(selected.user_id, {
    //   onSuccess: handleCloseDialog,
    // });
  };

  return (
    <>
      <TitleMedium title="학생 관리" />
      <Typography mb={2}>학생 인원: {students?.length}</Typography>
      <OutlinedInput placeholder="학생 또는 학부모 이름" endAdornment={<Search />} onChange={handleInputSearch} sx={{ mb: 2 }} />
      <TableContainer component={Paper} sx={{ maxHeight: '65vh', width: '80vw' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox onClick={handleCheckAll} />
              </TableCell>
              <TableCell>학생 이름</TableCell>
              <TableCell>학부모 이름</TableCell>
              <TableCell>학생 연락처</TableCell>
              <TableCell>학부모 연락처</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => {
              const parent = student.familiesAsStudent ? student.familiesAsStudent[0]?.parent : null;

              return student.user_name.includes(searchInput) || parent?.user_name.includes(searchInput) ? (
                <TableRow key={student.user_id}>
                  <TableCell>
                    <Checkbox checked={checkedStudents.indexOf(student) !== -1} onClick={() => handleCheckTeacher(student)} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.user_name}
                  </TableCell>
                  <TableCell>{parent?.user_name}</TableCell>
                  <TableCell>{student.phone_number}</TableCell>
                  <TableCell>{parent?.phone_number}</TableCell>
                </TableRow>
              ) : null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleClickDelete} size="large" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        학생 삭제
      </Button>
      <SimpleDialog
        openDialog={open}
        handleClose={handleCloseDialog}
        text={`${checkedStudents[0]?.user_name} 외 ${checkedStudents.length - 1}명의 학생을 삭제하겠습니까?`}
        second="삭제"
        handleClickSecond={handleDelete}
      />
    </>
  );
}
