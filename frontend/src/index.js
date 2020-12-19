import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import './index.css';
import RandomCat from './components/RandomCat';
import AboutPage from './components/About';
import More from './components/More';

ReactDOM.render((
    <BrowserRouter>
        <Route path = "/"         component = {App}/>
        <Route path = "/resonate" component = {RandomCat} />
        <Route path = "/about"    component = {AboutPage} />
        <Route path = "/more"     component = {More} />
    </BrowserRouter>
), document.getElementById('root'))

