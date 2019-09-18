import React from 'react';
// import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import ImgToTxtPage from './ImgToTxtPage'

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">    
      {/* <img src={require('./images/cam.jpg')} className="camera-btn"/> */}

      <ImgToTxtPage></ImgToTxtPage>  


      {/* <Router>
        <nav className="App-header">
          <NavLink to="/imgToTxt"> imgToTxt </NavLink>
          <NavLink exact to="/">Home</NavLink>
        </nav>

        <Switch>
          <Route path="/" component={}></Route>
          <Route path="/imgToTxt" component={ImgToTxtPage}></Route>

        </Switch>

      </Router> */}

    </div>
  );
}

export default App;
