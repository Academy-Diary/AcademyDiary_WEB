import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

/**
 * 페이지 하단 우측에 위치한 취소 & 제출 버튼 set
 * @param {String} submitTitle 제출 버튼의 문자열
 */

export default function SubmitButtons({ submitTitle }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
      <Button size="large" variant="outlined" sx={{ width: 100, mr: 2 }} onClick={handleCancel}>
        취소
      </Button>
      <Button size="large" variant="contained" sx={{ width: 120 }} type="submit">
        {submitTitle}
      </Button>
    </Box>
  );
}
