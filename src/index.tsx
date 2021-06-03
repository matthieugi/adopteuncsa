import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import theme from './theme';

import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from '@material-ui/styles';
initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
