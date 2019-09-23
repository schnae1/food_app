import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../styles/Login.css';

class LogInPage extends React.Component {
    render() {
        return (
            <div id="log-container">
                <div id="login-box">
                    <h1 class="login">Log In</h1>
                    <form id="log-form">
                        <input class="log-in" type="email" name="emailaddress" placeholder="Email Address" /><br />
                        <input class="log-in" type="password" name="userpassword" placeholder="Password" /><br />
                        <input class="log-in" id="log-btn" type="submit" name="Submit" value="LOG IN" />
                    </form>
                    <Link to={ROUTES.PASSWORD_FORGOT}>Forgot Password?</Link>
                </div>
                <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
            </div>
        );
    }
}

export default LogInPage;