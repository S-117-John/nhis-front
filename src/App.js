import React from 'react';
import logo from './logo.svg';
import './App.css';
import './modules/mobile/config/config'
import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./modules/mobile/home/home";
import MedicalAdvice from "./modules/mobile/advice/medicalAdvice";
import MedicalAdviceSearch from "./modules/mobile/advice/medicalAdviceSearch";
import DrugIndex from "./modules/mobile/drug/drugIndex";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/home/:pkPv/:doctorCode" component={ Home } />
        <Route path="/medicalAdvice/:pkPv/:doctorCode" component={ MedicalAdvice } />
        <Route path="/medicalAdviceSearch/:pkPv/:doctorCode/:value" component={ MedicalAdviceSearch} />
        <Route path="/drugIndex/:pkPv/:doctorCode/:pkPd" component={ DrugIndex} />
      </Router>
    </div>
  );
}

export default App;
