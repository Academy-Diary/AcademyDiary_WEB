import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Pagination } from '@mui/material';

import { TitleMedium, Notice, AddButton } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useNoticeList } from '../../../api/queries/notice/useNoticeList';

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

const PAGE_SIZE = 6;

export default function DirectorNotice() {
  const { user } = useUserAuthStore();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data: notices, refetch } = useNoticeList(0, page, PAGE_SIZE);

  const handleChangePage = (e, value) => {
    setPage(value);
    refetch();
  };

  const handleClickAdd = () => {
    navigate('/director/notice/add');
  };

  const handleClickDelete = (id) => {
    // TODO: 전체공지 삭제 api 연동
    console.log('delete', id);
  };

  return (
    <>
      <TitleMedium title="전체 공지사항" />
      <Notice notices={notices ? notices.notice_list : []} editable={user.role === 'CHIEF'} updateURL="/director/notice/update" handleClickDelete={handleClickDelete} />
      <Pagination count={notices ? Math.trunc(notices.notice_count / PAGE_SIZE) + 1 : 1} page={page} onChange={handleChangePage} sx={{ position: 'fixed', bottom: 30 }} />
      <AddButton title="새 공지사항 등록" onClick={handleClickAdd} />
    </>
  );
}
