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
import { useUserAuthStore } from '../../../store';
import { useClassList } from '../../../api/queries/tuitionFees/useClassList';
import { useMakeClass } from '../../../api/queries/tuitionFees/useMakeClass';

function DialogForm({ type, open, handleCloseFormDialog }) {
  const title = type === 'add' ? '수강반 추가' : '수강반 수정';

  const { user } = useUserAuthStore();
  const makeClassMutation = useMakeClass(user.academy_id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const submitData = {
      class_name: data.get('class_name'),
      expense: Number(data.get('expense')),
      duration: Number(data.get('duration')),
    };
    // console.log(submitData);

    if (type === 'add') {
      makeClassMutation.mutate(submitData, {
        onSuccess: () => {
          alert('수강반 추가 성공!');
          handleCloseFormDialog();
        },
        onError: () => {
          alert('수강반 추가 실패!');
        },
      });
    }
  };

  return (
    <Dialog component="form" open={open} onClose={handleCloseFormDialog} onSubmit={handleSubmit}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <TextField name="class_name" label="수강반 이름" required fullWidth sx={{ my: 2 }} />
        <TextField name="duration" label="기간 (일)" type="number" required fullWidth sx={{ mb: 2 }} />
        <TextField name="expense" label="가격" type="number" required fullWidth sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions sx={{ m: 3 }}>
        <Button variant="outlined" onClick={handleCloseFormDialog}>
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

  const { user } = useUserAuthStore();
  const { data: classes } = useClassList(user.academy_id);

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
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>수강반 이름</TableCell>
              <TableCell align="right">기간 (일)</TableCell>
              <TableCell align="right">가격</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {classes?.map((c) => (
              <TableRow key={c.class_id}>
                <TableCell>{c.class_name}</TableCell>
                <TableCell align="right">{c.duration}</TableCell>
                <TableCell align="right">{c.expense}</TableCell>
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
      <DialogForm type={dialogType} open={openFormDialog} handleCloseFormDialog={handleCloseFormDialog} />
      <Dialog open={openDeleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>해당 수강반을 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2, backgroundColor: 'lightgrey' }}>
            <DialogContentText>수강반 이름: {selected.class_name}</DialogContentText>
            <DialogContentText>기간 (일): {selected.duration}</DialogContentText>
            <DialogContentText>가격: {selected.expense}</DialogContentText>
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
