import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import '../styles/Landing.css';

class LandingPage extends React.Component {
    render() {
        return(
            <div id="lan-container">
                <div id="lan-content-box">
                    <hr />
                    <h1 id="site-title">Foodies</h1>
                    <h2>Find new dinning experiences.</h2>
                    <Link to={ROUTES.HOME}><button id="lan-btn">Start Today</button></Link>
                    <hr />
                </div>
            </div>
        );
    }
}

export default LandingPage;