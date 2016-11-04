import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/menu';
import Link from 'react-router/Link';
import {List, ListItem} from 'material-ui/List';

function TopicButton({name, id}) {
    let link = "/topic/"+id;
    return (
        <Link to={link}><ListItem>{name}</ListItem></Link>
    )
}

export default TopicButton;