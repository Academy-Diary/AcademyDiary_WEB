import { Box, Typography } from '@mui/material';
import React from 'react';

/**
 *@description 타이틀 컴포넌트
 * - subtitle은 선택 
 * - subtitle 우측에 추가로 컴포넌트 넣을 수 있음! 

 * @param {string} title
 * @param {string | null} subtitle
 * 
 * @example
 * <Title title="" subtitle="">
 *  <포함할 컴포넌트 />
 * </Title>
 */
export default function Title({ title, subtitle, children }) {
  return (
    <Box sx={{ paddingY: 3 }}>
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        {!subtitle ? null : (
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            {subtitle}
          </Typography>
        )}
        {!children ? null : children}
      </Box>
    </Box>
  );
}
