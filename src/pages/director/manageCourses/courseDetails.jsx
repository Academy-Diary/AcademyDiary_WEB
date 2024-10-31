import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, TextField, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { TitleMedium, BottomTwoButtons } from '../../../components';
import { useLectureStore } from '../../../store';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';

const weekdaysKor = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
};

export default function CourseDetails() {
  const navigate = useNavigate();

  const { lecture } = useLectureStore();
  const { data: attendees } = useAttendeeList(lecture.lecture_id);

  const [lectureDays, setLectureDays] = useState(''); // ex) "월, 화, 수"
  useEffect(() => {
    const days = lecture.days.map((lec) => weekdaysKor[lec]);
    setLectureDays(days.join(', '));
  }, [lecture]);

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
            <Typography>강의 시간</Typography>
            <TextField label="요일" value={lectureDays} sx={{ mt: 2 }} disabled />
            <TextField label="시작 시간" value={lecture.start_time} sx={{ ml: 4, mt: 2, minWidth: 150 }} disabled />
            <TextField label="종료 시간" value={lecture.end_time} sx={{ ml: 2, mt: 2, minWidth: 150 }} disabled />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ py: 1 }}>수강생 목록</Typography>
            <Typography variant="body2">총 {attendees?.length}명</Typography>
            <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '25vh', width: '50vw' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>학생 이름</TableCell>
                    <TableCell>학생 연락처</TableCell>
                    <TableCell>학부모 이름</TableCell>
                    <TableCell>학부모 연락처</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendees?.map((att) => {
                    const { parent } = att;

                    return (
                      <TableRow key={att.user_id}>
                        <TableCell>{att.user_name}</TableCell>
                        <TableCell>{att.phone_number}</TableCell>
                        <TableCell>{parent?.user_name}</TableCell>
                        <TableCell>{parent?.phone_number}</TableCell>
                      </TableRow>
                    );
                  })}
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
