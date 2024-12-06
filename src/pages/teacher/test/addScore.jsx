import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { BottomTwoButtons, Title } from '../../../components';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';
import { useScoreAdd } from '../../../api/queries/test/useScore';
import { useUserAuthStore } from '../../../store';

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
      <Box sx={{ display: 'flex', width: '100%', my: 2, background: '#EEEEEE', borderRadius: 2 }}>
        <Grid xs={2} sx={{ padding: 2 }}>
          <Typography variant="subtitle">이름</Typography>
        </Grid>
        <Grid xs={2} sx={{ padding: 2 }}>
          <Typography variant="subtitle">점수</Typography>
        </Grid>
        <Grid xs={2} />
        <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'black' }} />
        <Grid xs={2} sx={{ padding: 2 }}>
          <Typography variant="subtitle">이름</Typography>
        </Grid>
        <Grid xs={2} sx={{ padding: 2 }}>
          <Typography variant="subtitle">점수</Typography>
        </Grid>
        <Grid xs={2} />
      </Box>
      {students?.map((score, idx) => (
        <>
          <Grid xs={6} sx={{ display: 'flex', width: '50%' }}>
            {idx % 2 === 1 ? <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'black' }} /> : null}
            <Grid xs={4}>
              <Box fullWidth sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography sx={{ padding: 2 }}>{score.user_name}</Typography>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box fullWidth sx={{ backgroundColor: '#EEEEEE' }}>
                <TextField name={score.user_id} sx={{ py: 1 }} size="small" />
              </Box>
            </Grid>
            <Grid xs={4} sx={{ backgroundColor: '#EEEEEE' }} />
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
