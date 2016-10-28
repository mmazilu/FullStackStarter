import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import request from 'superagent';

class Signup extends React.Component {
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
            <div>
                <TextField
                    ref="username"
                    hintText="user@example.com"
                    floatingLabelText="Enter user here"
                /><br />
                <TextField
                    ref="name"
                    hintText="John Doe"
                    floatingLabelText="Enter name here"
                /><br />
                <TextField
                    ref="password"
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                /><br />
                <RaisedButton primary={true} onClick={ this._onClickHandler.bind(this) } >Signup</RaisedButton>
            </div>
        );
    }

    _onClickHandler() {
        request.get("http://localhost:4000/api/signup?username=" +
            this.refs.username.getValue() +
            "&password="+ this.refs.password.getValue() +
            "&name=" + this.refs.name.getValue())
            .end(function (err, res) {
                if (err) {
                    alert("Forbidden");
                } else {
                    alert("bine bre");
                }
            });
        //store.dispatch(toggleValue(!this.state.value));
    }
}

export default Signup;