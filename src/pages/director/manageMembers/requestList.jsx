import React, { useState } from 'react';

import { Typography, List, ListItem, ListItemText, Button, Grid } from '@mui/material';
import { SimpleDialog, TitleMedium } from '../../../components';
import useRequestList from '../../../api/queries/members/useRequestList';
import { useUserAuthStore } from '../../../store';

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
  const [openApprove, setOpenApprove] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);

  const { data: teacherData } = useRequestList('TEACHER', user.academy_id);
  const { data: studentData } = useRequestList('STUDENT', user.academy_id);

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
                return (
                  <TeacherReqItem key={teacherInfo.user_id} name={teacherInfo.user_name} lectures={teacherInfo.lectures} handleOpenApprove={handleOpenApprove} handleOpenDecline={handleOpenDecline} />
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
                return <StudentReqItem key={studentInfo.user_id} name={studentInfo.user_name} parentName={parentName} handleOpenApprove={handleOpenApprove} handleOpenDecline={handleOpenDecline} />;
              })}
          </List>
        </Grid>
      </Grid>

      <SimpleDialog openDialog={openApprove} handleClose={handleCloseApprove} text="나미리님의 등록 요청을 승인하시겠습니까?" second="승인" handleClickSecond={handleCloseApprove} />
      <SimpleDialog openDialog={openDecline} handleClose={handleCloseDecline} text="나미리님의 등록 요청을 거절하시겠습니까?" second="거절" handleClickSecond={handleCloseDecline} />
    </>
  );
}

function TeacherReqItem({ name, lectures, handleOpenApprove, handleOpenDecline }) {
  const lecturesName = lectures.map((obj) => obj.lecture_name);

  return (
    <ListItem key={name}>
      <ListItemText primary={name} secondary={`과목: ${lecturesName.join(', ')}`} />
      <Button variant="outlined" sx={{ mr: 1 }} onClick={handleOpenApprove}>
        승인
      </Button>
      <Button variant="contained" onClick={handleOpenDecline}>
        거절
      </Button>
    </ListItem>
  );
}

function StudentReqItem({ name, parentName, handleOpenApprove, handleOpenDecline }) {
  return (
    <ListItem key={name}>
      <ListItemText primary={name} secondary={`학부모: ${parentName}`} />
      <Button variant="outlined" sx={{ mr: 1 }} onClick={handleOpenApprove}>
        승인
      </Button>
      <Button variant="contained" onClick={handleOpenDecline}>
        거절
      </Button>
    </ListItem>
  );
}
