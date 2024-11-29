import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useQuizCreate } from '../../../api/queries/quiz/useQuiz';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];

export default function QuizDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();
  const lecture = lectures.filter((n) => n.lecture_id === Number(params.courseid))[0];
  const quizCreate = useQuizCreate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const payload = {
      title: data.get('title'),
      lecture_id: Number(params.courseid),
      comment: data.get('comment'),
      keyword: data.get('keyword'),
    };
    quizCreate.mutate(payload, {
      onSuccess: () => navigate(-1),
      onError: (error) => {
        alert('문제 생성 중 에러가 발생했습니다.');
        console.log('Error occured at creating Quiz', error);
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container>
        <Grid md={6} sx={{ padding: '20px' }}>
          {/* 왼쪽 절반 */}
          <Title title={`${lecture.lecture_name} 퀴즈`} />
          <Typography variant="subtitle1">ai가 5개의 문제를 생성합니다.</Typography>
          <Grid container mt={5}>
            <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" fullWidth>
                제목
              </Typography>
            </Grid>
            <Grid md={8}>
              <TextField name="title" variant="outlined" required fullWidth />
            </Grid>
          </Grid>
          <Grid container mt={5}>
            <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" fullWidth>
                안내사항(선택)
              </Typography>
            </Grid>
            <Grid md={8}>
              <TextField name="comment" variant="outlined" label="학생들에게 전달한 안내메세지를 작성하세요." fullWidth multiline rows={6} />
            </Grid>
          </Grid>
          <Grid container mt={5}>
            <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" fullWidth>
                키워드
              </Typography>
            </Grid>
            <Grid md={8}>
              <TextField name="keyword" variant="outlined" label="어떤 내용의 시험을 생성할까요?" required fullWidth multiline rows={6} />
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} sx={{ bgcolor: '#ababab', padding: '20px' }}>
          {/* 오른쪽 절반 */}
          <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }} height="100%">
            <Button variant="contained" sx={{}} size="small" type="submit">
              + 퀴즈 생성하기
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
