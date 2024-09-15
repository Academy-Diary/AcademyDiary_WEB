import React, { useState, useEffect } from 'react';

import { Typography, Box, Grid, Select, FormControl, InputLabel, MenuItem, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';

import { TitleMedium } from '../../../components';

function createData(name, parentName, phone, parentPhone) {
  return { name, parentName, phone, parentPhone };
}

const students = [
  createData('신짱구', '봉미선', '010-1234-5678', '010-8282-5959'),
  createData('신짱아', '봉미선', '010-0000-0000', '010-8282-5959'),
  createData('김철수', '김미영', '010-1004-1004', '010-9410-1494'),
  createData('이훈이', '토마토', '010-1111-1111', '010-3948-2839'),
];

const classes = [
  { name: '수학 집중반', fee: 270000 },
  { name: '토익반', fee: 150000 },
  { name: '국어 집중반', fee: 250000 },
];

export default function ClaimFee() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {}, [selectedClasses]);

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
                {students.map((s) => (
                  <MenuItem key={s.name} value={s}>{`${s.name}(${s.phone.substr(9)})`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>수강반 선택</Typography>
            <ToggleButtonGroup value={selectedClasses} onChange={handleChangeToggle} sx={{ mt: 3 }}>
              {classes.map((c) => (
                <ToggleButton key={c.name} value={c}>
                  {c.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Box sx={{ position: 'fixed', left: '3vw', bottom: '5vh' }}>
          <Typography variant="h6">{`총 청구 비용: ${selectedClasses.map((c) => c.fee).reduce((acc, cur) => acc + cur, 0)} ₩`}</Typography>
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
