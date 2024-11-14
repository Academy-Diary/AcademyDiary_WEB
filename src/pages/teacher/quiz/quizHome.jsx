import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AddButton, Title } from '../../../components';
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

export default function QuizHome() {
  const params = useParams();
  const { lectures } = useUserAuthStore();
  const lecture = lectures.filter((n) => n.lecture_id === Number(params.courseid))[0];
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`${id}`);
  };
  const handleAdd = () => {
    navigate('add');
  };

  return (
    <>
      <Title title={`${lecture.lecture_name} 퀴즈`} />
      <Grid container>
        {tests.map((test) => (
          <Grid md={6} xs={12} sx={{ padding: '10px' }}>
            <Box sx={{ width: '100%', bgcolor: '#ababab' }}>
              <Grid container sx={{ padding: '10px' }}>
                <Grid md={8}>
                  <Typography variant="h5">{test.name}</Typography>
                </Grid>
                <Grid md={4}>
                  <Button variant="contained" fullWidth disableElevation size="small" onClick={() => handleDetail(test.id)}>
                    문제보기
                  </Button>
                  <Button variant="outlined" fullWidth disableElevation size="small" onClick={() => console.log(`DELETE ${test.id}`)} color="error" sx={{ mt: '5px' }}>
                    삭제
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
      <AddButton title="새퀴즈 생성" onClick={handleAdd} />
    </>
  );
}
