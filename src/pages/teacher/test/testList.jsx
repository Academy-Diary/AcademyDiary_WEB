import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Container, Grid, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { FilterAlt, Settings } from '@mui/icons-material';

import { AddButton, Title } from '../../../components';
import { useCategory } from '../../../api/queries/test/useCategory';
import { useUserAuthStore } from '../../../store';
import { useAddCategory } from '../../../api/queries/test/useAddCategory';
import { useDeleteCategory } from '../../../api/queries/test/useDeleteCategory';
import { useGetExamList } from '../../../api/queries/test/useGetExamList';

// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];

export default function TestList() {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const { user, lectures } = useUserAuthStore();
  const categoryT = useCategory(user.academy_id).data; // 서버로 부터 받아온 데이터 임시 저장 (type: Object)
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const lectureId = Number(courseid);
  const lecture = lectures.filter((n) => n.lecture_id === lectureId)[0];
  const { data: exams } = useGetExamList(lectureId);
  const examList = exams?.exams;

  const [category, setOriginCategory] = useState([]);
  const [unSelectCategory, setUnCategory] = useState(null); // 선택되지 않은 카테고리
  const [selectCategory, setCategory] = useState([]); // 선택 된 카테고리
  const [filterEl, setFilterEl] = useState(null); // 필터링 버튼 클릭시 메뉴 열리게
  const [settingEl, setSettingEl] = useState(null); // 설정 버튼 클릭 시 메뉴 열리게
  const [search, setSearch] = useState('');

  const newcategoryRef = useRef();
  useEffect(() => {
    if (categoryT && !unSelectCategory) {
      const originCategory = Object.values(categoryT); // Object타입을 Array타입으로 변경
      setOriginCategory([...originCategory]);
      setUnCategory(originCategory);
      console.log(...originCategory);
    }
  }, [categoryT, unSelectCategory]);

  // const tests = [
  //   { id: 1, name: '쪽지시험 3차', all: 100, avg: 46.2, stdev: 55.3, category: '단원평가', students: '20/50' },
  //   { id: 2, name: '6월말 정기평가', all: 100, avg: 60.2, stdev: 23.1, category: '중간고사', students: '50/50' },
  // ];

  const handleRowClick = (id, isQuiz) => {
    navigate(`/teacher/class/${lecture.lecture_id}/test/${id}`, { state: { info: exams.exams.filter((n) => n.exam_id === id)[0], quiz: isQuiz } });
  };

  const handleFilterClick = (e) => {
    setFilterEl(e.currentTarget);
  };
  const handleFilterUnClick = () => {
    setFilterEl(null);
  };
  const onClickFilter = (cat) => {
    if (selectCategory.length === 0) {
      // 선택된 값이 selectCategory에 존재하지 않을 때
      setCategory([...selectCategory, cat]);
      setUnCategory(unSelectCategory.filter((a) => a.exam_type_id !== cat.exam_type_id));
    } else {
      setCategory(selectCategory.filter((a) => a.exam_type_id !== cat.exam_type_id));
      setUnCategory([...unSelectCategory, cat]);
    }
  };
  function onDeleteFilter(cat) {
    // TODO: 삭제 api 연동
    deleteCategory.mutate({
      examTypeId: cat.exam_type_id,
      academyID: user.academy_id,
    });
    setOriginCategory(category.filter((a) => a.exam_type_id !== cat.exam_type_id));
    setUnCategory(unSelectCategory.filter((a) => a.exam_type_id !== cat.exam_type_id));
  }
  const onAddFilter = () => {
    const inputs = newcategoryRef.current.children[1].children[0];
    // TODO: 추가 api 연동 + 다시 서버에 요청
    addCategory.mutate(
      {
        academy_id: user.academy_id,
        exam_type_name: inputs.value,
      },
      {
        onSuccess: (data) => {
          const tempData = data.data.data;
          setOriginCategory([...category, { exam_type_id: tempData.exam_type_id, exam_type_name: tempData.exam_type_name }]);
          setUnCategory([...unSelectCategory, { exam_type_id: tempData.exam_type_id, exam_type_name: tempData.exam_type_name }]);
        },
      }
    );
    inputs.value = '';
  };

  const handleSettingClick = (e) => {
    setSettingEl(e.currentTarget);
  };
  const handleSettingUnClick = () => {
    setSettingEl(null);
  };

  if (categoryT) {
    return (
      <>
        <Title title={`${lecture.lecture_name}`} />
        <Typography align="left">수강생 {lecture.headcount}명</Typography>
        <TableContainer component={Paper} sx={{ padding: 3, maxHeight: '70vh', overflowY: 'auto' }}>
          <Container sx={{ display: 'flex' }}>
            <TextField label="시험 이름 검색" sx={{ mb: 1 }} onChange={(e) => setSearch(e.target.value)} />
            <IconButton onClick={handleFilterClick}>
              <FilterAlt fontSize="large" />
            </IconButton>
            <Menu anchorEl={filterEl} open={Boolean(filterEl)} onClose={handleFilterUnClick}>
              <Paper sx={{ padding: 2 }}>
                {category.map((cat) => {
                  const tmp = selectCategory.indexOf(cat, 0);
                  if (tmp === -1) {
                    return <Chip label={cat.exam_type_name} variant="outlined" onClick={() => onClickFilter(cat)} sx={{ mx: 1 }} />;
                  }
                  return <Chip label={cat.exam_type_name} onClick={() => onClickFilter(cat)} sx={{ mx: 1 }} />;
                })}
              </Paper>
            </Menu>
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
                <TableCell>최고점</TableCell>
                <TableCell>평균</TableCell>
                <TableCell>최저점</TableCell>
                <TableCell>시험유형</TableCell>
                <TableCell>응시자수/전체인원</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examList?.map((exam) => {
                if ((selectCategory.length !== 0 && exam.exam_type_id === selectCategory[0].exam_type_id) || (selectCategory.length === 0 && exam.exam_name.includes(search)) || search.length === 0) {
                  const categoryName = category.filter((e) => e.exam_type_id === exam.exam_type_id)[0]?.exam_type_name;
                  return (
                    <TableRow key={exam.exam_id} onClick={() => handleRowClick(exam.exam_id, categoryName === '퀴즈')}>
                      <TableCell>{exam.exam_name}</TableCell>
                      <TableCell>{exam.high_score}</TableCell>
                      <TableCell>{exam.average_score}</TableCell>
                      <TableCell>{exam.low_score}</TableCell>
                      <TableCell>
                        <Chip label={categoryName} />
                      </TableCell>
                      <TableCell>
                        {exam.headcount}/{lecture.headcount}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <AddButton title="시험생성" onClick={() => navigate(`/teacher/class/${lecture.lecture_id}/test/add`)} />
      </>
    );
  }
  return <>로딩중</>;
}
