import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Grid, styled, TextField } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { SubmitButtons, TitleMedium } from '../../../components';

const VisuallyHiddenInput = styled('input')({ display: 'none' });

export default function TeacherAddNotice() {
  const navigate = useNavigate();
  const { courseid } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.currentTarget.title.value;
    const content = e.currentTarget.content.value;

    if (title.length === 0) alert('제목을 입력해주세요');
    else if (content.length === 0) alert('내용을 입력해주세요');
    else {
      console.log(title);
      console.log(content);

      navigate(`/teacher/class/${courseid}/notice`);
    }
  };

  return (
    <>
      <TitleMedium title="공지사항 작성" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mx: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} />
          </Grid>
          <Grid item xs={12}>
            <Button component="label" role={undefined} tabIndex={-1} startIcon={<AttachFile />}>
              파일첨부
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => console.log(e.target.files)} multiple />
            </Button>
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="등록하기" />
      </Box>
    </>
  );
}
