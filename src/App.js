import React from 'react';
import './styles/App.css';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import LogInPage from './components/LogIn';
import PasswordForgotPage from './components/PasswordForgot';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';

import * as ROUTES from './constants/routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  
  render() {
    let nav;

    if(this.state.isLoggedIn){ nav = <Navigation />;}
    else { nav = null; }

    return (
      <Router>
        <div class="App-container">
          {nav}

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.LOG_IN} component={LogInPage} />
          <Route path={ROUTES.PASSWORD_FORGOT} component={PasswordForgotPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    );
  }
}

export default App;
