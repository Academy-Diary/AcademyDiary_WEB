import React, { useEffect, useState } from 'react';

import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, OutlinedInput, Checkbox } from '@mui/material';
import { Search } from '@mui/icons-material';

import { SimpleDialog, TitleMedium } from '../../../components';
import { useTeacherList } from '../../../api/queries/members/useTeacherList';
import { useDeleteTeacher } from '../../../api/queries/members/useDeleteTeacher';
import { useUserAuthStore } from '../../../store';

// Teacher List
//
// [
//   {
//     user_id: 'test_id',
//     user_name: 'test_name',
//     email: 'string',
//     phone_number: 'string',
//     lectures: [
//       {
//         lecture_id: 0,
//         lecture_name: 'string',
//       },
//     ],
//   },
// ];

export default function ManageTeachers() {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [checkedTeachers, setCheckedTeachers] = useState([]);

  const { user } = useUserAuthStore();
  const { data: teachers, refetch } = useTeacherList(user.academy_id);
  const deleteTeacherMutation = useDeleteTeacher();

  useEffect(() => {
    if (teachers && teachers.length === checkedTeachers.length) setAllChecked(true);
    else setAllChecked(false);
  }, [teachers, checkedTeachers]);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInputSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleCheckAll = () => {
    setCheckedTeachers(allChecked ? [] : teachers);
    setAllChecked(!allChecked);
  };
  const handleCheckTeacher = (teacher) => {
    const currentIdx = checkedTeachers.indexOf(teacher);
    const newChecked = [...checkedTeachers];

    if (currentIdx === -1) newChecked.push(teacher);
    else newChecked.splice(currentIdx, 1);

    setCheckedTeachers(newChecked);
  };

  const handleClickDelete = () => {
    if (checkedTeachers && checkedTeachers.length > 0) handleOpenDialog();
    else alert('삭제할 강사를 선택해주세요!');
  };
  const handleDelete = () => {
    const userIds = checkedTeachers.map((teacher) => teacher.user_id);
    deleteTeacherMutation.mutate(userIds, {
      onSuccess: () => {
        handleCloseDialog();
        setCheckedTeachers([]);
        refetch();
      },
    });
  };

  return (
    <>
      <TitleMedium title="강사 관리" />
      <Typography mb={2}>강사 인원: {teachers?.length}</Typography>
      <OutlinedInput endAdornment={<Search />} placeholder="강사명 또는 과목" onChange={handleInputSearch} sx={{ mb: 2 }} />
      <TableContainer component={Paper} sx={{ maxHeight: '60vh', width: '80vw' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={allChecked} onClick={handleCheckAll} />
              </TableCell>
              <TableCell>강사 이름</TableCell>
              <TableCell>담당 과목</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>이메일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers
              ? teachers.map((teacher) => {
                  const lecturesName = teacher.lectures.map((lec) => lec.lecture_name).join('');

                  return teacher.user_name.includes(searchInput) || lecturesName.includes(searchInput) ? (
                    <TableRow key={teacher.user_id}>
                      <TableCell>
                        <Checkbox checked={checkedTeachers.indexOf(teacher) !== -1} onClick={() => handleCheckTeacher(teacher)} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {teacher.user_name}
                      </TableCell>
                      <TableCell>
                        {teacher.lectures.map((lecture, idx) => {
                          if (idx < teacher.lectures.length - 1) return `${lecture.lecture_name}, `;
                          return lecture.lecture_name;
                        })}
                      </TableCell>
                      <TableCell>{teacher.phone_number}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                    </TableRow>
                  ) : null;
                })
              : []}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleClickDelete} size="large" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        강사 삭제
      </Button>
      <SimpleDialog
        openDialog={open}
        handleClose={handleCloseDialog}
        text={`${checkedTeachers[0]?.user_name} 외 ${checkedTeachers.length - 1}명의 강사를 삭제하겠습니까?`}
        second="삭제"
        handleClickSecond={handleDelete}
      />
    </>
  );
}
