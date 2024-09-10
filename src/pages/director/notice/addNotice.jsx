import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { TextField, Box, Button, Grid } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { TitleMedium, SubmitButtons } from '../../../components';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

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
          <Grid item xs={12}>
            <Button component="label" role={undefined} tabIndex={-1} startIcon={<AttachFile />}>
              파일 첨부
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => console.log(e.target.files)} multiple />
            </Button>
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="등록하기" />
      </Box>
    </>
  );
}
