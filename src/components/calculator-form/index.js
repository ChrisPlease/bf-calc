import React, { Component } from 'react';
import classNames from 'classnames';

import FormField from '../shared/form-field';
import Input from '../shared/input';
import Button from '../shared/button';

class CalculatorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      age: '',
      measurements: {
        first: {},
        second: {},
        third: {}
      },
      bodyFat: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderMeasurementFields = this.renderMeasurementFields.bind(this);
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
    const { age, weight } = this.state;
    const bodyFat = weight * age;

    this.setState({bodyFat});
  }

  renderMeasurementFields() {
    const { state } = this;
    const { measurements } = state;

    return Object.keys(measurements).map((measure, i) => {
      const displayName = measure.charAt(0).toUpperCase() + measure.slice(1);
      const labelClass = classNames({
        'visuallyHidden': i > 0
      });
      return (
        <FormField
            labelClass={labelClass}
            key={i}
            fieldName={displayName}
            step="1"
            measurement />
      );
    });
  }

  render() {
    const { state, handleChange, handleSubmit, renderMeasurementFields } = this;
    const { weight, age, measurements } = state;
    const { chest, abdomin, thigh } = measurements;

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
          {this.state.bodyFat > 0 && this.state.bodyFat}
        </div>
      </form>
    );
  }
}

export default CalculatorForm;
