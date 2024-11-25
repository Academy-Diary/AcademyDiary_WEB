import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, List, ListItem, ListItemText } from '@mui/material';

import { Title, TitleMedium } from '../../components';
import { useLectureList } from '../../api/queries/lectures/useLectureList';

export default function DirectorHome() {
  const navigate = useNavigate();
  const [liveLectures, setLiveLectures] = useState(null);

  const { data: lectures } = useLectureList();

  useEffect(() => {
    // 진행중인 강의 필터링
    if (lectures) {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(); // 현재 요일
      const currentTime = now.toTimeString().slice(0, 5); // 현재 시간 (HH:mm 형식)

      const filteredLectures = lectures.filter((lecture) => {
        const { days, start_time: st, end_time: et } = lecture;
        // TODO: 형식 변환 제거
        const startTime = st.split('T')[1].slice(0, 5);
        const endTime = et.split('T')[1].slice(0, 5);

        return days.includes(currentDay) && currentTime >= startTime && currentTime <= endTime;
      });

      setLiveLectures(filteredLectures);
    }
  }, [lectures]);

  const handleClickNotice = () => {
    navigate('/director/notice');
  };

  return (
    <>
      <Title title="떡잎학원" subtitle="학생 수: 98명" />
      <Box sx={{ mb: 2, px: 2, backgroundColor: 'lightgrey' }}>
        <TitleMedium title="진행중인 강의" />
        <List>
          {liveLectures?.map((lecture) => (
            <ListItem key={lecture.lecture_id}>
              <ListItemText primary={`${lecture.lecture_name} (${lecture.teacher_name})`} secondary={`강의 시간: ${lecture.start_time}~${lecture.end_time}`} />
              <ListItemText primary={`수강생: ${lecture.headcount}명`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mb: 2, px: 2, backgroundColor: 'lightgrey' }} onClick={handleClickNotice}>
        <TitleMedium title="학원 공지사항" />
      </Box>
      <Box sx={{ mb: 2, px: 2, backgroundColor: 'lightgrey' }}>
        <TitleMedium title="최근 등록요청" />
      </Box>
    </>
  );
}
