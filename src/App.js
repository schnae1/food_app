import React from 'react';
import './styles/App.css';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import HomePage from './components/Home';

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
        <div className="App-container">
          {nav}

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
