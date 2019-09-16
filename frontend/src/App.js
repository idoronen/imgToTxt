import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import ImgToTxtPage from './pages/ImgToTxtPage'

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">      

      <Router>
        <nav className="App-header">
          <NavLink to="/imgToTxt"> imgToTxt </NavLink>
        </nav>

        <Switch>
          <Route path="/imgToTxt" component={ImgToTxtPage}></Route>

        </Switch>

      </Router>

    </div>
  );
}

export default App;
