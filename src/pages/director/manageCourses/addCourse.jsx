import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { TransferList } from '../../../components';

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

export default function AddCourse() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState('');
  const [open, setOpen] = useState(false);

  // 수강생 등록 TransferList에 넘겨줄 리스트 (왼,오)
  const [left, setLeft] = useState(students);
  const [right, setRight] = useState([]);

  const handleChangeTeacher = (e) => {
    setTeacher(e.target.value);
  };
  const handleCancle = () => {
    navigate('/director/manage-courses');
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickRegister = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        강의 생성
      </Typography>
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
                <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '40vh', width: '50vw' }}>
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
          <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
            <Button size="large" variant="outlined" sx={{ width: 100, mr: 2 }} onClick={handleCancle}>
              취소
            </Button>
            <Button type="submit" size="large" variant="contained" sx={{ width: 120 }}>
              등록하기
            </Button>
          </Box>
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
