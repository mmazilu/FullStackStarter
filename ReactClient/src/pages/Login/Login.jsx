import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';

class Login extends React.Component {
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
                    hintText="user@example.com"
                    floatingLabelText="Enter user here"
                /><br />
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                /><br />
                <RaisedButton primary={true} onClick={ this._onClickHandler.bind(this) } >Login</RaisedButton>
            </div>
        );
    }

    _onClickHandler() {
        request.get("http://localhost:4000/api/login?username=" +
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
        //
        //store.dispatch(toggleValue(!this.state.value));
    }
}

export default Login;