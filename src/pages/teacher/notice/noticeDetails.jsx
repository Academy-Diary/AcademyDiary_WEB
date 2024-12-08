import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Grid, Typography, Paper, Link } from '@mui/material';
import { saveAs } from 'file-saver';

import { BottomTwoButtons, TitleMedium } from '../../../components';
import { useNoticeDetail } from '../../../api/queries/notice/useNoticeCRUD';

export default function TeacherNoticeDetails() {
  const { courseid, id: noticeId } = useParams();
  const navigate = useNavigate();

  const { data: notice, isStale, refetch } = useNoticeDetail(noticeId);
  console.log(isStale);

  const handleClickList = () => {
    navigate(`/teacher/class/${courseid}/notice`);
  };
  const handleClickUpdate = () => {
    navigate(`/teacher/class/${courseid}/notice/update/${noticeId}`);
  };
  const hadleFileDownload = (url, name) => {
    fetch(url, { method: 'get' })
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, name);
      });
  };

  return (
    <>
      <TitleMedium title="공지사항 상세" />
      <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
        <Grid item xs={6}>
          <Typography variant="body2">조회수: {notice?.notice.views}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align="right">
            날짜: {notice?.notice.updated_at.split('T')[0]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ minHeight: 50, padding: 2 }}>
            <Typography>{notice?.notice.title}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ height: 350, padding: 2, overflow: 'auto' }}>
            <Typography>
              {notice?.notice.content.split('\n').map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* 첨부파일 */}
          <Typography variant="h6">첨부파일</Typography>
          <Paper variant="outlined" sx={{ height: 100, padding: 2, overflow: 'auto' }}>
            {notice?.files.map((file) => (
              <Button variant="text" size="small" onClick={() => hadleFileDownload(file.url, file.name)}>
                {file.name}
              </Button>
            ))}
          </Paper>
        </Grid>
      </Grid>
      {/* 이 부분은 전체공지 상세조회일 때 */}
      {courseid === undefined ? (
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/teacher/notice');
            }}
            sx={{ backgroundColor: '#006336' }}
          >
            목록으로
          </Button>
        </Box>
      ) : (
        <BottomTwoButtons first="목록으로" second="수정하기" onClickFirst={handleClickList} onClickSecond={handleClickUpdate} />
      )}
    </>
  );
}
