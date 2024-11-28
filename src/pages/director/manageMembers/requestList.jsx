import React, { useEffect, useState } from 'react';

import { Typography, List, ListItem, ListItemText, Button, Grid, ListItemButton, ListItemIcon, Checkbox } from '@mui/material';
import { SimpleDialog, TitleMedium } from '../../../components';
import useRequestList from '../../../api/queries/members/useRequestList';
import { useUserAuthStore } from '../../../store';
import { useDecideRegisters } from '../../../api/queries/members/useDecideRegisters';

// Teacher Data
// {
//   "user_id" : string,
//   "user_name" : string,
//   "email" : string,
//   "phone_number" : string,
//   "lectures" : [
//     {
//       "lecture_id" : int,
//       "lecture_name": string
//     }
//   ]
// }

// Student Data
// {
//   "user_id": string,
//   "user_name": string,
//   "email": string,
//   "phone_number": string,
//   "parent": {
//       "user_id": string,
//       "user_name": string
//   }
// }

export default function RequestList() {
  const { user } = useUserAuthStore();

  const [selected, setSelected] = useState(null);

  const [checkedAllTeacher, setCheckedAllTeacher] = useState(false);
  const [checkedAllStudent, setCheckedAllStudent] = useState(false);
  const [checkedTeachers, setCheckedTeachers] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState([]);

  const [openApprove, setOpenApprove] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);

  const { data: teacherData, isSuccess: teacherIsSuccess, refetch: refetchTeacher } = useRequestList('TEACHER', user.academy_id);
  const { data: studentData, isSuccess: studentIsSuccess, refetch: refetchStudent } = useRequestList('STUDENT', user.academy_id);

  const approveRegisterMutation = useDecideRegisters(true);
  const declineRegisterMutation = useDecideRegisters(false);

  useEffect(() => {
    // 강사 전체선택 여부 체크
    if (teacherData && teacherData.length === checkedTeachers.length) setCheckedAllTeacher(true);
    else setCheckedAllTeacher(false);
  }, [teacherData, checkedTeachers]);

  useEffect(() => {
    // 학생 전체선택 여부 체크
    if (studentData && studentData.length === checkedStudents.length) setCheckedAllStudent(true);
    else setCheckedAllStudent(false);
  }, [studentData, checkedStudents]);

  const handleOpenApprove = () => {
    setOpenApprove(true);
  };
  const handleCloseApprove = () => {
    setOpenApprove(false);
  };
  const handleOpenDecline = () => {
    setOpenDecline(true);
  };
  const handleCloseDecline = () => {
    setOpenDecline(false);
  };

  const handleClickTeacher = (teacher) => {
    const currentIdx = checkedTeachers.indexOf(teacher);
    const newChecked = [...checkedTeachers];

    if (currentIdx === -1) newChecked.push(teacher);
    else newChecked.splice(currentIdx, 1);

    setCheckedTeachers(newChecked);
  };
  const handleClickStudent = (student) => {
    const currentIdx = checkedStudents.indexOf(student);
    const newChecked = [...checkedStudents];

    if (currentIdx === -1) newChecked.push(student);
    else newChecked.splice(currentIdx, 1);

    setCheckedStudents(newChecked);
  };
  const handleToggleTeachers = () => {
    setCheckedTeachers(checkedAllTeacher ? [] : teacherData);
    setCheckedAllTeacher(!checkedAllTeacher);
  };
  const handleToggleStudents = () => {
    setCheckedStudents(checkedAllStudent ? [] : studentData);
    setCheckedAllStudent(!checkedAllStudent);
  };

  const handleClickApprove = (role) => {
    handleOpenApprove();
    if (role === '강사') setSelected({ selectedUser: checkedTeachers, role });
    else if (role === '학생') setSelected({ selectedUser: checkedStudents, role });
  };
  const handleClickDecline = (role) => {
    handleOpenDecline();
    if (role === '강사') setSelected({ selectedUser: checkedTeachers, role });
    else if (role === '학생') setSelected({ selectedUser: checkedStudents, role });
  };
  const handleApprove = () => {
    const userIds = selected.selectedUser.map((data) => data.user.user_id);
    approveRegisterMutation.mutate(userIds, {
      onSuccess: () => {
        handleCloseApprove();
        alert('등록 요청 승인 성공!');
        if (selected.role === '강사') refetchTeacher();
        else if (selected.role === '학생') refetchStudent();
      },
    });
  };
  const handleDecline = () => {
    const userIds = selected.selectedUser.map((data) => data.user.user_id);
    declineRegisterMutation.mutate(userIds, {
      onSuccess: () => {
        handleCloseDecline();
        alert('등록 요청 거절 성공!');
        if (selected.role === '강사') refetchTeacher();
        else if (selected.role === '학생') refetchStudent();
      },
    });
  };

  return (
    <>
      <TitleMedium title="등록 요청 목록" />
      <Grid container spacing="10vw">
        <Grid item xs={6}>
          <Typography variant="h6" p={1.5}>
            강사 요청 목록
          </Typography>
          <List sx={{ overflow: 'auto', height: '60vh', bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemIcon onClick={handleToggleTeachers}>
                <Checkbox checked={checkedAllTeacher} disableRipple />
              </ListItemIcon>
              <ListItemText primary="전체 선택" />
            </ListItem>
            {teacherIsSuccess
              ? teacherData.map((teacher) => {
                  const teacherInfo = teacher.user;
                  const lecturesName = teacherInfo.lectures.map((obj) => obj.lecture_name);

                  return (
                    <ListItemButton key={teacherInfo.user_id} onClick={() => handleClickTeacher(teacher)}>
                      <ListItemIcon>
                        <Checkbox checked={checkedTeachers.indexOf(teacher) !== -1} />
                      </ListItemIcon>
                      <ListItemText primary={teacherInfo.user_name} secondary={`과목: ${lecturesName.join(', ')}`} />
                    </ListItemButton>
                  );
                })
              : []}
          </List>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleClickApprove('강사')}>
            승인
          </Button>
          <Button variant="contained" onClick={() => handleClickDecline('강사')}>
            거절
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" p={1.5}>
            학생 요청 목록
          </Typography>
          <List sx={{ overflow: 'auto', height: '60vh', bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemIcon onClick={handleToggleStudents}>
                <Checkbox checked={checkedAllStudent} disableRipple />
              </ListItemIcon>
              <ListItemText primary="전체 선택" />
            </ListItem>
            {studentIsSuccess
              ? studentData.map((student) => {
                  const studentInfo = student.user;
                  const parentName = studentInfo.parent ? studentInfo.parent.user_name : '';

                  return (
                    <ListItemButton key={studentInfo.user_id} onClick={() => handleClickStudent(student)} disableRipple>
                      <ListItemIcon>
                        <Checkbox checked={checkedStudents.indexOf(student) !== -1} />
                      </ListItemIcon>
                      <ListItemText primary={studentInfo.user_name} secondary={`학부모: ${parentName}`} />
                    </ListItemButton>
                  );
                })
              : []}
          </List>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleClickApprove('학생')}>
            승인
          </Button>
          <Button variant="contained" onClick={() => handleClickDecline('학생')}>
            거절
          </Button>
        </Grid>
      </Grid>

      {selected && (
        <>
          <SimpleDialog
            openDialog={openApprove}
            handleClose={handleCloseApprove}
            text={`${selected.selectedUser[0].user.user_name} 외 ${selected.selectedUser.length - 1}명(${selected.role})의 등록 요청을 승인하시겠습니까?`}
            second="승인"
            handleClickSecond={handleApprove}
          />
          <SimpleDialog
            openDialog={openDecline}
            handleClose={handleCloseDecline}
            text={`${selected.selectedUser[0].user.user_name} 외 ${selected.selectedUser.length - 1}명(${selected.role})의 등록 요청을 거절하시겠습니까?`}
            second="거절"
            handleClickSecond={handleDecline}
          />
        </>
      )}
    </>
  );
}
