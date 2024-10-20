import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

/**
 * 첫번째 버튼은 취소, 두 번째 버튼은 사용자 지정 행위를 하는 다이얼로그
 * @param {String} second - 두 번째 버튼에 넣을 텍스트
 */

export default function TwoButtonDialog({ openDialog, handleClose, text, second, handleClickSecond }) {
  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogContent>
        <DialogContentText color="black">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleClickSecond}>{second}</Button>
      </DialogActions>
    </Dialog>
  );
}
