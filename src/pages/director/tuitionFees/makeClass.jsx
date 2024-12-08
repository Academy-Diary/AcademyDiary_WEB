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
  Typography,
} from '@mui/material';

import { TitleMedium, AddButton } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useClassList } from '../../../api/queries/tuitionFees/useClassList';
import { useMakeClass } from '../../../api/queries/tuitionFees/useMakeClass';
import { useUpdateClass } from '../../../api/queries/tuitionFees/useUpdateClass';
import { useDeleteClass } from '../../../api/queries/tuitionFees/useDeleteClass';
import Colors from '../../../styles/colors';

function DialogForm({ type, open, handleCloseFormDialog, selected }) {
  const title = type === 'add' ? '수강반 추가' : '수강반 수정';

  const { user } = useUserAuthStore();
  const { refetch } = useClassList(user.academy_id);
  const makeClassMutation = useMakeClass(user.academy_id);
  const updateClassMutation = useUpdateClass(user.academy_id, selected.class_id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (type === 'add') {
      const submitData = {
        class_name: data.get('class_name'),
        expense: Number(data.get('expense')),
        duration: Number(data.get('duration')),
      };
      // console.log(submitData);

      makeClassMutation.mutate(submitData, {
        onSuccess: () => {
          refetch();
          alert('수강반 추가 성공!');
          handleCloseFormDialog();
        },
        onError: () => {
          alert('수강반 추가 실패!');
        },
      });
    } else if (type === 'update') {
      const submitData = {
        updateName: data.get('class_name'),
        updateExpense: Number(data.get('expense')),
        updateDuration: Number(data.get('duration')),
      };
      // console.log(submitData);

      updateClassMutation.mutate(submitData, {
        onSuccess: () => {
          refetch();
          alert('수강반 수정 성공!');
          handleCloseFormDialog();
        },
        onError: () => {
          alert('수강반 수정 실패!');
        },
      });
    }
  };

  return (
    <Dialog component="form" open={open} onClose={handleCloseFormDialog} onSubmit={handleSubmit}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField name="class_name" label="수강반 이름" defaultValue={type === 'update' ? selected.class_name : null} required fullWidth sx={{ my: 2 }} />
        <TextField name="duration" label="기간 (일)" type="number" defaultValue={type === 'update' ? selected.duration : null} required fullWidth sx={{ mb: 2 }} />
        <TextField name="expense" label="가격" type="number" defaultValue={type === 'update' ? selected.expense : null} required fullWidth sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
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

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selected, setSelected] = useState('');

  const { user } = useUserAuthStore();
  const { data: classes, isSuccess, refetch } = useClassList(user.academy_id);
  const deleteClassMutation = useDeleteClass(user.academy_id, selected.class_id);

  const handleOpenFormDialog = (type, _class) => {
    setOpenFormDialog(true);
    setDialogType(type);
    if (type === 'update') setSelected(_class);
  };
  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // 수강반 삭제 핸들러
  const handleClickDelete = (_class) => {
    setOpenDeleteDialog(true);
    setSelected(_class);
  };
  const handleDelete = () => {
    deleteClassMutation.mutate('', {
      onSuccess: () => {
        refetch();
        alert('수강반 삭제 성공!');
        handleCloseDeleteDialog();
      },
      onError: () => {
        alert('수강반 삭제 실패!');
      },
    });
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
              <TableCell align="right">가격 (원)</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess
              ? classes.map((c) => (
                  <TableRow key={c.class_id}>
                    <TableCell>{c.class_name}</TableCell>
                    <TableCell align="right">{c.duration}</TableCell>
                    <TableCell align="right">{c.expense.toLocaleString()}</TableCell>
                    <TableCell sx={{ width: '25%' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                          <Button variant="outlined" onClick={() => handleOpenFormDialog('update', c)}>
                            수정
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button variant="contained" onClick={() => handleClickDelete(c)}>
                            삭제
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton title="수강반 추가" onClick={() => handleOpenFormDialog('add')} />
      <DialogForm type={dialogType} open={openFormDialog} handleCloseFormDialog={handleCloseFormDialog} selected={selected} />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>
          <Typography variant="h6">해당 수강반을 삭제하시겠습니까?</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: 400, my: 1, p: 2, backgroundColor: Colors.LightGrey, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>수강반 이름: {selected.class_name}</Typography>
            <Typography>기간: {selected.duration}일</Typography>
            <Typography>가격: {selected.expense?.toLocaleString()}원</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>
            취소
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
