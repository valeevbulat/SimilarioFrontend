import React from 'react';
import { Link } from 'react-router';

const NotFound = React.createClass({
    render: function() {
        return (
            <div className="app">
                <header className="primary-header">
                    <h1>Page not found :( <br/>
                        <Link to="/" activeClassName="active">You can go to home page</Link>
                    </h1>
                </header>
            </div>
        );
    }
});

export default NotFound;
