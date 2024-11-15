import React from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';
import { useUserAuthStore } from '../../store';
import { useLectures } from '../../api/queries/lectures/useLectures';

// const lectures = [
//   { name: '수학1', time: '14:00~16:00', students: 40 },
//   { name: '확률과통계', time: '16:30~18:30', students: 38 },
//   { name: '미적분', time: '19:00~21:00', students: 33 },
//  ];

const noticeList = [
  {
    id: 1,
    title: '8월 정기고사 안내',
    content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...',
    date: '2024-07-20',
    view: 55,
  },
  {
    id: 2,
    title: '7월 정기고사 안내',
    content: '안녕하세요. \n이번달 정기고사 안내드립니다. \n...',
    date: '2024-06-18',
    view: 101,
  },
];

export default function TeacherHome() {
  const { user, lectures } = useUserAuthStore();
  const navigate = useNavigate();
  const { refetch } = useLectures();
  if (lectures.length === 0) refetch();
  const handleLectureClick = (id) => {
    navigate(`/teacher/class/${id}`);
  };
  const handleNoticeClick = (id) => {
    navigate(`/teacher/notice/${id}`);
  };

  return (
    <>
      <Title title="학원명" />
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box sx={{ width: '95%', height: '70vh', bgcolor: '#d9d9d9', m: '10px', padding: '10px' }}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="bold">
                Today&apos;s Lectures
              </Typography>
              {lectures.map((lecture) => {
                const time1 = lecture.start_time.split('T')[1].split('.')[0].split(':');
                const time2 = lecture.end_time.split('T')[1].split('.')[0].split(':');
                const week = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
                const today = week[new Date().getDay()];
                if (lecture.days.includes(today))
                  return (
                    <>
                      <Grid container sx={{ justifyContent: 'space-between' }} onClick={() => handleLectureClick(lecture.lecture_id)}>
                        <Stack sx={{ ml: '10px' }}>
                          <Typography variant="subtitle1">
                            {lecture.lecture_name} ({lecture.teacher_name})
                          </Typography>
                          <Typography variant="caption">
                            {time1[0]}:{time1[1]}~{time2[0]}:{time2[1]}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle1">수강생 {lecture.headcount}명</Typography>
                      </Grid>
                      <Divider />
                    </>
                  );
                return null;
              })}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ width: '95%', height: '70vh', bgcolor: '#d9d9d9', m: '10px', padding: '10px' }}>
            <Stack>
              <Typography variant="h5" fontWeight="bold">
                학원 공지 사항
              </Typography>
              {noticeList.map((notice) => (
                <Box sx={{ width: '100%', bgcolor: '#ffffff', padding: '5px', marginY: '10px' }} onClick={() => handleNoticeClick(notice.id)}>
                  <Stack spacing={2}>
                    <Grid container justifyContent="space-between">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {notice.title}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        조회수 : {notice.view}
                      </Typography>
                    </Grid>
                    <Typography variant="overline" sx={{ width: '100%', maxHeight: '100px', overflowY: 'hidden' }}>
                      {notice.content}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
