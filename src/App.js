import React from 'react';
import './styles/App.css';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LandingPage from './components/Landing';
import HomePage from './components/Home';

import * as ROUTES from './constants/routes';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App-container">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
