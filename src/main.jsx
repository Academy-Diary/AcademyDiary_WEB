import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@styles/globalTheme';
import '@styles/globalStyles.css';
import App from './App';
import ReactQueryProviders from './api/react-query-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <ReactQueryProviders>
        <App />
      </ReactQueryProviders>
    </CssBaseline>
  </ThemeProvider>
);
