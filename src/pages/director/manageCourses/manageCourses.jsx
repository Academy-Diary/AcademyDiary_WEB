import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemText, Box, Button, ButtonGroup, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@mui/material';

import { TitleMedium, AddButton } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useLectureList } from '../../../api/queries/lectures/useLectureList';

// Lecture List
//
// [
//   {
//     academy_id: 'test_academy',
//     lecture_id: 1,
//     lecture_name: '한국사',
//     teacher_id: 'test_teacher',
//     teacher_name: "권해담",
//     days: ['TUESDAY', 'THURSDAY'],
//     headcount: 60,
//     start_time: '2024-10-16T04:30:00.000Z',
//     end_time: '2024-10-16T06:00:00.000Z',
//   },
// ];

export default function ManageCourses() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { user } = useUserAuthStore();
  const { data: lectures } = useLectureList(user.academy_id);

  const handleClickAdd = () => {
    navigate('/director/manage-courses/add-course');
  };
  const handleClickDetails = () => {
    navigate('/director/manage-courses/course-details');
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <TitleMedium title="강의 목록" />
      <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        {lectures?.map((lecture) => (
          <ListItem key={lecture.lecture_id} sx={{ height: 120, marginY: 2, backgroundColor: 'lightgray' }}>
            <ListItemText primary={lecture.lecture_name} secondary={lecture.teacher_name} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ListItemText align="right" secondary={`수강 인원: ${lecture.headcount}`} sx={{ mb: 2 }} />
              <ButtonGroup size="small">
                <Button variant="outlined" onClick={handleClickDetails}>
                  강의 상세
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpenDialog();
                    setSelected(lecture);
                  }}
                >
                  폐강하기
                </Button>
              </ButtonGroup>
            </Box>
          </ListItem>
        ))}
      </List>
      <AddButton title="새 강의 생성" onClick={handleClickAdd} />
      {selected && (
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>{selected.name} 강의를 폐강하시겠습니까?</DialogTitle>
          <DialogContent>
            <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
              <DialogContentText>강의명: {selected.name}</DialogContentText>
              <DialogContentText>강사명: {selected.teacher}</DialogContentText>
              <DialogContentText>수강인원: {selected.numStudents}</DialogContentText>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>취소</Button>
            <Button onClick={handleCloseDialog}>폐강</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
