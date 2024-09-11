import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Grid, Paper, Typography } from '@mui/material';

import { TitleMedium, BottomTwoButtons } from '../../../components';

const noticeList = [
  {
    id: 1,
    title: '8월 정기고사 안내',
    content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...',
    date: '2024-07-20',
    view: 55,
  },
  {
    id: 2,
    title: '7월 정기고사 안내',
    content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...',
    date: '2024-06-18',
    view: 101,
  },
  { id: 3, title: '6월 정기고사 안내', content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...', date: '2024-05-21', view: 129 },
  { id: 4, title: '5월 정기고사 안내', content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...', date: '2024-04-21', view: 129 },
  { id: 5, title: '4월 정기고사 안내', content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...', date: '2024-03-21', view: 129 },
  { id: 6, title: '3월 정기고사 안내', content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...', date: '2024-02-29', view: 201 },
];

export default function NoticeDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const noticeId = Number(params.id);
  const notice = noticeList.filter((n) => n.id === noticeId)[0];

  const handleClickBefore = () => {
    navigate('/director/notice');
  };
  const handleClickUpdate = () => {
    navigate('/director/notice/update');
  };

  return (
    <>
      <TitleMedium title="공지사항 상세" />
      <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
        <Grid item xs={6}>
          <Typography variant="body2">조회수: {notice.view}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align="right">
            날짜: {notice.date}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ minHeight: 50, padding: 2 }}>
            <Typography>{notice.title}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ height: 350, padding: 2, overflow: 'auto' }}>
            <Typography>{notice.content}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <BottomTwoButtons first="목록으로" second="수정하기" onClickFirst={handleClickBefore} onClickSecond={handleClickUpdate} />
    </>
  );
}
