import React from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';
import { useUserAuthStore } from '../../store';
import { useLectures } from '../../api/queries/lectures/useLectures';
import { useNoticeList } from '../../api/queries/notice/useNoticeList';
import { useAcademyInfo } from '../../api/queries/user/useAcademyInfo';

export default function TeacherHome() {
  const { user, lectures } = useUserAuthStore();
  const navigate = useNavigate();
  const { refetch } = useLectures();
  const { data: noticeList } = useNoticeList(0, 1, 5);
  const { data: academyInfo } = useAcademyInfo();
  if (lectures.length === 0) refetch();
  const handleLectureClick = (id) => {
    navigate(`/teacher/class/${id}`);
  };
  const handleNoticeClick = (id) => {
    navigate(`/teacher/notice/${id}`);
  };

  return (
    <>
      <Title title={academyInfo.academy_name} />
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
              {noticeList?.notice_list.map((notice) => (
                <Box sx={{ width: '100%', bgcolor: '#ffffff', padding: '5px', marginY: '10px' }} onClick={() => handleNoticeClick(notice.notice_id)}>
                  <Stack spacing={2}>
                    <Grid container justifyContent="space-between">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {notice.title}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        조회수 : {notice.views}
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
