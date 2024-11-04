import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Container, Grid, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { FilterAlt, Settings } from '@mui/icons-material';

import { AddButton, Title } from '../../../components';
import { useCategory } from '../../../api/queries/test/useCategory';
import { useUserAuthStore } from '../../../store';

const courses = [
  { id: 1, name: '미적분', students: 60 },
  { id: 2, name: '확률과통계', students: 30 },
  { id: 3, name: '영어', students: 20 },
  { id: 4, name: '국어', students: 55 },
];

export default function TestList() {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const { user } = useUserAuthStore();
  const categoryT = useCategory(user.academy_id).data; // 서버로 부터 받아온 데이터 임시 저장 (type: Object)

  const courseID = Number(courseid);
  const course = courses.filter((n) => n.id === courseID)[0];

  const [unSelectCategory, setUnCategory] = useState(categoryT); // 선택되지 않은 카테고리
  const [selectCategory, setCategory] = useState([]); // 선택 된 카테고리
  const [filterEl, setFilterEl] = useState(null); // 필터링 버튼 클릭시 메뉴 열리게
  const [settingEl, setSettingEl] = useState(null); // 설정 버튼 클릭 시 메뉴 열리게

  const newcategoryRef = useRef();

  const tests = [
    { id: 1, name: '쪽지시험 3차', all: 100, avg: 46.2, stdev: 55.3, category: '단원평가', students: '20/50' },
    { id: 2, name: '6월말 정기평가', all: 100, avg: 60.2, stdev: 23.1, category: '중간고사', students: '50/50' },
  ];

  const handleRowClick = (id) => {
    navigate(`/teacher/class/${course.id}/test/${id}`);
  };

  const handleFilterClick = (e) => {
    setFilterEl(e.currentTarget);
  };
  const handleFilterUnClick = () => {
    setFilterEl(null);
  };
  const onClickFilter = (e) => {
    const isCategory = selectCategory.indexOf(e.currentTarget.innerText, 0);

    if (isCategory === -1) {
      // 선택된 값이 selectCategory에 존재하지 않을 때
      setCategory([...selectCategory, e.currentTarget.innerText]);
      setUnCategory(unSelectCategory.filter((a) => a !== e.currentTarget.innerText));
    } else {
      setCategory(selectCategory.filter((a) => a !== e.currentTarget.innerText));
      setUnCategory([...unSelectCategory, e.currentTarget.innerText]);
    }
  };
  function onDeleteFilter(cat) {
    // TODO: 삭제 api 연동
  }
  const onAddFilter = () => {
    const inputs = newcategoryRef.current.children[1].children[0];
    // TODO: 추가 api 연동 + 다시 서버에 요청
    inputs.value = '';
  };

  const handleSettingClick = (e) => {
    setSettingEl(e.currentTarget);
  };
  const handleSettingUnClick = () => {
    setSettingEl(null);
  };

  if (categoryT) {
    const category = Object.values(categoryT); // Object타입을 Array타입으로 변경
    console.log(selectCategory);
    return (
      <>
        <Title title={`${course.name}`} />
        <Typography align="left">수강생 {course.students}명</Typography>
        <TableContainer component={Paper} sx={{ padding: 3 }}>
          <Container sx={{ display: 'flex' }}>
            <TextField label="Search" sx={{ mb: 1 }} />
            <IconButton onClick={handleFilterClick}>
              <FilterAlt fontSize="large" />
            </IconButton>
            <Menu anchorEl={filterEl} open={Boolean(filterEl)} onClose={handleFilterUnClick}>
              <Paper sx={{ padding: 2 }}>
                {category.map((cat) => {
                  const tmp = selectCategory.indexOf(cat.exam_type_name, 0);
                  if (tmp === -1) {
                    return <Chip label={cat.exam_type_name} variant="outlined" onClick={onClickFilter} sx={{ mx: 1 }} />;
                  }
                  return <Chip label={cat.exam_type_name} onClick={onClickFilter} sx={{ mx: 1 }} />;
                })}
              </Paper>
            </Menu>
            <Button variant="contained" size="large" sx={{ my: 'auto' }}>
              검색
            </Button>
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleSettingClick}>
              <Settings fontSize="large" />
            </IconButton>
            <Menu anchorEl={settingEl} open={Boolean(settingEl)} onClose={handleSettingUnClick}>
              <Paper sx={{ padding: 1 }}>
                <TextField label="value" sx={{ mb: 1, mr: 1 }} ref={newcategoryRef} />
                <Button variant="outlined" size="large" onClick={onAddFilter}>
                  + 추가하기
                </Button>
                <Grid>
                  {category.map((cat) => (
                    <Chip
                      label={cat.exam_type_name}
                      variant="outlined"
                      sx={{ mx: 1 }}
                      onDelete={() => {
                        onDeleteFilter(cat);
                      }}
                    />
                  ))}
                </Grid>
              </Paper>
            </Menu>
          </Container>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>시험 이름</TableCell>
                <TableCell>총점</TableCell>
                <TableCell>평균</TableCell>
                <TableCell>표준편차</TableCell>
                <TableCell>시험유형</TableCell>
                <TableCell>응시자수/전체인원</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id} onClick={() => handleRowClick(test.id)}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.all}</TableCell>
                  <TableCell>{test.avg}</TableCell>
                  <TableCell>{test.stdev}</TableCell>
                  <TableCell>
                    <Chip label={test.category} />
                  </TableCell>
                  <TableCell>{test.students}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddButton title="시험생성" onClick={() => navigate(`/teacher/class/${course.id}/test/add`)} />
      </>
    );
  }
  return <>로딩중</>;
}
