import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, colors, Grid, Typography } from '@mui/material';
import { Title, TitleMedium } from '../../../components';

const courses = [
  { id: 1, name: '미적분', students: 60 },
  { id: 2, name: '확률과통계', students: 30 },
  { id: 3, name: '영어', students: 20 },
  { id: 4, name: '국어', students: 55 },
];

export default function ClassPage() {
  const params = useParams();
  const navigate = useNavigate();

  const classID = Number(params.id);
  const course = courses.filter((n) => n.id === classID)[0];

  const handleNoticeClick = () => {
    navigate(`/teacher/class/${course.id}/notice`);
  };

  return (
    <>
      <Title title={`${course.name}`} />
      <Typography align="left">{`수강생 ${course.students}명`}</Typography>
      <Grid container spacing={2} sx={{ mt: 3, width: '80vw' }}>
        <Grid item xs={6}>
          <Container
            maxWidth="md"
            sx={{ height: 200, bgcolor: 'grey' }}
            onClick={() => {
              console.log('isClicked');
            }}
          >
            <Typography>출결관리</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }} onClick={handleNoticeClick}>
            <Typography>과목공지게시판</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }}>
            <Typography>퀴즈</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }}>
            <Typography>성적관리</Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
