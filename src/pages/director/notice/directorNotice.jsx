import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { MoreVert, Add } from '@mui/icons-material';

import { TitleMedium } from '../../../components';

const notices = [
  { id: 1, title: '8월 정기고사 안내', date: '2024-07-20', view: 55 },
  { id: 2, title: '7월 정기고사 안내', date: '2024-06-18', view: 101 },
  { id: 3, title: '6월 정기고사 안내', date: '2024-05-21', view: 129 },
  { id: 4, title: '5월 정기고사 안내', date: '2024-04-21', view: 129 },
  { id: 5, title: '4월 정기고사 안내', date: '2024-03-21', view: 129 },
  { id: 6, title: '3월 정기고사 안내', date: '2024-02-29', view: 201 },
];

export default function DirectorNotice() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickAdd = () => {
    navigate('/director/notice/add');
  };

  const handleClickMore = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    handleClose();
    navigate('/director/notice/update');
  };
  const handleClickDelete = () => {
    handleClose();
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <TitleMedium title="전체 공지사항" />
      <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '60vh', width: '70vw' }}>
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
                <TableCell>
                  <Link to={`/director/notice/${notice.id}`}>{notice.title}</Link>
                </TableCell>
                <TableCell align="right">{notice.date}</TableCell>
                <TableCell align="right">{notice.view}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleClickMore}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClickUpdate}>수정</MenuItem>
        <MenuItem onClick={handleClickDelete}>삭제</MenuItem>
      </Menu>
      <Grid container justifyContent="flex-end" sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
        <Grid item>
          <Button size="large" variant="contained" startIcon={<Add />} onClick={handleClickAdd}>
            새 공지사항 등록
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText color="black">해당 공지사항을 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleCloseDialog}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
