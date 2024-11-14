import { Bar, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Container, Grid, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];
const data = [
  { name: '3월 모의고사', score: '88' },
  { name: '6월 모의고사', score: '70' },
  { name: '9월 모의고사', score: '85' },
];
const normalDis = [
  { scores: '0~10', students: '3' },
  { scores: '11~20', students: '10' },
  { scores: '21~30', students: '20' },
  { scores: '31~40', students: '31' },
  { scores: '41~50', students: '51' },
  { scores: '51~60', students: '50' },
  { scores: '61~70', students: '31', stu: '50' },
  { scores: '71~80', students: '20' },
  { scores: '81~90', students: '10' },
  { scores: '91~100', students: '3' },
];
const categories = ['모의고사', '단어시험', '단원평가'];
const tests = ['모의고사1', '모의고사2', '모의고사3'];
const rows = [
  { name: '김대성', first: '89', second: '70', third: '85' },
  { name: '김민수', first: '78', second: '58', third: '90' },
  { name: '김선우', first: '89', second: '100', third: '66' },
  { name: '권해담', first: '100', second: '90', third: '86' },
  { name: '이태윤', first: '90', second: '78', third: '85' },
  { name: '서민석', first: '76', second: '75', third: '85' },
];

export default function ScoreGraph() {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const { user, lectures } = useUserAuthStore();

  const courseID = Number(courseid);
  const lecture = lectures.filter((n) => n.lecture_id === courseID)[0];

  return (
    <Container sx={{ maxHeight: '90vh', overflowY: 'scroll' }}>
      <Title title={lecture.lecture_name} />
      <Typography>수강생 {lecture.headcount}명</Typography>
      <Grid container sx={{ margin: '0 auto' }}>
        <Grid item md={6}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              성적 추이
            </Typography>
            <Grid container sx={{ justifyContent: 'center' }}>
              <LineChart width={500} height={400} data={data}>
                <Line type="monotone" dataKey="score" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </Grid>
            <Grid container sx={{ justifyContent: 'center' }}>
              <TextField select defaultValue={categories[0]} sx={{ width: '150px', mr: '30px' }} label="examType">
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Stack>
        </Grid>

        <Grid item md={6}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              성적분포
            </Typography>
            <Grid container sx={{ justifyContent: 'center' }}>
              <ComposedChart width={500} height={400} data={normalDis}>
                <Line name="학생 성적 분포" type="monotone" dataKey="students" stroke="#8884d8" />
                <Bar name="학생 성적" dataKey="stu" fill="#FF3B30" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="scores" />
                <Legend />
                <YAxis />
              </ComposedChart>
            </Grid>
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <TextField select defaultValue={categories[0]} sx={{ width: '150px', mr: '30px' }} label="examType">
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField select defaultValue={tests[0]} sx={{ width: '150px' }} label="exam">
                {tests.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <TableContainer component={Grid}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> </TableCell>
                    <TableCell>최고</TableCell>
                    <TableCell>최저</TableCell>
                    <TableCell>평균</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>전체수강생</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>70</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
        <Grid item md={12}>
          <Stack spacing={2}>
            <TextField label="Search" sx={{ width: '360px', margin: '20px' }} />
            <TableContainer component={Grid}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>모의고사1</TableCell>
                    <TableCell>모의고사2</TableCell>
                    <TableCell>모의고사3</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.first}</TableCell>
                      <TableCell>{row.second}</TableCell>
                      <TableCell>{row.third}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
