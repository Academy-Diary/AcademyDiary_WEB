import React, { useEffect, useState } from 'react';

import {
  Typography,
  Box,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TitleMedium } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useClassList } from '../../../api/queries/tuitionFees/useClassList';
import { useLectureList } from '../../../api/queries/lectures/useLectureList';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';
import { useMakeBill } from '../../../api/queries/tuitionFees/useMakeBill';

// const students = [
//   {
//     "user_id": "test_student",
//     "user_name": "춘향이",
//     "phone_number": "010-1234-5678",
//     "parent": {
//       "user_name": "홍길동",
//       "phone_number": "010-1111-2222"
//     }
//   },
// ];

// const classes = [
//   {
//     academy_id: 'test_academy',
//     class_id: 1,
//     class_name: '이과 집중반',
//     discount: 50000,
//     duration: 30,
//     expense: 300000,
//   },
// ];

// 총 청구 비용 계산
const getTotalFee = (fees) => fees.reduce((acc, cur) => acc + cur, 0);

export default function ClaimFee() {
  // 학생 선택
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const { user } = useUserAuthStore();
  const { data: lectures } = useLectureList();
  const { data: classes } = useClassList(user.academy_id);
  const makeBillMutation = useMakeBill();

  const handleChangeSelect = (e) => {
    setSelectedLectureId(e.target.value);
  };
  const handleChangeToggle = (e, newList) => {
    setSelectedClasses(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenPreview(true);
  };
  const handleClaim = () => {
    const submitData = {
      user_id: selectedStudents.map((s) => s.user_id),
      class_id: selectedClasses.map((c) => c.class_id),
      deadline: dueDate.format('YYYY-MM-DD'),
    };
    // console.log(submitData);

    makeBillMutation.mutate(submitData, {
      onSuccess: () => {
        alert('학원비 청구 성공!');
        setOpenPreview(false);
      },
      onError: () => {
        alert('학원비 청구 실패!');
      },
    });
  };

  return (
    <>
      <TitleMedium title="학원비 청구" />
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            학생 선택
            <IconButton onClick={() => setOpenSelect(true)}>
              <OpenInNew />
            </IconButton>
            <Typography>{selectedStudents.map((s, idx) => `${s.user_name}(${s.phone_number.slice(9)})${idx < selectedStudents.length - 1 ? ', ' : ''}`)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>수강반 선택</Typography>
            <ToggleButtonGroup value={selectedClasses} onChange={handleChangeToggle} sx={{ mt: 3 }}>
              {classes?.map((c) => (
                <ToggleButton key={c.class_id} value={c}>
                  {c.class_name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography>납부 기한</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ mt: 2, maxWidth: 200 }}>
                <DatePicker value={dueDate} onChange={(newDate) => setDueDate(newDate)} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box sx={{ position: 'fixed', left: '3vw', bottom: '5vh' }}>
          <Typography variant="h6">{`총 청구 비용: ${getTotalFee(selectedClasses.map((c) => c.expense))} ₩`}</Typography>
        </Box>
        <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
          <Button type="submit" size="large" variant="contained">
            청구하기
          </Button>
        </Box>
        <Dialog open={openSelect} onClose={() => setOpenSelect(false)} maxWidth="sm" fullWidth>
          <DialogTitle>학생 선택</DialogTitle>
          <DialogContent>
            <FormControl sx={{ mt: 2, minWidth: 200 }}>
              <InputLabel>강의 선택</InputLabel>
              <Select label="강의 선택" value={selectedLectureId} onChange={handleChangeSelect}>
                {lectures?.map((lecture) => (
                  <MenuItem key={lecture.lecture_id} value={lecture.lecture_id}>
                    {`${lecture.lecture_name}(${lecture.teacher_name})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedLectureId !== '' && <AttendeesTable lectureId={selectedLectureId} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} />}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpenSelect(false)}>
              선택 완료
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="sm" fullWidth>
          <DialogTitle>청구서 미리보기</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography>청구 대상</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{selectedStudents.map((s, idx) => `${s.user_name}(${s.phone_number.slice(9)})${idx < selectedStudents.length - 1 ? ', ' : ''}`)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid black', padding: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography>수강반</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{selectedClasses.map((c, idx) => (idx < selectedClasses.length - 1 ? `${c.class_name}(${c.expense}), ` : `${c.class_name}(${c.expense})`))}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>총 청구 비용</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{getTotalFee(selectedClasses.map((c) => c.expense))}₩</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>납부 기한</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{dueDate?.format('~YYYY.MM.DD').toString()}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpenPreview(false)}>
              취소
            </Button>
            <Button variant="contained" onClick={handleClaim}>
              전송하기
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

function AttendeesTable({ lectureId, selectedStudents, setSelectedStudents }) {
  const { data: attendees } = useAttendeeList(lectureId);
  const [allChecked, setAllChecked] = useState(false);

  // selectedStudents에 user_id가 동일한 학생이 있는지 확인하는 함수
  const hasStudent = (student) => selectedStudents.filter((s) => s.user_id === student.user_id).length > 0;

  // 전체 선택 여부 업데이트
  useEffect(() => {
    if (attendees) {
      const selectedIds = selectedStudents.map((s) => s.user_id);
      const checked = attendees.filter((att) => selectedIds.includes(att.user_id));

      if (checked.length === attendees.length) setAllChecked(true);
      else setAllChecked(false);
    }
  }, [attendees, selectedStudents]);

  const handleCheckAll = () => {
    let newChecked = [...selectedStudents];

    if (allChecked) {
      // 전체 해제
      attendees.forEach((att) => {
        if (hasStudent(att)) newChecked = newChecked.filter((s) => s.user_id !== att.user_id);
      });
    } else {
      // 전체 선택
      attendees.forEach((att) => {
        if (!hasStudent(att)) newChecked.push(att);
      });
    }
    setSelectedStudents(newChecked);
  };

  const handleCheckStudent = (student) => {
    let newChecked = [...selectedStudents];

    if (hasStudent(student)) newChecked = newChecked.filter((s) => s.user_id !== student.user_id);
    else newChecked.push(student);

    setSelectedStudents(newChecked);
  };

  return (
    <>
      <Typography sx={{ py: 1 }}>수강생 목록</Typography>
      <Typography variant="body2">총 {attendees?.length || 0}명</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '25vh', maxWidth: '40vw' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={allChecked} onClick={handleCheckAll} />
              </TableCell>
              <TableCell>학생 이름</TableCell>
              <TableCell>학생 연락처</TableCell>
              <TableCell>학부모 이름</TableCell>
              <TableCell>학부모 연락처</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees?.map((att) => {
              const { parent } = att;

              return (
                <TableRow key={att.user_id}>
                  <TableCell>
                    <Checkbox checked={hasStudent(att)} onClick={() => handleCheckStudent(att)} />
                  </TableCell>
                  <TableCell>{att.user_name}</TableCell>
                  <TableCell>{att.phone_number}</TableCell>
                  <TableCell>{parent?.user_name}</TableCell>
                  <TableCell>{parent?.phone_number}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
