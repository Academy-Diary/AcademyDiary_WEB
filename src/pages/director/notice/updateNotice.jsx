import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { TextField, Box, Grid, Button, Container } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { TitleMedium, SubmitButtons } from '../../../components';
import { useNoticeDetail, useNoticeUpdate } from '../../../api/queries/notice/useNoticeCRUD';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function UpdateNotice() {
  const navigate = useNavigate();
  const { id: noticeId } = useParams();

  const [files, setFiles] = useState([]); // 첨부 파일들
  const [deleteFiles, setDeleteFiles] = useState([]); // 삭제한 파일들 (파일명)
  const [addFiles, setAddFiles] = useState([]); // 새로 추가한 파일들

  const { data: noticeData } = useNoticeDetail(noticeId);
  const updateNoticeMutation = useNoticeUpdate();

  useEffect(() => {
    // 기존 첨부파일
    if (noticeData) {
      setFiles(noticeData.files);
    }
  }, [noticeData]);

  const handleFileAdd = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const tmpImage = e.target.files[i];

      setFiles((prev) => [...prev, tmpImage]);
      setAddFiles((prev) => [...prev, tmpImage]);
    }
  };
  const handleFileDelete = (name) => {
    setDeleteFiles([...deleteFiles, name]);
    setAddFiles(addFiles.filter((n) => n.name !== name));
    setFiles(files.filter((n) => n.name !== name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = e.currentTarget.title.value;
    const newContent = e.currentTarget.content.value;

    if (newTitle.length === 0) {
      alert('제목을 입력해주세요.');
    } else if (newContent.length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      const fd = new FormData();
      fd.append('title', newTitle);
      fd.append('content', newContent);
      fd.append('files_deleted', deleteFiles.join(','));
      addFiles.forEach((f) => fd.append('file', f));

      updateNoticeMutation.mutate(
        {
          noticeId,
          body: fd,
        },
        {
          onSuccess: () => {
            alert('공지 수정 성공!');
            navigate('/director/notice');
          },
          onError: () => {
            alert('공지 수정 실패!');
          },
        }
      );
    }
  };

  return (
    <>
      <TitleMedium title="공지사항 수정" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth defaultValue={noticeData?.notice.title} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} defaultValue={noticeData?.notice.content} />
          </Grid>
          <Grid item xs={12}>
            <Button component="label" role={undefined} tabIndex={-1} startIcon={<AttachFile />}>
              파일 첨부
              <VisuallyHiddenInput type="file" onChange={handleFileAdd} multiple />
            </Button>
            {files.map((file) => (
              <Container key={file.name}>
                {file.name} <Button onClick={() => handleFileDelete(file.name)}>삭제</Button>
              </Container>
            ))}
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="수정 완료" />
      </Box>
    </>
  );
}
