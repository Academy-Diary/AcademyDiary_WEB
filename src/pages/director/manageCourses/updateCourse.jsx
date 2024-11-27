import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Dialog,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { TitleMedium, TransferList, SubmitButtons } from '../../../components';
import { useLectureStore, useUserAuthStore } from '../../../store';
import { useTeacherList } from '../../../api/queries/members/useTeacherList';
import { useUpdateLecture } from '../../../api/queries/lectures/useUpdateLecture';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';
import { useStudentList } from '../../../api/queries/members/useStudentList';
import { useUpdateAttendees } from '../../../api/queries/lectures/useUpdateAttendees';

const time = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

export default function UpdateCourse() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { lecture } = useLectureStore();

  const { user } = useUserAuthStore();
  const { data: teachers } = useTeacherList(user.academy_id);
  const updateLectureMutation = useUpdateLecture(lecture.lecture_id);

  const [teacherId, setTeacherId] = useState(lecture.teacher_id);
  const [lectureDays, setLectureDays] = useState(lecture.days);
  const [startTime, setStartTime] = useState(lecture.start_time);
  const [endTime, setEndTime] = useState(lecture.end_time);

  const { data: students } = useStudentList(user.academy_id);
  const { data: attendees } = useAttendeeList(lecture.lecture_id);
  const updateAttendeesMutation = useUpdateAttendees(lecture.lecture_id);
  // 수강생 등록 TransferList에 넘겨줄 리스트 (왼,오)
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  useEffect(() => {
    if (students) {
      setRight(attendees ?? []);
      const attIds = attendees?.map((a) => a.user_id) ?? [];
      setLeft(students.filter((s) => !attIds.includes(s.user_id)));
    }
  }, [attendees, students]);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleChangeTeacher = (e) => {
    setTeacherId(e.target.value);
  };
  const handleLectureDays = (e) => {
    const { value } = e.target;
    setLectureDays(typeof value === 'string' ? value.split(',') : value);
  };
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const submitData = {
      lecture_name: data.get('lecture_name'),
      teacher_id: teacherId,
      day: lectureDays,
      start_time: startTime,
      end_time: endTime,
    };
    // console.log(submitData);

    // 강의 기본정보 수정
    updateLectureMutation.mutate(submitData, {
      onSuccess: () => {
        const oldAttendeeIds = attendees?.map((a) => a.user_id) ?? [];
        const newAttendeeIds = right.map((s) => s.user_id);
        const intersection = newAttendeeIds.filter((id) => oldAttendeeIds.includes(id)); // 교집합

        if (newAttendeeIds.length !== intersection.length) {
          // 강의 수강생 수정
          updateAttendeesMutation.mutate(newAttendeeIds, {
            onSuccess: () => {
              alert('강의 수정 성공!');
              navigate('/director/manage-courses/');
            },
          });
        } else {
          alert('강의 수정 성공!');
          navigate('/director/manage-courses/');
        }
      },
      onError: () => {
        alert('강의 수정 실패!');
      },
    });
  };

  return (
    <>
      <TitleMedium title="강의 수정" />
      <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" name="lecture_name" defaultValue={lecture.lecture_name} sx={{ mt: 2, color: 'black' }} required />
          </Grid>
          <Grid item xs={12}>
            <Typography>강사명</Typography>
            <FormControl sx={{ mt: 2, minWidth: 195 }}>
              <InputLabel id="teacher-input-label">강사명</InputLabel>
              <Select label="강사명" labelId="teacher-input-label" value={teacherId} onChange={handleChangeTeacher} required>
                {teachers?.map((t) => (
                  <MenuItem key={t.user_id} value={t.user_id}>
                    {t.user_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>강의 시간</Typography>
            <FormControl sx={{ mt: 2, minWidth: 195 }}>
              <InputLabel>요일</InputLabel>
              <Select label="요일" multiple value={lectureDays} onChange={handleLectureDays} required>
                <MenuItem value="MONDAY">월</MenuItem>
                <MenuItem value="TUESDAY">화</MenuItem>
                <MenuItem value="WEDNESDAY">수</MenuItem>
                <MenuItem value="THURSDAY">목</MenuItem>
                <MenuItem value="FRIDAY">금</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ ml: 4, mt: 2, minWidth: 150 }}>
              <InputLabel>시작 시간</InputLabel>
              <Select label="시작 시간" value={startTime} onChange={handleStartTime} required>
                {time.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ ml: 2, mt: 2, minWidth: 150 }}>
              <InputLabel>종료 시간</InputLabel>
              <Select label="종료 시간" value={endTime} onChange={handleEndTime} required>
                {time.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1}>
                <Typography sx={{ py: 1 }}>수강생 목록</Typography>
              </Grid>
              <Grid item xs={11}>
                <IconButton onClick={handleOpenDialog}>
                  <OpenInNewIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Typography variant="body2">총 {right ? right.length : 0}명</Typography>
            {right?.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 3, maxHeight: '25vh', width: '50vw' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>학생 이름</TableCell>
                      <TableCell>학생 연락처</TableCell>
                      <TableCell>학부모 이름</TableCell>
                      <TableCell>학부모 연락처</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {right.map((attendee) => {
                      const { parent } = attendee;

                      return (
                        <TableRow key={attendee.user_id}>
                          <TableCell>{attendee.user_name}</TableCell>
                          <TableCell>{attendee.phone_number}</TableCell>
                          <TableCell>{parent?.user_name}</TableCell>
                          <TableCell>{parent?.phone_number}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
          <SubmitButtons submitTitle="수정 완료" />
        </Grid>
        <Dialog open={open} onClose={handleCloseDialog}>
          <Grid container spacing={5} sx={{ py: 3, px: 5 }}>
            <Grid item xs={12}>
              <Typography variant="h6">수강생 목록 수정</Typography>
            </Grid>
            <Grid item xs={12}>
              <TransferList leftTitle="비수강생 목록" rightTitle="수강생 목록" left={left} right={right} setLeft={setLeft} setRight={setRight} />
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button variant="contained" onClick={handleCloseDialog}>
                  수정 완료
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </Box>
    </>
  );
}
