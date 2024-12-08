import React, { useEffect, useState } from 'react';

import { Typography, List, ListItem, ListItemText, Button, Grid, ListItemButton, ListItemIcon, Checkbox, Divider, Box } from '@mui/material';

import { SimpleDialog, TitleMedium } from '../../../components';
import useRequestList from '../../../api/queries/members/useRequestList';
import { useUserAuthStore } from '../../../store';
import { useDecideRegisters } from '../../../api/queries/members/useDecideRegisters';

import teacherIcon from '../../../assets/icons/teacher.png';
import studentIcon from '../../../assets/icons/student.png';

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
    if ((role === '강사' && checkedTeachers.length > 0) || (role === '학생' && checkedStudents.length > 0)) {
      handleOpenApprove();
      if (role === '강사') setSelected({ selectedUser: checkedTeachers, role });
      else if (role === '학생') setSelected({ selectedUser: checkedStudents, role });
    } else {
      alert('승인할 요청을 선택해주세요!');
    }
  };
  const handleClickDecline = (role) => {
    if ((role === '강사' && checkedTeachers.length > 0) || (role === '학생' && checkedStudents.length > 0)) {
      handleOpenDecline();
      if (role === '강사') setSelected({ selectedUser: checkedTeachers, role });
      else if (role === '학생') setSelected({ selectedUser: checkedStudents, role });
    } else {
      alert('거절할 요청을 선택해주세요!');
    }
  };
  const initialize = () => {
    // 상태 초기화 및 데이터 리패치
    setSelected(null);

    if (selected.role === '강사') {
      setCheckedTeachers([]);
      refetchTeacher();
    } else if (selected.role === '학생') {
      setCheckedStudents([]);
      refetchStudent();
    }
  };
  const handleApprove = () => {
    const userIds = selected.selectedUser.map((data) => data.user.user_id);
    approveRegisterMutation.mutate(userIds, {
      onSuccess: () => {
        handleCloseApprove();
        alert('등록 요청 승인 성공!');
        initialize();
      },
    });
  };
  const handleDecline = () => {
    const userIds = selected.selectedUser.map((data) => data.user.user_id);
    declineRegisterMutation.mutate(userIds, {
      onSuccess: () => {
        handleCloseDecline();
        alert('등록 요청 거절 성공!');
        initialize();
      },
    });
  };

  return (
    <>
      <TitleMedium title="등록 요청 목록" />
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mr: 2 }}>
          <Box sx={{ height: 35, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box component="img" src={teacherIcon} sx={{ height: 35 }} />
            <Typography sx={{ fontWeight: 'bold' }}>강사 요청 목록</Typography>
          </Box>
          <List sx={{ overflow: 'auto', height: '65vh' }}>
            <Button onClick={handleToggleTeachers} disableRipple size="small">
              {checkedAllTeacher ? '전체 해제' : '전체 선택'}
            </Button>
            {teacherIsSuccess
              ? teacherData.map((teacher) => {
                  const teacherInfo = teacher.user;

                  return (
                    <ListItemButton key={teacherInfo.user_id} onClick={() => handleClickTeacher(teacher)}>
                      <ListItemIcon>
                        <Checkbox checked={checkedTeachers.indexOf(teacher) !== -1} />
                      </ListItemIcon>
                      <ListItemText primary={`${teacherInfo.user_name} 강사`} />
                    </ListItemButton>
                  );
                })
              : []}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleClickApprove('강사')}>
              승인
            </Button>
            <Button variant="contained" onClick={() => handleClickDecline('강사')}>
              거절
            </Button>
          </Box>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={5.5}>
          <Box sx={{ height: 35, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box component="img" src={studentIcon} sx={{ width: 25 }} />
            <Typography sx={{ fontWeight: 'bold' }}>학생 요청 목록</Typography>
          </Box>
          <List sx={{ overflow: 'auto', height: '65vh' }}>
            <Button onClick={handleToggleStudents} disableRipple size="small">
              {checkedAllStudent ? '전체 해제' : '전체 선택'}
            </Button>
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
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleClickApprove('학생')}>
              승인
            </Button>
            <Button variant="contained" onClick={() => handleClickDecline('학생')}>
              거절
            </Button>
          </Box>
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
