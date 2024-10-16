import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BottomTwoButtons, Title } from '../../../components';

const courses = [
  { id: 1, name: '미적분', students: 60 },
  { id: 2, name: '확률과통계', students: 30 },
  { id: 3, name: '영어', students: 20 },
  { id: 4, name: '국어', students: 55 },
];

const students = [
  { id: 1, name: '김대성' },
  { id: 2, name: '김민수' },
  { id: 3, name: '김선우' },
  { id: 4, name: '권해담' },
  { id: 5, name: '이태윤' },
  { id: 6, name: '서민석' },
];

export default function AddScore() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [isEditing, setEditing] = useState([false, false, false, false, false, false]);

  const courseID = Number(courseid);
  const course = courses.filter((n) => n.id === courseID)[0];
  return (
    <Grid container spacing={2} sx={{ width: '80vw' }}>
      <Grid xs={12}>
        <Title title={course.name} />
      </Grid>
      <Grid xs={12}>
        <Typography fullWidth variant="h6">
          문제수 : 20, 총점 : 100, 평균: 70, 표준오차 : 35, 수강인원 : {course.students}명
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
      {students.map((score) => (
        <>
          <Grid xs={3}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
              <Typography sx={{ padding: 2 }}>{score.name}</Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
              <TextField sx={{ py: 1 }} size="small" />
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
                navigate(-1);
              }}
            />
          </Box>
        </>
      ))}
    </Grid>
  );
}
