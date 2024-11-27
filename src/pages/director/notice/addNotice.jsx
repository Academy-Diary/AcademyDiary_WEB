import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { TextField, Box, Button, Grid, Container } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { TitleMedium, SubmitButtons } from '../../../components';
import { useNoticeAdd } from '../../../api/queries/notice/useNoticeCRUD';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function AddNotice() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [files, setFiles] = useState([]); // 첨부파일

  const addNoticeMutation = useNoticeAdd();

  const handleFileAdd = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const tmpImage = e.target.files[i];

      setFiles((prev) => [...prev, tmpImage]);
    }
  };
  const handleFileDelete = (file) => {
    const currentIdx = files.indexOf(file);
    const newFiles = [...files];
    newFiles.splice(currentIdx, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.currentTarget.title.value;
    const content = e.currentTarget.content.value;

    if (title.length === 0) {
      alert('제목을 입력해주세요.');
    } else if (content.length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      const splitNoticeId = state?.lastNoticeId.split('&');
      const newNoticeId = `${splitNoticeId[0]}&${splitNoticeId[1]}&${Number(splitNoticeId[2]) + 1}`;

      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      fd.append('notice_id', newNoticeId);
      files.forEach((f) => fd.append('file', f));

      addNoticeMutation.mutate(fd, {
        onSuccess: () => {
          alert('공지 생성 성공!');
          navigate('/director/notice');
        },
        onError: () => {
          alert('공지 생성 실패!');
        },
      });
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
              <VisuallyHiddenInput type="file" onChange={handleFileAdd} multiple />
            </Button>
            {files.map((file) => (
              <Container key={file.name}>
                {file.name} <Button onClick={() => handleFileDelete(file)}>삭제</Button>
              </Container>
            ))}
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="등록하기" />
      </Box>
    </>
  );
}
