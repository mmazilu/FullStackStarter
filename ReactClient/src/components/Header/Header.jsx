import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Router from 'react-router';
import Link from 'react-router/Link'

function Header({name}) {
    let title = name ? "Welcome " + name : "Welcome guest";

    return (
        <AppBar
            title={title}
            iconElementRight={<div>
                    <Link to="/signup"><FlatButton label="Sign Up" /></Link>
                    <Link to="/login"><FlatButton label="Login" /></Link>
                </div>
            }
        />
    )
}

export default Header;