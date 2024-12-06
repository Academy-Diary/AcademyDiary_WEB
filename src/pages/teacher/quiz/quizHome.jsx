import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AddButton, Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useCategory } from '../../../api/queries/test/useCategory';
import { useQuizList } from '../../../api/queries/test/useGetExamList';
import { useDeleteExam } from '../../../api/queries/test/useDeleteExam';

export default function QuizHome() {
  const params = useParams();
  const { user, lectures } = useUserAuthStore();

  const [quizId, setQuizId] = useState('');

  const { data: category } = useCategory(user.academy_id);
  const { data, refetch: quizRefetch } = useQuizList(Number(params.courseid), quizId);
  const deleteExam = useDeleteExam(Number(params.courseid));
  const quizs = data?.exams;

  const lecture = lectures.filter((n) => n.lecture_id === Number(params.courseid))[0];
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`${id}`);
  };
  const handleAdd = () => {
    navigate('add');
  };
  const handleDelete = (id) => {
    deleteExam.mutate(id, {
      onSuccess: () => {
        quizRefetch();
      },
    });
  };

  useEffect(() => {
    if (category) {
      const quizCategory = category.filter((n) => n.exam_type_name === '퀴즈')[0];
      setQuizId(quizCategory.exam_type_id);
    }
  }, [category]);

  useEffect(() => {
    if (quizId) {
      quizRefetch();
    }
  });

  return (
    <>
      <Title title={`${lecture.lecture_name} 퀴즈`} />
      <Grid container>
        {quizs?.map((test) => (
          <Grid md={6} xs={12} sx={{ padding: '30px' }}>
            <Box sx={{ width: '100%', bgcolor: '#EEEEEE', boxShadow: '0px 6px 20px 0px #848484', borderRadius: '3px' }}>
              <Grid container sx={{ padding: '10px' }}>
                <Grid md={8}>
                  <Typography variant="h5">{test.exam_name}</Typography>
                </Grid>
                <Grid md={4}>
                  <Button variant="contained" fullWidth disableElevation size="small" onClick={() => handleDetail(test.exam_id)}>
                    문제보기
                  </Button>
                  <Button variant="outlined" fullWidth disableElevation size="small" onClick={() => handleDelete(test.exam_id)} color="error" sx={{ mt: '5px' }}>
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
