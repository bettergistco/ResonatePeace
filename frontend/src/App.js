import React from 'react';
import { Container } from 'reactstrap';

import Auth from './modules/Auth';

import './App.css';

function AuthAction()
{
    if (Auth.isUserAuthenticated()) {
        return <a href="/logout">Log out</a>;
    }

    return <span>
        <a href="/login">Log in</a> | <a href="/register">Register</a>
    </span>;
}

class App extends React.Component {
    // Initialize state
    state = { passwords: [] }

    // Determine if user is logged in or not.
    componentDidMount() {
        this.setState({
            isLoggedIn: Auth.isUserAuthenticated(),
        });
    }

    render() {

        return (
        <Container>
            <section className="App">
                <div>
                    <div class="logo"><img src="/logo.png" title="MindStream Journal" alt="MindStream Journal" /></div>
                    <nav class="controls">
                        <a href="/resonate">Start</a> | <a href="/about">About</a> | <a href="/more">More</a>
                    </nav>
                </div>
            </section>
        </Container>
        );
    }
}

export default App;
