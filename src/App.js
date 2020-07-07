import React from 'react';
import logo from './logo.svg';
import './App.css';
import './modules/mobile/config/config'
import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./modules/mobile/home/home";
import MedicalAdvice from "./modules/mobile/advice/medicalAdvice";
import MedicalAdviceSearch from "./modules/mobile/advice/medicalAdviceSearch";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/home/:pkPv" component={ Home } />
        <Route path="/medicalAdvice/:pkPv" component={ MedicalAdvice } />
          <Route path="/medicalAdviceSearch/:pkPv" component={ MedicalAdviceSearch} />
      </Router>
    </div>
  );
}

export default App;
