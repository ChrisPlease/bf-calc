import React, { Component } from 'react';

import {
  calculateMaleBodyDensity,
  siriEquation,
  calculateLeanBodyMass,
  calculateWeightInFat,
  calculateAverage,
  roundTwoDecimals
} from '../../utils/math-helpers';

import FormField from '../shared/form-field/FormField';
import MeasurementsFieldGroup from '../shared/measurements-field-group/MeasurementsFieldGroup';
import Button from '../shared/button/Button';

import { initialState } from '../../constants/states';

import './index.css';

class CalculatorForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };

    this.handleChange = this.handleChange.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
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

  handleTotal(order, total) {
    const { state } = this;
    const { measurements } = state;
    measurements[order] = total;

    const stateObject = {
      ...state,
      measurements: {
        ...measurements,
        [order]: total
      }
    };

    this.setState(stateObject);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weight, age, measurements } = this.state;
    const average = calculateAverage(...Object.values(measurements));
    const bodyDensity = calculateMaleBodyDensity(average, age);
    const bodyFat = siriEquation(bodyDensity);
    const bfPercent = bodyFat / 100;
    const lbm = calculateLeanBodyMass(weight, bfPercent);
    const weightInFat = calculateWeightInFat(weight, lbm);

    this.setState({bodyDensity, bodyFat, leanBodyMass: lbm, weightInFat});
  }

  render() {
    const { state, handleChange, handleSubmit, handleTotal } = this;
    const {
      age,
      weight,
      measurements,
      bodyDensity,
      bodyFat,
      leanBodyMass,
      weightInFat
    } = state;

    return (
      <form className="calculator-panel">
        <FormField
            handleChange={handleChange}
            value={age}
            fieldName="Age"
            step="1" />
        <FormField
            handleChange={handleChange}
            value={weight}
            fieldName="Weight"
            step="0.1" />
        <span>Measurements</span>
        <div className="measurement-fields">
          <MeasurementsFieldGroup handleTotal={handleTotal} measurements={measurements} />
        </div>
        <div>
          <Button
              clickHandler={handleSubmit}>
            Submit
          </Button>
        </div>
        <div>
          {bodyDensity > 0 &&
            <div>
              Body Density: {roundTwoDecimals(bodyDensity)} <br />
              Body Fat: {roundTwoDecimals(bodyFat)} <br />
              Lean Body Mass: {roundTwoDecimals(leanBodyMass)} <br />
              Weight in Fat: {roundTwoDecimals(weightInFat)}
            </div>
          }
        </div>
      </form>
    );
  }
}

export default CalculatorForm;
