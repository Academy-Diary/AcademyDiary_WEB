import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Container, Grid, styled, TextField } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { SubmitButtons, TitleMedium } from '../../../components';
import { useNoticeAdd } from '../../../api/queries/notice/useNoticeCRUD';

const VisuallyHiddenInput = styled('input')({ display: 'none' });

export default function TeacherAddNotice() {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const addNotice = useNoticeAdd();
  const { state } = useLocation();

  const [files, setFiles] = useState([]); // 첨부파일

  const handleFileAdd = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const tmpImage = e.target.files[i];

      setFiles((prev) => [...prev, tmpImage]);
    }
  };
  const handleFileDelete = (name) => {
    setFiles(files.filter((n) => n.name !== name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.currentTarget.title.value;
    const content = e.currentTarget.content.value;

    if (title.length === 0) alert('제목을 입력해주세요');
    else if (content.length === 0) alert('내용을 입력해주세요');
    else {
      const splitNoticeId = state?.noticeId.split('&');
      const newNoticeId = `${splitNoticeId[0]}&${splitNoticeId[1]}&${Number(splitNoticeId[2]) + 1}`;

      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      fd.append('notice_id', newNoticeId);
      files.forEach((f) => fd.append('file', f));

      addNotice.mutate(fd, {
        onSuccess: () => {
          navigate(`/teacher/class/${courseid}/notice`);
        },
      });
    }
  };

  return (
    <>
      <TitleMedium title="공지사항 작성" />
      <Box component="form" onSubmit={handleSubmit}>
        <VisuallyHiddenInput type="text" name="newid" defaultValue={state?.noticeId} />
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
              <VisuallyHiddenInput type="file" onChange={handleFileAdd} multiple />
            </Button>
            {files.map((file) => (
              <Container key={file.name}>
                {file.name} <Button onClick={() => handleFileDelete(file.name)}>삭제</Button>
              </Container>
            ))}
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="등록하기" />
      </Box>
    </>
  );
}
