import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Button } from '@mui/material';
import React from 'react';

const classes = [
  { name: '수학 집중반', fee: 270000, due: '2024.01.01~2024.01.31' },
  { name: '토익반', fee: 150000, due: '2024.01.01~2024.01.31' },
  { name: '국어 집중반', fee: 250000, due: '2024.01.01~2024.01.31' },
];

export default function MakeClass() {
  return (
    <>
      <Typography variant="h6" sx={{ pt: 2, pb: 3 }}>
        학원비 구성
      </Typography>
      <TableContainer component={Paper} sx={{ width: '70vw', maxHeight: '70vh', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>수강반 이름</TableCell>
              <TableCell align="right">기간</TableCell>
              <TableCell align="right">가격</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((c) => (
              <TableRow key={c.name}>
                <TableCell>{c.name}</TableCell>
                <TableCell align="right">{c.due}</TableCell>
                <TableCell align="right">{c.fee}</TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                      <Button variant="outlined">수정</Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button variant="contained">삭제</Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
