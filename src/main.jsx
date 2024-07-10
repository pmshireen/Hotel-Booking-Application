import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import theme from './utils/theme/theme.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
