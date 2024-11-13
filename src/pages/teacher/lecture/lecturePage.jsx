import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];

export default function LecturePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();

  const classID = Number(params.courseid);
  const lecture = lectures.filter((n) => n.lecture_id === classID)[0];

  const handleGradeClick = () => {
    navigate(`/teacher/class/${lecture.lecture_id}/test`);
  };
  const handleNoticeClick = () => {
    navigate(`/teacher/class/${lecture.lecture_id}/notice`);
  };
  const handleGraphClick = () => {
    navigate(`all`);
  };
  const handleQuizClick = () => {
    navigate('quiz');
  };

  return (
    <>
      <Title title={`${lecture.lecture_name}`} />
      <Typography align="left">{`수강생 ${lecture.headcount}명`}</Typography>
      <Grid container spacing={2} sx={{ mt: 3, width: '80vw' }}>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }} onClick={handleGraphClick}>
            <Typography>전체성적</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }} onClick={handleNoticeClick}>
            <Typography>과목공지게시판</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }} onClick={handleQuizClick}>
            <Typography>퀴즈</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200 }} onClick={handleGradeClick}>
            <Typography>성적관리</Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
