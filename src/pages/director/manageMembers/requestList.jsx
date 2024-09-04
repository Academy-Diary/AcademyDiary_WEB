import React, { useState } from 'react';

import { Typography, List, ListItem, ListItemText, Button, Grid, Dialog, DialogActions, DialogContent } from '@mui/material';

import Director from '../../../components/layouts/director';

const teachers = [
  { name: '나미리', lectures: ['화법과 작문', '비문학'] },
  { name: '이하람', lectures: ['미적분 2'] },
  { name: '권해담', lectures: ['물리 1'] },
  { name: '김대성', lectures: ['확률과 통계'] },
];

const students = [
  { name: '신짱구', parentName: '봉미선' },
  { name: '신짱아', parentName: '봉미선' },
  { name: '김철수', parentName: '김미영' },
  { name: '이훈이', parentName: '토마토' },
];

export default function RequestList() {
  const [openApprove, setOpenApprove] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);

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
    // <Director>
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 5 }}>
        등록 요청 목록
      </Typography>
      <Grid container spacing="10vw">
        <Grid item xs={6}>
          <Typography variant="h6" p={1.5}>
            강사 등록 요청
          </Typography>
          <List sx={{ overflow: 'auto', maxHeight: '50vh', bgcolor: 'background.paper' }}>
            {teachers.map((teacher) => (
              <TeacherReqItem key={teacher.name} name={teacher.name} lectures={teacher.lectures} handleOpenApprove={handleOpenApprove} handleOpenDecline={handleCloseApprove} />
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" p={1.5}>
            학생 등록 요청
          </Typography>
          <List sx={{ overflow: 'auto', maxHeight: '50vh', bgcolor: 'background.paper' }}>
            {students.map((student) => (
              <StudentReqItem key={student.name} name={student.name} parentName={student.parentName} handleOpenApprove={handleOpenApprove} handleOpenDecline={handleCloseApprove} />
            ))}
          </List>
        </Grid>
      </Grid>
      <Dialog open={openApprove} onClose={handleCloseApprove}>
        <DialogContent>나미리님의 등록 요청을 승인하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApprove}>승인</Button>
          <Button onClick={handleCloseApprove} autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDecline} onClose={handleCloseDecline}>
        <DialogContent>나미리님의 등록 요청을 거절하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDecline}>거절</Button>
          <Button onClick={handleCloseDecline} autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
    // </Director>
  );
}

function TeacherReqItem({ name, lectures, handleOpenApprove, handleOpenDecline }) {
  return (
    <ListItem key={name}>
      <ListItemText primary={name} secondary={`과목: ${lectures}`} />
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
