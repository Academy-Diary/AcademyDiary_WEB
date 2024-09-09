import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Grid, Button } from '@mui/material';
import { MoreVert, Add } from '@mui/icons-material';

import { TitleMedium } from '../../../components';

const notices = [
  { title: '8월 정기고사 안내', date: '2024-07-20', view: 55 },
  { title: '7월 정기고사 안내', date: '2024-06-18', view: 101 },
  { title: '6월 정기고사 안내', date: '2024-05-21', view: 129 },
  { title: '5월 정기고사 안내', date: '2024-04-21', view: 129 },
  { title: '4월 정기고사 안내', date: '2024-03-21', view: 129 },
  { title: '3월 정기고사 안내', date: '2024-02-29', view: 201 },
];

export default function DirectorNotice() {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate('/director/notice/add');
  };

  return (
    <>
      <TitleMedium title="전체 공지사항" />
      <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '60vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell align="right">올린 날짜</TableCell>
              <TableCell align="right">조회수</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={`${notice.title}_${notice.date}`}>
                <TableCell>{notice.title}</TableCell>
                <TableCell align="right">{notice.date}</TableCell>
                <TableCell align="right">{notice.view}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
        <Grid item>
          <Button size="large" variant="contained" startIcon={<Add />} onClick={handleClickAdd}>
            새 공지사항 등록
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
