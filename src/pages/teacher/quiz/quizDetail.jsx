import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useQuizInfo, useQuizProblem } from '../../../api/queries/quiz/useQuiz';

export default function QuizDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();
  const [quizNum, setQuizNum] = useState(0);
  const [betweenQuiz, setBetweenQuiz] = useState(false); // 다음, 이전 버튼 눌렀을 때 문제가 로딩되기 전 렌더링 되는 것을 방지.
  const lecture = lectures.filter((n) => n.lecture_id === Number(params.courseid))[0];

  const { data: quizInfo } = useQuizInfo(Number(params.quizid));
  const { data: quiz, refetch: quizRefetch } = useQuizProblem(Number(params.quizid), quizNum);

  useEffect(() => {
    if (quiz) {
      setBetweenQuiz(false);
    }
  }, [quiz]);
  quizRefetch();

  const handleNext = () => {
    if (quizNum + 1 < 5) {
      setBetweenQuiz(true);
      setQuizNum(quizNum + 1);
    } else alert('퀴즈 문제의 끝입니다.');
  };

  const handleBefore = () => {
    if (quizNum - 1 >= 0) {
      setBetweenQuiz(true);
      setQuizNum(quizNum - 1);
    } else alert('첫 문제입니다.');
  };

  return (
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
            <TextField variant="outlined" value={quizInfo?.title} required fullWidth disabled />
          </Grid>
        </Grid>
        <Grid container mt={5}>
          <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" fullWidth>
              안내사항(선택)
            </Typography>
          </Grid>
          <Grid md={8}>
            <TextField variant="outlined" value={quizInfo?.comment} disabled fullWidth multiline rows={6} />
          </Grid>
        </Grid>
        <Grid container mt={5}>
          <Grid md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" fullWidth>
              키워드
            </Typography>
          </Grid>
          <Grid md={8}>
            <TextField variant="outlined" value={quizInfo?.keyword} disabled fullWidth multiline rows={6} />
          </Grid>
        </Grid>
      </Grid>
      <Grid md={6} sx={{ bgcolor: '#D9D9D9', padding: '20px' }}>
        {/* 오른쪽 절반 */}
        <Title title={quizInfo?.title} />
        <Typography variant="subtitle1">{quizInfo?.keyword}에 관련한 문제입니다.</Typography>
        <Box sx={{ width: '100%', height: '400px', border: '1px solid #000000', padding: '5px' }}>
          {quiz != null && !betweenQuiz ? (
            <>
              <Typography variant="h5">
                {quizNum + 1}. {quiz[quizNum].question}
              </Typography>
              <RadioGroup defaultValue={Object.values(quiz[quizNum].answer)[0]}>
                {quiz[quizNum].options.map((option) => (
                  <FormControlLabel value={option} disabled control={<Radio />} label={option} />
                ))}
              </RadioGroup>

              <Typography variant="subtitle1">해설 : {quiz[quizNum].explanation}</Typography>
            </>
          ) : null}
        </Box>
        <Grid container justifyContent="space-between" mt={10}>
          <Button variant="outlined" onClick={handleBefore}>
            이전 문제
          </Button>
          <Button variant="contained" onClick={handleNext}>
            다음 문제
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
        <Button size="large" variant="contained" onClick={() => navigate(-1)}>
          퀴즈 목록으로 돌아가기
        </Button>
      </Box>
    </Grid>
  );
}
