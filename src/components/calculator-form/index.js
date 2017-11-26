import React, { Component } from 'react';

import {
  calculateSum,
  calculateMaleBodyDensity,
  siriEquation,
  calculateLeanBodyMass,
  calculateWeightInFat,
  calculateAverage
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
      measurementAverage: 0,
      bodyDensity: 0,
      bodyFat: 0,
      leanBodyMass: 0,
      weightInFat: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.averageMeasurements = this.averageMeasurements.bind(this);
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

  calculateTotal(measureOrder, a, b, c) {
    const { measurements } = this.state;
    const sum = calculateSum(a, b, c);
    measurements[measureOrder] = sum;

    this.setState({ measurements });
  }

  averageMeasurements() {
    const av = calculateAverage(...Object.values(this.state.measurements));
    return this.setState({measurementAverage: av});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weight, age, averageMeasurements } = this.state;
    const bodyDensity = calculateMaleBodyDensity(averageMeasurements, age);
    const bodyFat = siriEquation(bodyDensity);
    const bfPercent = bodyFat / 100;
    const lbm = calculateLeanBodyMass(weight, bfPercent);
    const weightInFat = calculateWeightInFat(weight, lbm);

    this.setState({bodyDensity, bodyFat, leanBodyMass: lbm, weightInFat});
  }

  render() {
    const { state, handleChange, handleSubmit, calculateTotal } = this;
    const { weight, age, measurements } = state;

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
          <MeasurementsFieldGroup calculateTotal={calculateTotal} measurements={measurements} />
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
