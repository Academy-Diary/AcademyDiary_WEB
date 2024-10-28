import React, { useState } from 'react';

import {
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { TitleMedium, TransferList, SubmitButtons } from '../../../components';

function createData(name, phone, email) {
  return { name, phone, email };
}

const students = [
  createData('신짱구', '010-1234-5678', 'jjanggu33@naver.com'),
  createData('신짱아', '010-0000-0000', 'jjanga0@naver.com'),
  createData('김철수', '010-1004-1004', 'smartguy@gmail.com'),
  createData('이훈이', '010-1111-1111', 'hoonhoonguy@daum.net'),
];
const teachers = ['나미리', '이하람', '권해담', '김대성'];

const time = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

export default function AddCourse() {
  const [teacher, setTeacher] = useState('');
  const [open, setOpen] = useState(false);
  const [lectureDays, setLectureDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // 수강생 등록 TransferList에 넘겨줄 리스트 (왼,오)
  const [left, setLeft] = useState(students);
  const [right, setRight] = useState([]);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickRegister = () => {
    setOpen(false);
  };

  const handleChangeTeacher = (e) => {
    setTeacher(e.target.value);
  };
  const handleLectureDays = (e) => {
    const { value } = e.target;
    setLectureDays(typeof value === 'string' ? value.split(',') : value);
  };
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <>
      <TitleMedium title="강의 생성" />
      <Box component="form" sx={{ mt: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" sx={{ mt: 2 }} required />
          </Grid>
          <Grid item xs={12}>
            <Typography>강사명</Typography>
            <FormControl sx={{ mt: 2, minWidth: 195 }}>
              <InputLabel id="teacher-input-label">강사명</InputLabel>
              <Select label="강사명" labelId="teacher-input-label" value={teacher} onChange={handleChangeTeacher} required>
                {teachers.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>강의 시간</Typography>
            <FormControl sx={{ mt: 2, minWidth: 195 }}>
              <InputLabel>요일</InputLabel>
              <Select label="요일" multiple value={lectureDays} onChange={handleLectureDays} required>
                <MenuItem value="Monday">월</MenuItem>
                <MenuItem value="Tuesday">화</MenuItem>
                <MenuItem value="Wednesday">수</MenuItem>
                <MenuItem value="Thursday">목</MenuItem>
                <MenuItem value="Friday">금</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ ml: 4, mt: 2, minWidth: 150 }}>
              <InputLabel>시작 시간</InputLabel>
              <Select label="시작 시간" value={startTime} onChange={handleStartTime} required>
                {time.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ ml: 2, mt: 2, minWidth: 150 }}>
              <InputLabel>종료 시간</InputLabel>
              <Select label="종료 시간" value={endTime} onChange={handleEndTime} required>
                {time.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Grid container>
              <Grid item xs={1}>
                <Typography sx={{ py: 1 }}>수강생 등록</Typography>
              </Grid>
              <Grid item xs={11}>
                <IconButton onClick={handleOpenDialog}>
                  <OpenInNewIcon />
                </IconButton>
              </Grid>
            </Grid>
            {right.length > 0 && (
              <>
                <Typography variant="body2">총 {right.length}명</Typography>
                <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '25vh', width: '50vw' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>전화번호</TableCell>
                        <TableCell>이메일</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {right.map((attendee) => (
                        <TableRow key={attendee.name}>
                          <TableCell>{attendee.name}</TableCell>
                          <TableCell>{attendee.phone}</TableCell>
                          <TableCell>{attendee.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Grid>
          <SubmitButtons submitTitle="등록하기" />
        </Grid>
        <Dialog open={open} onClose={handleCloseDialog}>
          <Grid container spacing={5} sx={{ py: 3, px: 5 }}>
            <Grid item xs={12}>
              <Typography variant="h6">수강생 등록</Typography>
            </Grid>
            <Grid item xs={12}>
              <TransferList leftTitle="전체 학생 목록" rightTitle="수강생 목록" left={left} right={right} setLeft={setLeft} setRight={setRight} />
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button variant="contained" onClick={handleClickRegister}>
                  등록 완료
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </Box>
    </>
  );
}
