import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {gotUsers} from './../../redux/actions';
import axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentDidMount() {
        axios.get("/api/users")
            .then(function (response) {
                store.dispatch(gotUsers(response.data));
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
        let users = store.getState().users;
        let data = null;
        if (users.userList) {
            data = users.userList.map(function(value){
                return (<li key={value._id} >{value.name}</li>);
            });
        }

        return (
            <div>
                <ul>
                    {data}
                </ul>
            </div>
        );
    }
}

export default Users;