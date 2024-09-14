import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemText, Box, Button, ButtonGroup, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@mui/material';

import { TitleMedium, AddButton } from '../../../components';

const courses = [
  { name: '미적분 1', teacher: '이하람', numStudents: 60 },
  { name: '확률과 통계', teacher: '김대성', numStudents: 45 },
  { name: '화법과 작문', teacher: '나미리', numStudents: 39 },
  { name: '비문학', teacher: '나미리', numStudents: 34 },
];

export default function ManageCourses() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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
        {courses.map((course) => (
          <ListItem key={course.name} sx={{ height: 120, marginY: 2, backgroundColor: 'lightgray' }}>
            <ListItemText primary={course.name} secondary={course.teacher} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ListItemText align="right" secondary={`수강 인원: ${course.numStudents}`} sx={{ mb: 2 }} />
              <ButtonGroup size="small">
                <Button variant="outlined" onClick={handleClickDetails}>
                  강의 상세
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpenDialog();
                    setSelected(course);
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
