import React, { Component } from 'react';

class Simon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.roomId
        };
    }

    componentDidMount() {
        console.log('the component mounted');
    }

    componentWillReceiveProps() {

    }

    render() {
        return(
            <div></div>
        );
    }
}

export default Simon;