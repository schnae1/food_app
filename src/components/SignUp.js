import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../styles/SignUp.css';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    error: null,
  };

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = event => {
        
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            password,
            passwordConf,
            error,
          } = this.state;

        
        const isInvalid =
            password !== passwordConf ||
            password === '' ||
            email === '' ||
            username === '';

        return (
            <div id="sign-container">
                <div id="sign-box">
                    <h1 className="signup">Sign Up</h1>
                    <form onSubmit={this.onSubmit} id="sign-form">
                        <input 
                            className="sign-in" 
                            type="text"
                            value={username} 
                            name="username" 
                            placeholder="Full Name" 
                            onChange={this.onChange}
                        /><br />
                        <input 
                            className="sign-in" 
                            type="email" 
                            name="email" 
                            value={email}
                            placeholder="Email Address" 
                            onChange={this.onChange}
                        /><br />
                        <input 
                            className="sign-in" 
                            type="password" 
                            name="password" 
                            value={password}
                            placeholder="Password" 
                            onChange={this.onChange}
                        /><br />
                        <input 
                            className="sign-in" 
                            type="password" 
                            name="passwordConf" 
                            value={passwordConf}
                            placeholder="Confirm Password" 
                            onChange={this.onChange}    
                        /><br />
                        <input disabled={isInvalid} className="sign-in" id="sign-btn" type="submit" name="Submit" value="SIGN UP" />
                        {error && <p>{error.message}</p>}
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpPage;