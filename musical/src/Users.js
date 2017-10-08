import React, { Component } from 'react';
import './Users.css';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: this.props.users || []
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            users: newProps.users
        });
    }

    render(){
        return(
            <div className="Users-container">
                <h2 className="users-header">Users</h2>
                <hr/>
                <ul className="users-list">
                    {this.state.users.map(function(user, i){
                        return <li key={ i }>{user.socketId}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Users;