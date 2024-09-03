import React, { useState } from 'react';

import { Typography, Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, Grid, Dialog, DialogActions } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Director from '../../../components/layouts/director';
import { TransferList } from '../../../components';

const teachers = ['나미리', '이하람', '권해담', '김대성'];
const students = ['신짱구', '신짱아', '이훈이', '김철수'];

export default function AddCourse() {
  const [teacher, setTeacher] = useState('');
  const [open, setOpen] = useState(false);

  const handleChangeTeacher = (e) => {
    setTeacher(e.target.value);
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
                <IconButton onClick={handleOpenDialog}>
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
        <Dialog open={open} onClose={handleCloseDialog}>
          <Grid container spacing={5} sx={{ py: 3, px: 5 }}>
            <Grid item xs={12}>
              <Typography variant="h6">수강생 등록</Typography>
            </Grid>
            <Grid item xs={12}>
              <TransferList leftList={students} rightList={[]} />
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
    </Director>
  );
}
