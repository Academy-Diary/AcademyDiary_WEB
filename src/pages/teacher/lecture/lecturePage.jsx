import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';
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
          <Container maxWidth="md" sx={{ height: 200, border: '1px solid #000000', borderRadius: 3 }} onClick={handleGraphClick}>
            <Box sx={{ padding: 1, position: 'absolute', top: '290px', backgroundColor: '#ffffff' }}>
              <Typography sx={{ fontFamily: 'Pretendard-Regular' }}>전체성적</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200, border: '1px solid #000000', borderRadius: 3 }} onClick={handleNoticeClick}>
            <Box sx={{ padding: 1, position: 'absolute', top: '290px', backgroundColor: '#ffffff' }}>
              <Typography sx={{ fontFamily: 'Pretendard-Regular' }}>과목공지게시판</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200, border: '1px solid #000000', borderRadius: 3 }} onClick={handleQuizClick}>
            <Box sx={{ padding: 1, position: 'absolute', top: 506, backgroundColor: '#ffffff' }}>
              <Typography sx={{ fontFamily: 'Pretendard-Regular' }}>퀴즈</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md" sx={{ height: 200, border: '1px solid #000000', borderRadius: 3 }} onClick={handleGradeClick}>
            <Box sx={{ padding: 1, position: 'absolute', top: 506, backgroundColor: '#ffffff' }}>
              <Typography>성적관리</Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
