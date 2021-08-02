import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    render() {
        return (
            <div >
                <Link to="/home" className="btn btn-link">Login</Link>
            </div>
        );
    }
}
