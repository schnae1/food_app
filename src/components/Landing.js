import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import '../styles/Landing.css';

class LandingPage extends React.Component {
    render() {
        return(
            <div id="container">
                <div id="content-box">
                    <div id="content">
                    <h1>Foodies</h1>
                    <h2>A Place to Find New Dinning Experiences</h2>
                    
                    <Link to={ROUTES.LOG_IN}><button id="btn">Start Today</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;