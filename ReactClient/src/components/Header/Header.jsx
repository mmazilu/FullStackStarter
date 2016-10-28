import React from 'react';
import AppBar from 'material-ui/AppBar';

function Header({name}) {
    let title = name ? "Welcome " + name : "Welcome guest";

    return (
        <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
    )
}

export default Header;