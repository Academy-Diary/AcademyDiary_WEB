import React from 'react';
import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemText, Typography, Grid, Box, Button, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Director from '../../../components/layouts/director';

const courses = [
  { name: '미적분 1', teacher: '이하람', numStudents: 60 },
  { name: '확률과 통계', teacher: '김대성', numStudents: 45 },
  { name: '화법과 작문', teacher: '나미리', numStudents: 39 },
  { name: '비문학', teacher: '나미리', numStudents: 34 },
];

export default function ManageCourses() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/director/manage-courses/add-course');
  };

  return (
    <Director>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        강의 목록
      </Typography>
      <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        {courses.map((course) => (
          <CourseItem key={course.name} name={course.name} teacher={course.teacher} numStudents={course.numStudents} />
        ))}
      </List>
      <Grid container justifyContent="flex-end" sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
        <Grid item>
          <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
            새 강의 생성
          </Button>
        </Grid>
      </Grid>
    </Director>
  );
}

function CourseItem({ name, teacher, numStudents }) {
  return (
    <ListItem sx={{ height: 120, marginY: 2, backgroundColor: 'lightgray' }}>
      <ListItemText primary={name} secondary={teacher} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <ListItemText align="right" secondary={`수강 인원: ${numStudents}`} sx={{ mb: 2 }} />
        <ButtonGroup size="small">
          <Button variant="outlined">강의 상세</Button>
          <Button variant="contained">폐강하기</Button>
        </ButtonGroup>
      </Box>
    </ListItem>
  );
}
