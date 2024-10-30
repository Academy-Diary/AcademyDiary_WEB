import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';

import { TitleMedium, SubmitButtons } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useTeacherList } from '../../../api/queries/members/useTeacherList';
import { useAddLecture } from '../../../api/queries/lectures/useAddLecture';

const time = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

export default function AddCourse() {
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = useState('');
  const [lectureDays, setLectureDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const { user } = useUserAuthStore();
  const { data: teachers } = useTeacherList(user.academy_id);

  const addLectureMutation = useAddLecture();

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
      user_id: teacherId,
      academy_id: user.academy_id,
      day: lectureDays,
      start_time: startTime,
      end_time: endTime,
    };
    // console.log(submitData);

    addLectureMutation.mutate(submitData, {
      onSuccess: () => {
        alert('강의 생성 성공!');
        navigate('/director/manage-courses');
      },
      onError: () => {
        alert('강의 생성 실패! 나중에 다시 시도해주세요.');
      },
    });
  };

  return (
    <>
      <TitleMedium title="강의 생성" />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>강의명</Typography>
            <TextField label="강의명" name="lecture_name" sx={{ mt: 2 }} required />
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
          <SubmitButtons submitTitle="등록하기" />
        </Grid>
      </Box>
    </>
  );
}
