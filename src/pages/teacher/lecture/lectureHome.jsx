import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useUserAuthStore } from '../../../store';
import { TitleMedium } from '../../../components';

export default function LectureHome() {
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();
  // const courses = [
  //   { id: 1, name: '미적분', students: 60 },
  //   { id: 2, name: '확률과통계', students: 30 },
  //   { id: 3, name: '영어', students: 20 },
  //   { id: 4, name: '국어', students: 55 },
  // ];

  function handleClickDetails(course) {
    navigate(`/teacher/class/${course.lecture_id}`);
  }

  return (
    <>
      <TitleMedium title="강의 목록" />
      <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        {lectures.map((lecture) => (
          <ListItem
            key={lecture.lecture_id}
            sx={{ height: 64, marginY: 2, backgroundColor: '#EEEEEE' }}
            onClick={() => {
              handleClickDetails(lecture);
            }}
          >
            <ListItemText primary={lecture.lecture_name} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListItemText align="right" secondary={`수강 인원 : ${lecture.headcount}`} sx={{ mb: 2 }} />
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
}
