import React, { Component } from 'react';
import './index.css';

import Input from '../input';

class MeasurementInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chest: 0,
      abdomen: 0,
      thigh: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'chest':
        return this.setState({chest: value});
      case 'abdomen':
        return this.setState({abdomen: value});
      case 'thigh':
        return this.setState({thigh: value});
      default:
        return;
    }
  }

  renderInputs () {
    const { state, props, handleChange } = this;
    const { chest, abdomen, thigh } = state;
    const { step, type, name, labelClass, calculateSum } = props;

    return Object.keys(state).map((val, i) => {
      const displayName = (val.length > 0) ? val.charAt(0).toUpperCase() + val.slice(1) : '';

      console.log(calculateSum);
      return (
        <div key={i}>
          <label className={labelClass} htmlFor={val}>{displayName}</label>
          <Input
              onBlur={() => {
                return (Object.keys(state).length - 1 === i) ? 5 : null;
              }}
              handleChange={handleChange}
              value={state[val]}
              fieldName={val}
              type={type}
              step={step} />
        </div>
      );
    });
  }

  render() {
    const { renderInputs } = this;

    return (
      <div className="measure-input">
        {renderInputs()}
        <div className="total">

        </div>
      </div>
    );
  }
}

export default MeasurementInput;
