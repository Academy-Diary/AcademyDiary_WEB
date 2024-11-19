import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useDeleteExam } from '../../../api/queries/test/useDeleteExam';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];

const scores = [
  { id: 1, name: '김대성', score: 100 },
  { id: 2, name: '김민수', score: 35 },
  { id: 3, name: '김선우', score: 80 },
  { id: 4, name: '권해담', score: 70 },
  { id: 5, name: '이태윤', score: 50 },
  { id: 6, name: '서민석', score: 55 },
];

export default function ScoreList() {
  const { courseid, testid } = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();

  const [isEditing, setEditing] = useState([false, false, false, false, false, false]);

  const deleteExam = useDeleteExam(courseid, testid);

  const handleEdit = (id) => {
    const editTmp = [...isEditing];
    const tmp = scores.map((sc, i) => {
      if (sc.id === id) {
        editTmp[i] = !editTmp[i];
      }
      return null;
    });
    setEditing([...editTmp]);
  };

  const handleDelete = () => {
    deleteExam.mutate({}, { onSuccess: () => navigate(`/teacher/class/${courseid}/test`) });
  };

  const courseID = Number(courseid);
  const lecture = lectures.filter((n) => n.lecture_id === courseID)[0];
  return (
    <Grid container spacing={2} sx={{ width: '80vw' }}>
      <Grid xs={12}>
        <Title title={lecture.lecture_name} />
      </Grid>
      <Grid xs={8}>
        <Typography fullWidth variant="h6">
          문제수 : 20, 총점 : 100, 평균: 70, 표준오차 : 35, 수강인원 : {lecture.headcount}명
        </Typography>
      </Grid>
      <Grid xs={4}>
        <TextField
          variant="outlined"
          label="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
      {scores.map((score) => (
        <>
          <Grid xs={3}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
              <Typography sx={{ padding: 2 }}>{score.name}</Typography>
            </Box>
          </Grid>
          <Grid xs={2}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
              {!isEditing[score.id - 1] ? <Typography sx={{ padding: 2 }}>{score.score}</Typography> : <TextField sx={{ py: 1 }} value={score.score} size="small" />}
            </Box>
          </Grid>
          <Grid xs={1}>
            <Box fullWidth sx={{ backgroundColor: 'lightgray', py: 1.57 }}>
              {!isEditing[score.id - 1] ? (
                <Button variant="contained" size="small" onClick={() => handleEdit(score.id)}>
                  수정
                </Button>
              ) : (
                <Button variant="contained" size="small" onClick={() => handleEdit(score.id)}>
                  수정완료
                </Button>
              )}
            </Box>
          </Grid>
          <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
            <Button size="large" variant="contained" color="error" sx={{ mr: 2 }} onClick={handleDelete}>
              삭제하기
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                navigate('add-score');
              }}
            >
              전체성적입력
            </Button>
          </Box>
        </>
      ))}
    </Grid>
  );
}
