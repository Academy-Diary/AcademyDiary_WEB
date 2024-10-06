import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserAuthStore } from '../../../store';
import { TitleMedium, Notice } from '../../../components';

const notices = [
  { id: 1, title: '8월 정기고사 안내', date: '2024-07-20', view: 55 },
  { id: 2, title: '7월 정기고사 안내', date: '2024-06-18', view: 101 },
  { id: 3, title: '6월 정기고사 안내', date: '2024-05-21', view: 129 },
  { id: 4, title: '5월 정기고사 안내', date: '2024-04-21', view: 129 },
  { id: 5, title: '4월 정기고사 안내', date: '2024-03-21', view: 129 },
  { id: 6, title: '3월 정기고사 안내', date: '2024-02-29', view: 201 },
];

export default function TeacherNotice({ category }) {
  const { user } = useUserAuthStore();
  const navigate = useNavigate();

  const isClassNotice = category !== '전체'; // category가 전체가 아니면 true

  return (
    <>
      <TitleMedium title={`${category} 공지사항`} />
      <Notice notices={notices} editable={isClassNotice} />
    </>
  );
}
