import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../styles/SignUp.css';


class SignUpPage extends React.Component {
    render() {
        return (
            <div id="sign-container">
                <div id="sign-box">
                    <h1 class="signup">Sign Up</h1>
                    <form id="sign-form">
                        <input class="sign-in" type="email" name="emailaddress" placeholder="Email Address" /><br />
                        <input class="sign-in" type="password" name="userpassword" placeholder="Password" /><br />
                        <input class="sign-in" type="password" name="cnfmpassword" placeholder="Confirm Password" /><br />
                        <input class="sign-in" id="sign-btn" type="submit" name="Submit" value="SIGN UP" />
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpPage;