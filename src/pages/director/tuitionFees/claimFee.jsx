import React, { useState } from 'react';

import { Typography, Box, Grid, Select, FormControl, InputLabel, MenuItem, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';

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

export default function ClaimFee() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);

  const { user } = useUserAuthStore();
  const { data: students } = useStudentList(user.academy_id);
  const { data: classes } = useClassList(user.academy_id);

  const handleChangeSelect = (e) => {
    setSelectedStudent(e.target.value);
  };
  const handleChangeToggle = (e, newList) => {
    setSelectedClasses(newList);
  };

  return (
    <>
      <TitleMedium title="학원비 청구" />
      <Box component="form" sx={{ mt: 5 }}>
        <Grid container spacing={10}>
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
        </Grid>
        <Box sx={{ position: 'fixed', left: '3vw', bottom: '5vh' }}>
          <Typography variant="h6">{`총 청구 비용: ${selectedClasses.map((c) => c.expense).reduce((acc, cur) => acc + cur, 0)} ₩`}</Typography>
        </Box>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button size="large" variant="outlined" sx={{ mr: 2 }}>
            미리보기
          </Button>
          <Button type="submit" size="large" variant="contained">
            청구서 전송하기
          </Button>
        </Box>
      </Box>
    </>
  );
}
