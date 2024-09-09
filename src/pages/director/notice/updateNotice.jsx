import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Box, Grid, Button } from '@mui/material';

import { TitleMedium } from '../../../components';

const oldTitle = '8월 정기고사 안내';
const oldContent = '안녕하세요. \n1학기 마지막 정기고사 안내입니다. \n...';

export default function UpdateNotice() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = e.currentTarget.title.value;
    const newContent = e.currentTarget.content.value;

    if (newTitle.length === 0) {
      alert('제목을 입력해주세요.');
    } else if (newContent.length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      console.log(newTitle);
      console.log(newContent);

      navigate('/director/notice');
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <TitleMedium title="공지사항 수정" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth defaultValue={oldTitle} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} defaultValue={oldContent} />
          </Grid>
        </Grid>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button size="large" variant="outlined" sx={{ width: 100, mr: 2 }} onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit" size="large" variant="contained" sx={{ width: 120 }}>
            수정 완료
          </Button>
        </Box>
      </Box>
    </>
  );
}
