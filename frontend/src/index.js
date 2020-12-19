import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import './index.css';
import RandomCat from './components/RandomCat';
import AboutPage from './components/About';
import More from './components/More';

ReactDOM.render((
    <BrowserRouter basename={'/resonance-peace'}>
        <Route path={`${process.env.PUBLIC_URL}/`}         component = {App}/>
        <Route path={`${process.env.PUBLIC_URL}/resonate`} component = {RandomCat} />
        <Route path={`${process.env.PUBLIC_URL}/about`}    component = {AboutPage} />
        <Route path={`${process.env.PUBLIC_URL}/more`}     component = {More} />
    </BrowserRouter>
), document.getElementById('root'))

