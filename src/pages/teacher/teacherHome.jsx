import React from 'react';
import { Box, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';
import { useUserAuthStore } from '../../store';
import { useLectures } from '../../api/queries/lectures/useLectures';
import { useNoticeList } from '../../api/queries/notice/useNoticeList';
import { useAcademyInfo } from '../../api/queries/user/useAcademyInfo';

import checkIcon from '../../img/check.png';

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
      <Title title={academyInfo?.academy_name} />
      <Grid container>
        <Grid container xs={12} md={4}>
          <Box sx={{ width: '85%', height: '70vh', padding: 3, borderRadius: '10px', border: '2px solid #000000' }}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="bold">
                Today&apos;s Lectures
              </Typography>
              {lectures.map((lecture) => {
                const time1 = lecture.start_time;
                const time2 = lecture.end_time;
                const week = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
                const today = week[new Date().getDay()];
                if (lecture.days.includes(today))
                  return (
                    <>
                      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 3 }} onClick={() => handleLectureClick(lecture.lecture_id)}>
                        <Box display="flex" alignItems="center">
                          <img src={checkIcon} alt="" width="15px" height="14px" />
                          <Typography sx={{ ml: '15px', fontFamily: 'Inter' }}>{lecture.lecture_name}</Typography>
                        </Box>
                        <Typography sx={{ fontFamily: 'Inter' }}>
                          {time1}~{time2}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Inter' }}>수강생 {lecture.headcount}명</Typography>
                      </Grid>
                      <Divider sx={{ backgroundColor: 'black' }} />
                    </>
                  );
                return null;
              })}
            </Stack>
          </Box>
          <Box sx={{ width: '10%', height: '110px', mt: 5, backgroundColor: '#FFD317', borderTopRightRadius: 5, borderBottomRightRadius: 5 }} />
        </Grid>
        <Grid container xs={12} md={8}>
          <Box sx={{ width: '90%', height: '70vh', padding: 3, border: '2px solid #000000', borderRadius: '10px' }}>
            <Stack>
              <Typography variant="h5" fontWeight="bold" fontFamily="Inter" mb={5}>
                학원 공지 사항
              </Typography>
              <Divider sx={{ backgroundColor: 'black' }} />
              <TableContainer component={Box}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell fontFamily="Inter">번호</TableCell>
                      <TableCell fontFamily="Inter" align="center">
                        제목
                      </TableCell>
                      <TableCell fontFamily="Inter" align="right">
                        등록날짜
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {noticeList?.notice_list.map((notice) => (
                      <TableRow key={`${notice.notice_id}`} onClick={() => handleNoticeClick(notice.notice_id)}>
                        <TableCell fontFamily="Inter">{notice.notice_id.split('&')[2]}</TableCell>
                        <TableCell align="left">
                          <Box>
                            <Typography fontFamily="Inter">{notice.title}</Typography>
                            <Typography fontFamily="Inter">{notice.content.slice(0, 30)}...</Typography>
                          </Box>
                          <br />
                        </TableCell>
                        <TableCell fontFamily="Inter" align="right">
                          {notice.created_at}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* {noticeList?.notice_list.map((notice) => (
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
              ))} */}
            </Stack>
          </Box>
          <Box sx={{ width: '5%', height: '110px', mt: 5, backgroundColor: '#064420', borderTopRightRadius: 5, borderBottomRightRadius: 5 }} />
        </Grid>
      </Grid>
    </>
  );
}
