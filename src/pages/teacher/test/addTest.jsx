import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Container, Grid, Stack, TextField, Typography } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import { SubmitButtons, Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useCategory } from '../../../api/queries/test/useCategory';

const courses = [
  { id: 1, name: '미적분', students: 60 },
  { id: 2, name: '확률과통계', students: 30 },
  { id: 3, name: '영어', students: 20 },
  { id: 4, name: '국어', students: 55 },
];

export default function AddTest() {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const { user } = useUserAuthStore();

  const courseID = Number(courseid);
  const course = courses.filter((n) => n.id === courseID)[0];

  const addExam = useAddExam(lectureId);
  const { data: categoryT } = useCategory(user.academy_id);
  console.log('category', categoryT);

  const [category, setOriginCategory] = useState([]);
  const [selectCategory, setSelCategory] = useState([]);
  const [date, setDate] = useState();

  console.log('selectCategory', selectCategory);
  useEffect(() => {
    if (categoryT) {
      setOriginCategory(categoryT);
    }
  }, [categoryT]);
  const handleClickCategory = (cat) => {
    console.log('cat', cat);
    if (selectCategory.length === 0) {
      setSelCategory([cat]);
      setOriginCategory(category.filter((n) => n.exam_type_id !== cat.exam_type_id));
    } else {
      alert('시험 유형은 하나만 선택이 가능합니다.');
    }
  };
  const handleClickSelCategory = (e) => {
    setOriginCategory([...category, selectCategory[0]]);
    setSelCategory('');
  };
  const handleCreate = () => {
    navigate(`/teacher/class/${course.id}/test`);
  };

  return (
    <Container>
      <Title title={course.name} subtitle="시험만들기" />
      <Stack component="form" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
        <TextField required name="testname" label="시험 이름" />
        <Grid sx={[12, { m: 1, p: 1 }]}>
          <Typography variant="h6" align="center">
            시험 유형
          </Typography>
          {selectCategory.length !== 0 ? <Chip label={selectCategory[0].exam_type_name} onClick={handleClickSelCategory} /> : null}
        </Grid>
        <Grid container sx={6} justifyContent="center">
          {category.map((cat) => (
            <Grid sx={4}>
              <Chip label={cat.exam_type_name} variant="outlined" sx={{ mx: 1 }} onClick={() => handleClickCategory(cat)} />
            </Grid>
          ))}
        </Grid>
        <Grid sx={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="시험 날짜" maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button size="large" variant="contained" onClick={handleCreate}>
            시험 생성 완료
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
