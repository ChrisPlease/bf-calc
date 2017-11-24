import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CalculatorForm from './components/calculator-form';
import Input from './components/shared/input';
import Button from './components/shared/button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CalculatorForm />
        <p className="App-intro">

          <br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
