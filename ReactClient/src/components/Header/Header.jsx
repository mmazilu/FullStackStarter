import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

function Header({name}) {
    let title = name ? "Welcome " + name : "Welcome guest";

    return (
        <AppBar
            title={title}
            iconElementRight={<FlatButton label="Sign Up/Login" href="/login" />}
        />
    )
}

export default Header;