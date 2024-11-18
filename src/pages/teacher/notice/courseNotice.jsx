import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { AddButton, Notice, TitleMedium } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useNoticeList } from '../../../api/queries/notice/useNoticeList';
import { useNoticeDelete } from '../../../api/queries/notice/useNoticeCRUD';

// test data
// const courses = [
//   { id: 1, name: '미적분', students: 60 },
//   { id: 2, name: '확률과통계', students: 30 },
//   { id: 3, name: '영어', students: 20 },
//   { id: 4, name: '국어', students: 55 },
// ];
// const notices = [
//   { id: 1, title: '공지사항 테스트3', date: '2024-07-20', view: 55 },
//   { id: 2, title: '7월 19일까지 과제', date: '2024-06-18', view: 101 },
//   { id: 2, title: '5월 21일 수업자료', date: '2024-05-21', view: 80 },
// ];

export default function CourseNotice() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, lectures } = useUserAuthStore();

  const courseID = Number(params.courseid);
  const lecture = lectures.filter((n) => n.lecture_id === courseID)[0];
  const [pageNo, setPage] = useState(1);
  const { data: notices, refetch } = useNoticeList(courseID, pageNo, 10);
  const noticeDelete = useNoticeDelete();

  const [lastNoticeId, setLastNoticeId] = useState('');

  useEffect(() => {
    if (notices) {
      // 공지를 불러왔을 때 마지막 noticeId.
      // 공지가 없다면 user.academy_id&courseId&0 으로 세팅.
      setLastNoticeId(notices.notice_count !== 0 ? notices.notice_list[0].notice_id : `${user.academy_id}&${courseID}&0`);
    }
  }, [notices, courseID, user]);

  const handleClickAdd = () => {
    navigate(`/teacher/class/${params.courseid}/notice/add`, { state: { noticeId: lastNoticeId } });
  };
  const handleClickDelete = (id) => {
    noticeDelete.mutate(id, { onSuccess: () => refetch() });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    refetch();
  };

  return (
    <>
      <TitleMedium title={`${lecture.lecture_name} 공지사항`} />
      <Notice notices={notices !== undefined ? notices.notice_list : []} updateURL={`/teacher/class/${params.courseid}/notice/update`} handleClickDelete={handleClickDelete} />
      <Pagination count={notices !== undefined ? Math.trunc(notices.notice_count / 10) + 1 : 1} sx={{ mt: 10 }} page={pageNo} onChange={handleChangePage} />
      <AddButton title="새 공지사항 등록" onClick={handleClickAdd} />
    </>
  );
}
