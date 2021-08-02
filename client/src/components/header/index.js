import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className = "col" style = {{backgroundColor: 'grey'}}>
                <header>header</header>
            </div>
        );
    }
}
