import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Router from 'react-router';
import Link from 'react-router/Link'

function Header({isLoggedIn, name, signOut}) {
    let title;
    title = isLoggedIn ? "Welcome " + name : "Welcome guest";

    let rightState;
    if (isLoggedIn) {
        rightState = (<div>
                        <FlatButton label="Logout" onClick={signOut} />
                        </div>);
    } else {
        rightState = (<div>
                        <Link to="/signup"><FlatButton label="Sign Up" /></Link>
                        <Link to="/login"><FlatButton label="Login" /></Link>
                    </div>);
    }

    return (
        <AppBar
            title={title}
            iconElementRight={rightState}
        />
    )
}

export default Header;