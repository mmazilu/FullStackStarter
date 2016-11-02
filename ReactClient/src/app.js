import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/BrowserRouter'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './pages/Main/Main.jsx';

injectTapEventPlugin();

ReactDOM.render(
    <Router>
        <MuiThemeProvider>
            <Main />
        </MuiThemeProvider>
    </Router>,
    document.querySelector('#app')
);