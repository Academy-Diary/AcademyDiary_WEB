import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, TextField, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { TitleMedium, BottomTwoButtons } from '../../../components';
import { useLectureStore } from '../../../store';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';

export default function CourseDetails() {
  const navigate = useNavigate();

  const { lecture } = useLectureStore();
  const { data: attendees } = useAttendeeList(lecture.lecture_id);

  const handleCancle = () => {
    navigate('/director/manage-courses/');
  };
  const handleClickUpdate = () => {
    navigate('/director/manage-courses/update');
  };

  return (
    <>
      <TitleMedium title="강의 상세" />
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" value={lecture.lecture_name} sx={{ mt: 2 }} disabled />
          </Grid>
          <Grid item xs={12}>
            <Typography>강사명</Typography>
            <TextField label="강사명" value={lecture.teacher_name} sx={{ mt: 2 }} disabled />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ py: 1 }}>수강생 목록</Typography>
            <Typography variant="body2">총 {attendees?.length}명</Typography>
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
                  {attendees?.map((att) => (
                    <TableRow key={att.name}>
                      <TableCell>{att.name}</TableCell>
                      <TableCell>{att.phone}</TableCell>
                      <TableCell>{att.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <BottomTwoButtons first="목록으로" second="수정하기" onClickFirst={handleCancle} onClickSecond={handleClickUpdate} />
        </Grid>
      </Box>
    </>
  );
}
