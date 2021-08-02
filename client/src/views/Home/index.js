import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
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
                <Link to="/matching" className="btn btn-link">Matching</Link>
                <Link to="/oldmatching" className="btn btn-link">OldMatching</Link>
            </div>
        );
    }
}
