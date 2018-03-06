import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './Root';

ReactDOM.render(
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
  , document.getElementById('root')
);