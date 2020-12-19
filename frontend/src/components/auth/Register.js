import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

import Auth from '../../modules/Auth';
import ValidationError from "../ValidationError";

// Taken from https://closebrace.com/tutorials/2017-10-12/five-minute-react-60-reset-password-part-1
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        // bound functions
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);

        // component state
        this.state = {
            email: 'hopeseekr@gmail.com',
            password: '123456!'
        };
    }

    // catch enter clicks
    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.handleValidSubmit();
        }
    }

    // update state as email value changes
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    // Handle submission once all form data is valid
    handleValidSubmit() {
        const { login } = this.props;
        const formData = this.state;
        this.register(formData.email, formData.password, formData.confirmPassword);
    }

    register(email, password, confirmPassword) {
        if (password !== confirmPassword) {
            this.setState({errors: {
                    message: 'Error',
                    details: 'Your passwords do not match.'
                }
            });

            return;
        }

        fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                password_confirmation: confirmPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (!data.success) {
                    throw data;
                }

                window.location.href = '/login';
            })
            .catch(error => {
                console.log(error)
                // @FIXME: I couldn't for the life of me figure out how to properly display Validation.js error objects in React.
                this.setState({errors: {
                        message: error.message,
                        details: JSON.stringify(error.errors)
                    }
                });
            });
    }

    render() {
        return (
        <section id="page">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-7 col-md-6 col-lg-6">
                    <p>
                        Please enter your information to register.
                    </p>
                    <AvForm onValidSubmit={this.handleValidSubmit}>
                        <AvGroup>
                            <Label for="userEmail">Email</Label>
                            <AvInput
                                id="userEmail"
                                name="email"
                                onChange={this.handleEmailChange}
                                placeholder="you@example.com"
                                required
                                type="email"
                                value={this.state.email}
                            />
                            <AvFeedback>A valid email is required to log in.</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                            <Label for="password">Password</Label>
                            <AvInput
                                id="password"
                                name="password"
                                onChange={this.handlePasswordChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="Password"
                                required
                                type="password"
                            />
                            <AvFeedback>A valid email is required to log in.</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <AvInput
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={this.handleConfirmPasswordChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="Password"
                                required
                                type="password"
                            />
                            <AvFeedback>A valid email is required to log in.</AvFeedback>
                        </AvGroup>
                        <Button color="primary">Register</Button>
                        { this.state.errors &&
                        <div className="alert alert-danger" role="alert">
                            <h4>{this.state.errors.message}</h4>
                            <ul>
                                {this.state.errors.details}
                            </ul>
                        </div>
                        }
                    </AvForm>
                </div>
            </div>
        </section>
        );
    }
}

export default RegisterPage;
