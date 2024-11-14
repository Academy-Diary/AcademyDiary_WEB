import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];
const tests = [
  { id: 1, name: '단원평가1' },
  { id: 2, name: '단원평가2' },
  { id: 3, name: '단원평가3' },
  { id: 4, name: '단원평가4' },
];

export default function QuizDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();
  const lecture = lectures.filter((n) => n.lecture_id === Number(params.courseid))[0];
  const test = tests.filter((n) => n.id === Number(params.quizid))[0];

  const handleEnd = () => {
    navigate(-1);
  };

  return (
    <Grid container>
      <Grid md={6} sx={{ padding: '20px' }}>
        {/* 왼쪽 절반 */}
        <Title title={`${lecture.lecture_name} 퀴즈`} />
        <Typography variant="subtitle1">ai가 20개의 문제를 생성합니다.</Typography>
        <Grid container mt={5}>
          <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" fullWidth>
              제목
            </Typography>
          </Grid>
          <Grid md={8}>
            <TextField variant="outlined" value={test.name} required fullWidth disabled />
          </Grid>
        </Grid>
        <Grid container mt={5}>
          <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" fullWidth>
              안내사항(선택)
            </Typography>
          </Grid>
          <Grid md={8}>
            <TextField variant="outlined" value="등비수열과 등차수열에 관련된 퀴즈입니다." disabled fullWidth multiline rows={6} />
          </Grid>
        </Grid>
        <Grid container mt={5}>
          <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" fullWidth>
              키워드
            </Typography>
          </Grid>
          <Grid md={8}>
            <TextField variant="outlined" value="등비수열, 등차수열" disabled fullWidth multiline rows={6} />
          </Grid>
        </Grid>
      </Grid>
      <Grid md={6} sx={{ bgcolor: '#ababab', padding: '20px' }}>
        {/* 오른쪽 절반 */}
        <Title title={`${test.name}`} />
        <Typography variant="subtitle1">퀴즈에 대한 안내사항 란입니다.</Typography>
        <Box sx={{ width: '100%', height: '400px', border: '1px solid #000000' }}>생성된 문제가 표시되는 칸 입니다.</Box>
        <Grid container justifyContent="right" mt={10}>
          <Button variant="contained" onClick={handleEnd}>
            퀴즈 생성 완료
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
