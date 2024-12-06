import { createTheme } from '@mui/material';

import PretendardBold from './fonts/Pretendard-Bold.woff2';
import PretendardRegular from './fonts/Pretendard-Regular.woff2';

const theme = createTheme({
  palette: {
    primary: {
      main: '#024F51',
    },
    secondary: {
      main: '#FEC749',
    },
  },
  typography: {
    fontFamily: 'Pretendard-Regular, system-ui',
    h4: {
      fontFamily: 'Pretendard-Bold, system-ui',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
              font-family: 'Pretendard-Bold';
              src: url(${PretendardBold}) format('woff');
              font-weight: 400;
              font-style: normal;
          }
          @font-face {
            font-family: 'Pretendard-Regular';
            src: url(${PretendardRegular}) format('woff2');
            font-weight: 400;
            font-style: normal;
          }
        `,
    },
  },
});

export default theme;
