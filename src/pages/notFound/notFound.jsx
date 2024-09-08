import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { Title } from '../../components';

function NotFound({ path = '/' }) {
  return (
    <Container>
      <Title
        title="404 not found"
        subtitle={
          <>
            go back to <Link to={path}>Home</Link>
          </>
        }
      />
    </Container>
  );
}

export default NotFound;
