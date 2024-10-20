import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddButton, Notice, TitleMedium } from '../../../components';

// test data
const courses = [
  { id: 1, name: '미적분', students: 60 },
  { id: 2, name: '확률과통계', students: 30 },
  { id: 3, name: '영어', students: 20 },
  { id: 4, name: '국어', students: 55 },
];
const notices = [
  { id: 1, title: '공지사항 테스트3', date: '2024-07-20', view: 55 },
  { id: 2, title: '7월 19일까지 과제', date: '2024-06-18', view: 101 },
  { id: 2, title: '5월 21일 수업자료', date: '2024-05-21', view: 80 },
];

export default function CourseNotice() {
  const params = useParams();
  const navigate = useNavigate();

  const courseID = Number(params.courseid);
  const course = courses.filter((n) => n.id === courseID)[0];

  const handleClickAdd = () => {
    navigate(`/teacher/class/${params.courseid}/notice/add`);
  };
  const handleClickDelete = (id) => {
    console.log('delete', id);
  };

  return (
    <>
      <TitleMedium title={`${course.name} 공지사항`} />
      <Notice notices={notices} updateURL={`/teacher/class/${params.courseid}/notice/update`} handleClickDelete={handleClickDelete} />
      <AddButton title="새 공지사항 등록" onClick={handleClickAdd} />
    </>
  );
}
