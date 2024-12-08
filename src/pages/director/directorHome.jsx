import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemText, Typography, styled } from '@mui/material';

import { Title } from '../../components';
import { useLectureList } from '../../api/queries/lectures/useLectureList';
import { useNoticeList } from '../../api/queries/notice/useNoticeList';
import useRequestList from '../../api/queries/members/useRequestList';
import { useUserAuthStore } from '../../store';
import { useAcademyInfo } from '../../api/queries/user/useAcademyInfo';

// const lectures = [
//   {
//     academy_id: 'test_academy',
//     lecture_id: 1,
//     lecture_name: '한국사',
//     teacher_id: 'test_teacher',
//     teacher_name: '권해담',
//     days: ['TUESDAY', 'THURSDAY'],
//     headcount: 60,
//     start_time: '2024-10-16T04:30:00.000Z',
//     end_time: '2024-10-16T06:00:00.000Z',
//   },
// ];

// const notices = {
//   notice_count: 25,
//   notice_list: [
//     {
//       title: '코로나19로 인한 학원 운영 방침',
//       content: '코로나19 예방 방침 공지합니다.',
//       user_id: 'test_chief',
//       views: 123,
//       notice_id: 'test_academy&0&5',
//       created_at: '2024-11-16',
//       updated_at: '2024-11-17',
//     },
//   ],
// };

const StyledCard = styled(Box)({
  border: '1.5px solid black',
  borderRadius: 10,
  padding: 16,
  height: 350,
});

export default function DirectorHome() {
  const navigate = useNavigate();
  const [liveLectures, setLiveLectures] = useState([]);

  const { user } = useUserAuthStore();

  const { data: academyInfo } = useAcademyInfo();
  const { data: lectures } = useLectureList();
  const { data: notices } = useNoticeList(0, 1, 5);
  const { data: teacherReqList } = useRequestList('TEACHER', user.academy_id);
  const { data: studentReqList } = useRequestList('STUDENT', user.academy_id);

  // 진행중인 강의 필터링
  useEffect(() => {
    if (lectures) {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(); // 현재 요일
      const currentTime = now.toTimeString().slice(0, 5); // 현재 시간 (HH:mm 형식)

      const filteredLectures = lectures.filter((lecture) => {
        const { days, start_time: startTime, end_time: endTime } = lecture;
        return days.includes(currentDay) && currentTime >= startTime && currentTime <= endTime;
      });

      setLiveLectures(filteredLectures);
    }
  }, [lectures]);

  const handleClickNoticeCard = (noticeId) => {
    navigate(`/director/notice/${noticeId}`);
  };

  return (
    <>
      <Title title={academyInfo?.academy_name} subtitle={`학생 수: ${academyInfo?.student_headcount}명`} />
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <StyledCard>
            <Typography variant="h6" sx={{ mb: 3 }}>
              진행중인 강의
            </Typography>
            <List sx={{ height: 250, overflow: 'auto' }}>
              {liveLectures.map((lecture) => (
                <ListItem key={lecture.lecture_id} divider>
                  <ListItemText primary={lecture.lecture_name} secondary={`강사: ${lecture.teacher_name}`} />
                  <ListItemText primary={`${lecture.start_time}~${lecture.end_time}`} />
                  <ListItemText primary={`수강생 ${lecture.headcount}명`} />
                </ListItem>
              ))}
            </List>
          </StyledCard>
        </Grid>
        <Grid item xs={6}>
          <StyledCard>
            <Typography variant="h6" sx={{ mb: 5 }}>
              최근 등록 요청
            </Typography>
            <Grid container spacing={2} sx={{ height: 200 }}>
              <Grid item xs={6}>
                <Typography sx={{ mb: 2, fontWeight: 'bold' }}>강사</Typography>
                {teacherReqList &&
                  teacherReqList.slice(0, 3).map((teacher) => {
                    const teacherInfo = teacher.user;
                    return <Typography key={teacherInfo.user_id} sx={{ mb: 1 }}>{`${teacherInfo.user_name} 강사`}</Typography>;
                  })}
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid item xs={5}>
                <Typography sx={{ mb: 2, fontWeight: 'bold' }}>학생 (학부모)</Typography>
                {studentReqList &&
                  studentReqList.slice(0, 3).map((student) => {
                    const studentInfo = student.user;
                    const parentInfo = studentInfo.parent;
                    return <Typography key={studentInfo.user_id} sx={{ mb: 1 }}>{`${studentInfo.user_name} (${parentInfo ? parentInfo.user_name : ''})`}</Typography>;
                  })}
              </Grid>
            </Grid>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" sx={{ mb: 5 }}>
              학원 공지사항
            </Typography>
            <Grid container spacing={1}>
              {notices &&
                notices.notice_count > 0 &&
                notices.notice_list.slice(0, 3).map((notice) => (
                  <Grid item xs={4} key={notice.notice_id}>
                    <Card elevation={3} sx={{ width: 350, height: 200 }} onClick={() => handleClickNoticeCard(notice.notice_id)}>
                      <CardContent>
                        <Typography variant="h6">{notice.title}</Typography>
                        <Typography sx={{ justifySelf: 'end', mb: 2, fontSize: 14 }}>{`조회수 ${notice.views}명`}</Typography>
                        <Typography>{notice.content}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </StyledCard>
        </Grid>
      </Grid>
    </>
  );
}
