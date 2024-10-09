import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function CustomLink({ to, text }) {
  return (
    <Link to={to} component={RouterLink} variant="body2">
      {text}
    </Link>
  );
}
