import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CalculatorForm from './components/calculator-form/CalculatorForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalculatorForm />
      </div>
    );
  }
}

export default App;
