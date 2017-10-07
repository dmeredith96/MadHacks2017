import React, { Component } from 'react';
import './Users.css';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    render(){
        return(
            <div className="Users-container">
                <h2 className="users-header">Users</h2>
                <hr/>
                <ul className="users-list">
                    <li></li>
                </ul>
            </div>
        );
    }
}

export default Users;