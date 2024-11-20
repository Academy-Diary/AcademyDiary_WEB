import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, styled, TextField } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { SubmitButtons, TitleMedium } from '../../../components';
import { useNoticeDetail, useNoticeUpdate } from '../../../api/queries/notice/useNoticeCRUD';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function TeacherUpdateNotice() {
  const navigate = useNavigate();
  const { courseid, id: noticeId } = useParams();

  // 아이디에 맞는 게시글 읽어오기
  const { data: notice } = useNoticeDetail(noticeId);
  // 파일 수정하기
  const noticeUpdate = useNoticeUpdate();

  const [deleteFiles, setDeleteFiles] = useState([]); // 삭제한 파일 들
  const [addFiles, setAddFiles] = useState([]); // 새로 추가한 파일
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (notice) {
      setFiles([...notice.files]);
    }
  }, [notice]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const vtitle = e.currentTarget.title.value; // value Title
    const vcontent = e.currentTarget.content.value; // value Content

    const fd = new FormData();
    fd.append('title', vtitle);
    fd.append('content', vcontent);
    fd.append('files_deleted', deleteFiles.join(','));

    addFiles.forEach((f) => fd.append('file', f));

    if (vtitle.length === 0) alert('제목을 입력해주세요');
    else if (vcontent.length === 0) alert('내용을 입력해주세요');
    else {
      noticeUpdate.mutate(
        { noticeId, body: fd },
        {
          onSuccess: () => {
            navigate(`/teacher/class/${courseid}/notice`);
          },
        }
      );
    }
  };

  const handleFileDelete = (name) => {
    setDeleteFiles([...deleteFiles, name]);
    setAddFiles(addFiles.filter((n) => n.name !== name));
    setFiles(files.filter((n) => n.name !== name));
  };

  const handleFileAdd = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const tmpImage = e.target.files[i];

      setAddFiles((prev) => [...prev, tmpImage]);
      setFiles((prev) => [...prev, { name: tmpImage.name, url: '' }]);
    }
  };

  return (
    <>
      <TitleMedium title="공지사항 수정" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth defaultValue={notice?.notice.title} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} defaultValue={notice?.notice.content} />
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
