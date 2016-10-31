import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Miss from 'react-router/Miss'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Header from './components/Header/Header.jsx';
import Login from './pages/Login/Login.jsx';
import Main from './pages/Main/Main.jsx';
import Signup from './pages/Login/Signup.jsx';
import store from './redux/store';
import {toggleValue} from './redux/actions';

injectTapEventPlugin();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <main>
                <p>This is page one.</p>
                <p>The value in the store is: { this.state.value ? 'true' : 'false' }</p>
                <RaisedButton primary={true} onClick={ this._onClickHandler.bind(this) } >Toggle value</RaisedButton>
            </main>
        );
    }

    _onClickHandler() {
        store.dispatch(toggleValue(!this.state.value));
    }
}
const About = () => {
    return <div>About</div>;
};

const Topics = () => {
    return <div>Topics</div>;
};

const NoMatch = () => {
    return <div>NotFound</div>;
};

//class Main extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = store.getState();
//    }
//
//    componentWillMount() {
//        this.unsubscribe = store.subscribe(() => {
//            this.setState(store.getState());
//        });
//    }
//
//    componentWillUnmount() {
//        this.unsubscribe();
//    }
//
//    render() {
//        return (
//            <Provider store={store}>
//                <div>
//                    <Header name={store.getState().user.name} isLoggedIn={store.getState().user.isLoggedIn}/>
//                    <ul>
//                        <li><Link to="/">Home</Link></li>
//                        <li><Link to="/about">About</Link></li>
//                        <li><Link to="/topics">Topics</Link></li>
//                    </ul>
//
//                    <hr/>
//
//                    <Match exactly pattern="/" component={Home} />
//                    <Match pattern="/about" component={About} />
//                    <Match pattern="/topics" component={Topics} />
//                    <Match pattern="/login" component={Login} />
//                    <Match pattern="/signup" component={Signup} />
//                    <Miss component={NoMatch}/>
//                </div>
//            </Provider>
//        );
//    }
//
//    _onClickHandler() {
//        store.dispatch(toggleValue(!this.state.value));
//    }
//}
//


ReactDOM.render(
    <Router>
        <MuiThemeProvider>
            <Main />
        </MuiThemeProvider>
    </Router>,
    document.querySelector('#app')
);