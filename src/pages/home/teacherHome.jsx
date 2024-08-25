import React from 'react';
import { Container } from '@mui/material';
import { Teacher, Title } from '../../components';

export default function TeacherHome() {
  return (
    <Teacher>
      <Container>
        <Title title="강사화면 타이틀" subtitle="강사화면 섭타이틀" />
      </Container>
    </Teacher>
  );
}