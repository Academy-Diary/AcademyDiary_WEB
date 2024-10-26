import React, { useState } from 'react';

import { Typography, List, ListItem, ListItemText, Button, Grid } from '@mui/material';
import { SimpleDialog, TitleMedium } from '../../../components';
import useRequestList from '../../../api/queries/members/useRequestList';
import { useUserAuthStore } from '../../../store';
import { useDecideRegister } from '../../../api/queries/members/useDecideRegister';

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
  const [openApprove, setOpenApprove] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);

  const { data: teacherData } = useRequestList('TEACHER', user.academy_id);
  const { data: studentData } = useRequestList('STUDENT', user.academy_id);

  const approveRegisterMutation = useDecideRegister(user.academy_id, true);
  const declineRegisterMutation = useDecideRegister(user.academy_id, false);

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

  const handleClickApprove = (selectedUser) => {
    handleOpenApprove();
    setSelected(selectedUser);
  };
  const handleClickDecline = (selectedUser) => {
    handleOpenDecline();
    setSelected(selectedUser);
  };
  const handleApprove = () => {
    approveRegisterMutation.mutate(selected.user_id, {
      onSuccess: () => {
        handleCloseApprove();
        alert('등록 요청 승인 성공!');
      },
    });
  };
  const handleDecline = () => {
    declineRegisterMutation.mutate(selected.user_id, {
      onSuccess: () => {
        handleCloseDecline();
        alert('등록 요청 거절 성공!');
      },
    });
  };

  return (
    <>
      <TitleMedium title="등록 요청 목록" />
      <Grid container spacing="10vw">
        <Grid item xs={6}>
          <Typography variant="h6" p={1.5}>
            강사 등록 요청
          </Typography>
          <List sx={{ overflow: 'auto', maxHeight: '50vh', bgcolor: 'background.paper' }}>
            {teacherData?.length > 0 &&
              teacherData?.map((teacher) => {
                const teacherInfo = teacher.user;
                const lecturesName = teacherInfo.lectures.map((obj) => obj.lecture_name);

                return (
                  <ListItem key={teacherInfo.user_id}>
                    <ListItemText primary={teacherInfo.user_name} secondary={`과목: ${lecturesName.join(', ')}`} />
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleClickApprove(teacherInfo)}>
                      승인
                    </Button>
                    <Button variant="contained" onClick={() => handleClickDecline(teacherInfo)}>
                      거절
                    </Button>
                  </ListItem>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" p={1.5}>
            학생 등록 요청
          </Typography>
          <List sx={{ overflow: 'auto', maxHeight: '50vh', bgcolor: 'background.paper' }}>
            {studentData?.length > 0 &&
              studentData?.map((student) => {
                const studentInfo = student.user;
                const parentName = studentInfo.parent ? studentInfo.parent.user_name : '';

                return (
                  <ListItem key={studentInfo.user_id}>
                    <ListItemText primary={studentInfo.user_name} secondary={`학부모: ${parentName}`} />
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleClickApprove(studentInfo)}>
                      승인
                    </Button>
                    <Button variant="contained" onClick={() => handleClickDecline(studentInfo)}>
                      거절
                    </Button>
                  </ListItem>
                );
              })}
          </List>
        </Grid>
      </Grid>

      <SimpleDialog openDialog={openApprove} handleClose={handleCloseApprove} text={`${selected?.user_name}님의 등록 요청을 승인하시겠습니까?`} second="승인" handleClickSecond={handleApprove} />
      <SimpleDialog openDialog={openDecline} handleClose={handleCloseDecline} text={`${selected?.user_name}님의 등록 요청을 거절하시겠습니까?`} second="거절" handleClickSecond={handleDecline} />
    </>
  );
}
