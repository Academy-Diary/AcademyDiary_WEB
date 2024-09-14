import React from 'react';

import { Box, Button } from '@mui/material';

/**
 * 페이지 하단 우측에 위치한 버튼 두개 set
 *
 * @param {String} first 첫번째 버튼 문자열
 * @param {String} second 두번째 버튼 문자열
 * @param {Function} onClickFirst 첫번째 버튼 클릭 핸들러
 * @param {Function} onClickSecond 두번째 버튼 클릭 핸들러
 */

export default function BottomTwoButtons({ first, second, onClickFirst, onClickSecond }) {
  return (
    <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
      <Button size="large" variant="outlined" sx={{ width: 120, mr: 2 }} onClick={onClickFirst}>
        {first}
      </Button>
      <Button size="large" variant="contained" sx={{ width: 120 }} onClick={onClickSecond}>
        {second}
      </Button>
    </Box>
  );
}
