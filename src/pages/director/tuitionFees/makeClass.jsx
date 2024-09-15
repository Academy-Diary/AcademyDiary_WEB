import React, { useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { TitleMedium, AddButton } from '../../../components';

const classes = [
  { name: '수학 집중반', fee: 270000, period: '30' },
  { name: '토익반', fee: 150000, period: '60' },
  { name: '국어 집중반', fee: 250000, period: '30' },
];

function DialogForm({ type, open, onClose }) {
  const title = type === 'add' ? '수강반 추가' : '수강반 수정';

  return (
    <Dialog component="form" open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <TextField label="수강반 이름" required fullWidth sx={{ mb: 2 }} />
        <TextField label="기간 (일)" type="number" required fullWidth sx={{ mb: 2 }} />
        <TextField label="가격" type="number" required fullWidth sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions sx={{ m: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" variant="contained">
          완료
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function MakeClass() {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add');

  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [selected, setSelected] = useState('');

  const handleOpenFormDialog = (type) => {
    setOpenFormDialog(true);
    setDialogType(type);
  };
  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  // 수강반 삭제 핸들러
  const handleDelete = (_class) => {
    setDeleteDialog(true);
    setSelected(_class);
  };

  return (
    <>
      <TitleMedium title="학원비 구성" />
      <TableContainer component={Paper} sx={{ width: '70vw', maxHeight: '70vh', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>수강반 이름</TableCell>
              <TableCell align="right">기간 (일)</TableCell>
              <TableCell align="right">가격</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((c) => (
              <TableRow key={c.name}>
                <TableCell>{c.name}</TableCell>
                <TableCell align="right">{c.period}</TableCell>
                <TableCell align="right">{c.fee}</TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                      <Button variant="outlined" onClick={() => handleOpenFormDialog('update')}>
                        수정
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button variant="contained" onClick={() => handleDelete(c)}>
                        삭제
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton title="수강반 추가" onClick={() => handleOpenFormDialog('add')} />
      <DialogForm type={dialogType} open={openFormDialog} onClose={handleCloseFormDialog} />
      <Dialog open={openDeleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>해당 수강반을 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
            <DialogContentText>수강반 이름: {selected.name}</DialogContentText>
            <DialogContentText>기간 (일): {selected.period}</DialogContentText>
            <DialogContentText>가격: {selected.fee}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>취소</Button>
          <Button onClick={() => setDeleteDialog(false)}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
