import React from 'react';
import {Provider} from 'react-redux'
import Match from 'react-router/Match'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Link from 'react-router/Link'


import Header from './../../components/Header/Header.jsx';
import Login from './../Login/Login.jsx';
import Signup from './../Login/Signup.jsx';
import Users from './../Users/Users.jsx';

import {toggleMenu} from './../../redux/actions';
import store from './../../redux/store';

const NoMatch = () => {
    return <div>NotFound</div>;
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this.onSignout = this.onSignout.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
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
        let state = store.getState();
        return (
            <Provider store={store}>
                <div>
                    <Header
                        name={state.user.name}
                        isLoggedIn={state.user.isLoggedIn}
                        signOut={ this.onSignout }
                        menuClick={ this.handleToggle } />
                    <Drawer
                        docked={false}
                        open={state.main.menuOpen}
                        onRequestChange={this.handleToggle}>
                        <Link to="/users">
                            <MenuItem onTouchTap={ this.handleToggle }>Users</MenuItem>
                        </Link>
                    </Drawer>

                    <Match pattern="/login" component={Login} />
                    <Match pattern="/signup" component={Signup} />
                    <Match pattern="/users" component={Users} />
                </div>
            </Provider>
        );
    }

    onSignout() {
        console.log("signing out");
    }

    handleToggle() {
        store.dispatch(toggleMenu(!store.getState().main.menuOpen));
    }

}

export default Main;
