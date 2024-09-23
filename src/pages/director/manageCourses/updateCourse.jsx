import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Button, TextField, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, IconButton, Dialog, DialogActions } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { TitleMedium, TransferList, SubmitButtons } from '../../../components';

function createData(name, phone, email) {
  return { name, phone, email };
}

const nonAttendees = [
  createData('신짱아', '010-0000-0000', 'jjanga0@naver.com'),
  createData('김철수', '010-1004-1004', 'smartguy@gmail.com'),
  createData('이훈이', '010-1111-1111', 'hoonhoonguy@daum.net'),
];
const attendees = [createData('신짱구', '010-1234-5678', 'jjanggu33@naver.com')];

export default function UpdateCourse() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 수강생 등록 TransferList에 넘겨줄 리스트 (왼,오)
  const [left, setLeft] = useState(nonAttendees);
  const [right, setRight] = useState(attendees);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/director/manage-courses/');
  };

  return (
    <>
      <TitleMedium title="강의 수정" />
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" defaultValue="화법과 작문" sx={{ mt: 2, color: 'black' }} required />
          </Grid>
          <Grid item xs={12}>
            <Typography>강사명</Typography>
            <TextField label="강사명" defaultValue="나미리" sx={{ mt: 2 }} required />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1}>
                <Typography sx={{ py: 1 }}>수강생 목록</Typography>
              </Grid>
              <Grid item xs={11}>
                <IconButton onClick={handleOpenDialog}>
                  <OpenInNewIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Typography variant="body2">총 {right.length}명</Typography>
            {right.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '25vh', width: '50vw' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>이름</TableCell>
                      <TableCell>전화번호</TableCell>
                      <TableCell>이메일</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {right.map((attendee) => (
                      <TableRow key={attendee.name}>
                        <TableCell>{attendee.name}</TableCell>
                        <TableCell>{attendee.phone}</TableCell>
                        <TableCell>{attendee.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
          <SubmitButtons submitTitle="수정 완료" />
        </Grid>
        <Dialog open={open} onClose={handleCloseDialog}>
          <Grid container spacing={5} sx={{ py: 3, px: 5 }}>
            <Grid item xs={12}>
              <Typography variant="h6">수강생 목록 수정</Typography>
            </Grid>
            <Grid item xs={12}>
              <TransferList leftTitle="비수강생 목록" rightTitle="수강생 목록" left={left} right={right} setLeft={setLeft} setRight={setRight} />
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button variant="contained" onClick={handleCloseDialog}>
                  수정 완료
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </Box>
    </>
  );
}
