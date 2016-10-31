import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Match from 'react-router/Match'
import Header from './../../components/Header/Header.jsx';
import store from './../../redux/store';
import Login from './../Login/Login.jsx';
import Signup from './../Login/Signup.jsx';

const NoMatch = () => {
    return <div>NotFound</div>;
};

class Main extends React.Component {
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
            <Provider store={store}>
                <div>
                    <Header name={store.getState().user.name} isLoggedIn={store.getState().user.isLoggedIn} signOut={ this._onSignout.bind(this) } />
                    <Match pattern="/login" component={Login} />
                    <Match pattern="/signup" component={Signup} />
                </div>
            </Provider>
        );
    }

    _onSignout() {
        console.log("signing out");
    }

}

export default Main;
