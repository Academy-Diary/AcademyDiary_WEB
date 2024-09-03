import React, { useState } from 'react';

import { Typography, Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, Grid } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Director from '../../../components/layouts/director';

const teachers = ['나미리', '이하람', '권해담', '김대성'];

export default function AddCourse() {
  const [teacher, setTeacher] = useState('');

  const handleChangeTeacher = (e) => {
    setTeacher(e.target.value);
  };

  return (
    <Director>
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
                <IconButton>
                  <OpenInNewIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
            <Button size="large" variant="outlined" sx={{ width: 100, mr: 2 }}>
              취소
            </Button>
            <Button type="submit" size="large" variant="contained" sx={{ width: 120 }}>
              등록하기
            </Button>
          </Box>
        </Grid>
      </Box>
    </Director>
  );
}
