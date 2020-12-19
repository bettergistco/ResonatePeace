import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import './index.css';
import ForgotPasswordPage from './components/auth/ForgotPassword';
import LoginPage from './components/auth/Login';
import LogoutPage from "./components/auth/Logout";
import RegisterPage from "./components/auth/Register";

ReactDOM.render((
    <BrowserRouter>
        <Route path = "/" component = {App}/>
        <Route path = "/forgot-password" component = {ForgotPasswordPage} />
        <Route path = "/login" component = {LoginPage} />
        <Route path = "/logout" component = {LogoutPage} />
        <Route path = "/register" component = {RegisterPage} />
        {/*<Route path = "home" component = {Home} />*/}
        {/*<Route path = "about" component = {About} />*/}
        {/*<Route path = "contact" component = {Contact} />*/}
    </BrowserRouter>
), document.getElementById('root'))

