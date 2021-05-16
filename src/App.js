import React from 'react';
import Home from './pages/Home';
import './App.css'
import {
  HashRouter as Router,
  Route,
  Switch, 
  Link
} from 'react-router-dom'



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
