import React, { useState } from 'react';

import { Typography, Box, Grid, Select, FormControl, InputLabel, MenuItem, ToggleButton, ToggleButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TitleMedium } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useStudentList } from '../../../api/queries/members/useStudentList';
import { useClassList } from '../../../api/queries/tuitionFees/useClassList';

// const students = [
//   {
//     "user_id": "test_student",
//     "user_name": "춘향이",
//     "phone_number": "010-1234-5678",
//     "parent": {
//       "user_name": "홍길동",
//       "phone_number": "010-1111-2222"
//     }
//   },
// ];

// const classes = [
//   {
//     academy_id: 'test_academy',
//     class_id: 1,
//     class_name: '이과 집중반',
//     discount: 50000,
//     duration: 30,
//     expense: 300000,
//   },
// ];

// 총 청구 비용 계산
const getTotalFee = (fees) => fees.reduce((acc, cur) => acc + cur, 0);

export default function ClaimFee() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [open, setOpen] = useState(false);

  const { user } = useUserAuthStore();
  const { data: students } = useStudentList(user.academy_id);
  const { data: classes } = useClassList(user.academy_id);

  const handleChangeSelect = (e) => {
    setSelectedStudent(e.target.value);
  };
  const handleChangeToggle = (e, newList) => {
    setSelectedClasses(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <TitleMedium title="학원비 청구" />
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography>학생 선택</Typography>
            <FormControl sx={{ mt: 3, minWidth: 120 }}>
              <InputLabel>학생 선택</InputLabel>
              <Select value={selectedStudent} onChange={handleChangeSelect} required>
                {students?.map((s) => (
                  <MenuItem key={s.user_id} value={s}>{`${s.user_name}(${s.phone_number.substr(9)})`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>수강반 선택</Typography>
            <ToggleButtonGroup value={selectedClasses} onChange={handleChangeToggle} sx={{ mt: 3 }}>
              {classes?.map((c) => (
                <ToggleButton key={c.class_id} value={c}>
                  {c.class_name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography>납부 기한</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ mt: 2, maxWidth: 200 }}>
                <DatePicker value={dueDate} onChange={(newDate) => setDueDate(newDate)} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box sx={{ position: 'fixed', left: '3vw', bottom: '5vh' }}>
          <Typography variant="h6">{`총 청구 비용: ${getTotalFee(selectedClasses.map((c) => c.expense))} ₩`}</Typography>
        </Box>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button type="submit" size="large" variant="contained">
            청구하기
          </Button>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>청구서 미리보기</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography>청구 대상</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{`${selectedStudent?.user_name}(${selectedStudent?.phone_number?.substr(9)})`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid black', padding: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography>수강반</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{selectedClasses.map((c, idx) => (idx < selectedClasses.length - 1 ? `${c.class_name}(${c.expense}), ` : `${c.class_name}(${c.expense})`))}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>총 청구 비용</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{getTotalFee(selectedClasses.map((c) => c.expense))}₩</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>납부 기한</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{dueDate?.format('~YYYY.MM.DD').toString()}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="contained">전송하기</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
