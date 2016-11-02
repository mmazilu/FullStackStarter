import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/menu';
import Link from 'react-router/Link'

function Header({isLoggedIn, name, signOut, menuClick}) {
    let title;
    title = isLoggedIn ? "Welcome " + name : "Welcome guest";

    let rightState;
    if (isLoggedIn) {
        rightState = (<div>
                        <FlatButton label="Logout" onTouchTap={signOut} />
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
            iconElementLeft={<IconButton onTouchTap={menuClick}><NavigationClose /></IconButton>}
        />
    )
}

export default Header;