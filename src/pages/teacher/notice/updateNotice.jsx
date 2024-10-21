import React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, styled, TextField } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { SubmitButtons, TitleMedium } from '../../../components';

// 테스트 데이터
const oldTitle = '8월 정기고사 안내';
const oldContent = '안녕하세요. \n1학기 마지막 정기고사 안내입니다. \n...';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function TeacherUpdateNotice() {
  const navigate = useNavigate();
  const { courseid } = useParams();

  // ? 뒤의 쿼리 파라미터 읽어오기.
  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search);
  const id = queryParameter.get('id');

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
      <TitleMedium title="공지사항 수정" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth defaultValue={oldTitle} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} defaultValue={oldContent} />
          </Grid>
          <Grid item xs={12}>
            <Button component="label" role={undefined} tabIndex={-1} startIcon={<AttachFile />}>
              파일 첨부
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => console.log(e.target.files)} multiple />
            </Button>
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="수정 완료" />
      </Box>
    </>
  );
}
