import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './app-state/store';
import Root from './Root';
import cssClasses from './styles/common.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
);