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
import Button from '../shared/button';

class CalculatorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      age: '',
      measurements: {
        first: 0
      },
      bodyDensity: 0,
      bodyFat: 0,
      leanBodyMass: 0,
      weightInFat: 0
    };

    this.totalMeasurements = this.totalMeasurements.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderMeasurementFields = this.renderMeasurementFields.bind(this);
  }

  totalMeasurements(chest, abdomen, thigh) {
    this.setState({...this.state, measurements: {first: calculateSum(chest, abdomen, thigh)}});
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

  renderMeasurementFields() {
    const { state, totalMeasurements } = this;
    const { measurements } = state;
    // const { first, second } = measurements;

    return Object.keys(measurements).map((measure, i) => {
      const displayName = measure.charAt(0).toUpperCase() + measure.slice(1);
      const labelClass = classNames({
        'visuallyHidden': i > 0
      });

      return (
        <FormField
            total={measurements[measure]}
            totalMeasurements={totalMeasurements}
            key={i}
            labelClass={labelClass}
            fieldName={displayName}
            step="1"
            measurement />
      );
    });
  }

  render() {
    const { state, handleChange, handleSubmit, renderMeasurementFields } = this;
    const { weight, age } = state;

    return (
      <form>
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
        {renderMeasurementFields()}
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
