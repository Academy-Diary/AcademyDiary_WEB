import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Box, Button, Grid } from '@mui/material';

import { TitleMedium } from '../../../components';

export default function AddNotice() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.currentTarget.title.value;
    const content = e.currentTarget.content.value;

    if (title.length === 0) {
      alert('제목을 입력해주세요.');
    } else if (content.length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      console.log(title);
      console.log(content);

      navigate('/director/notice');
    }
  };
  const handleCancel = () => {
    navigate('/director/notice');
  };

  return (
    <>
      <TitleMedium title="공지사항 작성" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} />
          </Grid>
        </Grid>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button size="large" variant="outlined" sx={{ width: 100, mr: 2 }} onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit" size="large" variant="contained" sx={{ width: 120 }}>
            등록하기
          </Button>
        </Box>
      </Box>
    </>
  );
}
