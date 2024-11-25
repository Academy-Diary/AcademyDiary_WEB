import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

import { Grid, Paper, Typography, Button } from '@mui/material';

import { TitleMedium, BottomTwoButtons } from '../../../components';
import { useNoticeDetail } from '../../../api/queries/notice/useNoticeCRUD';

// const data = {
//   notice: {
//     notice_id: 'test_academy2&0&5',
//     notice_num: 5,
//     lecture_id: 0,
//     title: '코로나19로 인한 학원 운영 방침',
//     content: '코로나19로 인한 운영 방침 안내',
//     user_id: 'test_chief',
//     views: 0,
//     created_at: '2021-08-30',
//     updated_at: '2021-08-30',
//   },
//   files: [
//     {
//       url: 'String',
//       name: '코로나.jpg',
//     },
//   ],
// };

export default function NoticeDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const noticeId = params.id;
  const { data } = useNoticeDetail(noticeId);

  const handleClickBefore = () => {
    navigate('/director/notice');
  };
  const handleClickUpdate = () => {
    navigate(`/director/notice/update/${noticeId}`);
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
          <Typography variant="body2">조회수: {data?.notice.views}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align="right">
            날짜: {data?.notice.created_at.split('T')[0]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ minHeight: 50, padding: 2 }}>
            <Typography>{data?.notice.title}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ height: 350, padding: 2, overflow: 'auto' }}>
            <Typography>{data?.notice.content}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography>첨부파일</Typography>
          <Paper variant="outlined" sx={{ height: 100, padding: 2, overflow: 'auto' }}>
            {data?.files.map((file) => (
              <Button variant="text" size="small" onClick={() => hadleFileDownload(file.url, file.name)}>
                {file.name}
              </Button>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <BottomTwoButtons first="목록으로" second="수정하기" onClickFirst={handleClickBefore} onClickSecond={handleClickUpdate} />
    </>
  );
}
