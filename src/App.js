import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./modules/mobile/home/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/home/:pkPv" component={ Home } />
      </Router>
    </div>
  );
}

export default App;
