import React from 'react';
import { login } from '../helpers/signin'

const Authorization = React.createClass({

    handleLoginClick: function(){
        login()
    },

    render: function() {
        return (
            <div>
                <h1>Login</h1>
                <div onClick={this.handleLoginClick}>FF</div>
            </div>
        );
    }
});

export default Authorization;