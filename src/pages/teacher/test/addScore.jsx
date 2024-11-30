import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BottomTwoButtons, Title } from '../../../components';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';
import { useScoreAdd } from '../../../api/queries/test/useScore';
import { useUserAuthStore } from '../../../store';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];

// const students = [
//   { id: 1, name: '김대성' },
//   { id: 2, name: '김민수' },
//   { id: 3, name: '김선우' },
//   { id: 4, name: '권해담' },
//   { id: 5, name: '이태윤' },
//   { id: 6, name: '서민석' },
// ];

export default function AddScore() {
  const { courseid, testid } = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();
  const { state: examInfo } = useLocation();

  const { data: students } = useAttendeeList(courseid);
  const useAdd = useScoreAdd(courseid, testid);

  const courseID = Number(courseid);
  const lecture = lectures.filter((n) => n.lecture_id === courseID)[0];
  return (
    <Grid container spacing={2} sx={{ width: '80vw' }}>
      <Grid xs={12}>
        <Title title={lecture.lecture_name} />
      </Grid>
      <Grid xs={12}>
        <Typography fullWidth variant="h6">
          시행일: {examInfo.exam_date.split('T')[0]}, 최고점: {examInfo.high_score}, 평균: {examInfo.average_score}, 최저점: {examInfo.low_score}
        </Typography>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            이름
          </Typography>
        </Box>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            점수
          </Typography>
        </Box>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            이름
          </Typography>
        </Box>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            점수
          </Typography>
        </Box>
      </Grid>
      {students?.map((score) => (
        <>
          <Grid xs={3}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
              <Typography sx={{ padding: 2 }}>{score.user_name}</Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
              <TextField name={score.user_id} sx={{ py: 1 }} size="small" />
            </Box>
          </Grid>
          <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
            <BottomTwoButtons
              first="입력 취소"
              second="입력 완료"
              onClickFirst={() => {
                navigate(-1);
              }}
              onClickSecond={() => {
                // 입력이 끝났을 때 처리
                const vscore = document.getElementsByTagName('input');
                const scores = [];
                for (let i = 0; i < vscore.length; i += 1) {
                  if (vscore[i].value !== '') scores.push({ user_id: vscore[i].name, score: Number(vscore[i].value) });
                }
                useAdd.mutate(
                  {
                    scoreList: scores,
                  },
                  {
                    onSuccess: () => {
                      navigate(-1);
                    },
                    onError: (error) => console.log('score add error', error),
                  }
                );
              }}
            />
          </Box>
        </>
      ))}
    </Grid>
  );
}
