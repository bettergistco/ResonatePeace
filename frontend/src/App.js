import React from 'react';
import { Container } from 'reactstrap';

import './App.css';

class App extends React.Component {
    render() {

        return (
        <Container>
            <section className="App">
                <div>
                    <div class="logo"><img src={`${process.env.PUBLIC_URL}/logo.png`} title="MindStream Journal" alt="MindStream Journal" /></div>
                    <nav class="controls">
                        <a href={`${process.env.PUBLIC_URL}/resonate`}>Start</a> | <a href={`${process.env.PUBLIC_URL}/about`}>About</a> | <a href={`${process.env.PUBLIC_URL}/more`}>More</a>
                    </nav>
                </div>
            </section>
        </Container>
        );
    }
}

export default App;
