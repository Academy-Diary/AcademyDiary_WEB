import React, { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

export default function TeacherHeader() {
  const [name, setname] = useState('확통고수'); // FIXME: 전역변수로 유저정보 저장

  return (
    <Box>
      <Box sx={{ height: '4rem', backgroundColor: 'grey', color: 'white', paddingX: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Typography component="span" fontWeight="bold">
          AcademyPro
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>강사: {name}</Typography>
          <Avatar />
        </Box>
      </Box>
    </Box>
  );
}
