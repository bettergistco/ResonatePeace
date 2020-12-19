import React from 'react';

import Auth from '../../modules/Auth';

// Taken from https://closebrace.com/tutorials/2017-10-12/five-minute-react-60-reset-password-part-1
class LogoutPage extends React.Component {
    constructor(props)
    {
        super(props);

        Auth.deauthenticateUser();

        window.location.href = '/';
    }
}

export default LogoutPage;
