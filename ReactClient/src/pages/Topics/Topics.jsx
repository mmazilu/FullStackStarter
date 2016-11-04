import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {gotTopics} from './../../redux/actions';
import axios from 'axios';
import TopicButton from './TopicButton.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import {toggleAdd} from './../../redux/actions';
import FlatButton from 'material-ui/FlatButton';

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentDidMount() {
        axios.get("/api/private/users")
            .then(function (response) {
                store.dispatch(gotTopics(response.data));
            })
            .catch(function (error) {
                alert('fail');
                console.log(error);
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let topics = store.getState().topics;
        let data = null;
        if (topics.topicList) {
            data = topics.topicList.map(function(value){
                return (<TopicButton name={value.name} id={value._id} key={value._id} />);
            });
        }

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleToggle}
            />
        ];

        return (
            <div>
                <FloatingActionButton onTouchTap={this.handleToggle} >
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Dialog With Date Picker"
                    actions={actions}
                    modal={false}
                    open={this.state.topics.openAdd}
                    onRequestClose={this.handleToggle}
                >
                    <TextField
                        ref="username"
                        hintText="user@example.com"
                        floatingLabelText="Enter user here"
                    /><br />
                    <TextField
                        ref="password"
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                    /><br />
                </Dialog>
                <List>
                    {data}
                </List>
            </div>
        );
    }

    handleToggle() {
        store.dispatch(toggleAdd(!store.getState().topics.openAdd));
    }
}

export default Topics;