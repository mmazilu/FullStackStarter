import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {gotUsers} from './../../redux/actions';
import axios from 'axios';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



class Board extends React.Component {
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
        //setInterval(function(){
            axios.get("/api/private/messages")
                .then(function (response) {
                    store.dispatch(gotUsers(response.data));
                })
                .catch(function (error) {
                    alert('fail');
                    console.log(error);
                });
        //}, 1000);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let users = store.getState().users;
        let data = null;
        if (users.userList) {
            data = users.userList.map(function(value){
                return (<TableRow key={value._id}>
                    <TableRowColumn>{value.username}</TableRowColumn>
                    <TableRowColumn>{value.message}</TableRowColumn>
                </TableRow>);
            });
        }

        console.log(data);


        return (
            <div>
                <TextField
                    ref="message"
                    hintText="type something"
                    floatingLabelText="Please Post"
                /><br />
                <RaisedButton primary={true} onClick={ this._onClickHandler.bind(this) } >Signup</RaisedButton>


                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        {data}
                    </TableBody>
                </Table>


            </div>
        );
    }

    _onClickHandler() {
        axios.post("/api/private/postmessage", {
                message: this.refs.message.getValue()
            })
            .then(function (response) {
                return axios.get("/api/private/messages");
            })
            .then(function (response) {
                store.dispatch(gotUsers(response.data));
            })
            .catch(function (error) {
                alert('fail');
                console.log(error);
            });

    }

}

export default Board;