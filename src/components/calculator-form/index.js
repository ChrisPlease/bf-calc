import React, { Component } from 'react';
import classNames from 'classnames';

import {
  calculateSum,
  calculateMaleBodyDensity,
  siriEquation,
  calculateLeanBodyMass,
  calculateWeightInFat
} from '../../utils/math-helpers';

import FormField from '../shared/form-field';
import MeasurementsFieldGroup from '../shared/measurements-field-group';
import Button from '../shared/button';

import './index.css';

class CalculatorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      age: '',
      measurements: {
        first: 0,
        second: 0,
        third: 0
      },
      bodyDensity: 0,
      bodyFat: 0,
      leanBodyMass: 0,
      weightInFat: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;

    switch(field) {
      case 'age':
        return this.setState({age: value});
      case 'weight':
        return this.setState({weight: value});
      default:
        return;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weight, age, measurements } = this.state;
    const { first } = measurements;
    const bodyDensity = calculateMaleBodyDensity(first, age);
    const bodyFat = siriEquation(bodyDensity);
    const bfPercent = bodyFat / 100;
    const lbm = calculateLeanBodyMass(weight, bfPercent);
    const weightInFat = calculateWeightInFat(weight, lbm);

    this.setState({bodyDensity, bodyFat, leanBodyMass: lbm, weightInFat});
  }

  render() {
    const { state, handleChange, handleSubmit } = this;
    const { weight, age } = state;

    return (
      <form className="calculator-panel">
        <FormField
            handleChange={handleChange}
            value={weight}
            fieldName="Weight"
            step="0.1" />
        <FormField
            handleChange={handleChange}
            value={age}
            fieldName="Age"
            step="1" />
        <div className="measurement-fields">
          <MeasurementsFieldGroup measurements={this.state.measurements} />
        </div>
        <div>
          <Button
              clickHandler={handleSubmit}>
            Submit
          </Button>
        </div>
        <div>
          {this.state.bodyDensity > 0 &&
            <div>
              Body Density: {this.state.bodyDensity} <br />
              Body Fat: {this.state.bodyFat} <br />
              Lean Body Mass: {this.state.leanBodyMass} <br />
              Weight in Fat: {this.state.weightInFat}
            </div>
          }
        </div>
      </form>
    );
  }
}

export default CalculatorForm;
