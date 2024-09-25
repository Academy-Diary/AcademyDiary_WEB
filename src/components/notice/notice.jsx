import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Menu, MenuItem, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

/**
 * 공지사항 컴포넌트
 * 수정 권한에 따라 수정, 삭제 버튼 노출
 *
 * @param {List} notices 공지 리스트
 * @param {boolean} editable 수정권한
 * @param {string} updateURL 공지 수정 url
 * @param {Function} handleClickDelete 삭제 함수
 */
function Notice({
  notices,
  editable = true,
  updateURL,
  handleClickDelete = (id) => {
    console.log('delete', id);
  },
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // anchorEl?.value == 공지 id
  const [open, setOpen] = useState(false);

  const handleClickMore = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    handleClose();
    navigate(`${updateURL}?id=${anchorEl?.value}`);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickDeleteFunc = (e) => {
    e.preventDefault();
    handleClose();
    handleClickDelete(anchorEl?.value);
    handleCloseDialog();
  };

  return (
    <>
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
                {!editable ? null : (
                  <TableCell align="right">
                    <IconButton onClick={handleClickMore} value={notice.id}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClickUpdate}>수정</MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(true);
          }}
        >
          삭제
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText color="black">해당 공지사항을 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleClickDeleteFunc}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Notice;
