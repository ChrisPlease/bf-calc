import React, { Component } from 'react';
import './index.css';

import Input from '../input';

class MeasurementInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chest: '',
      abdomen: '',
      thigh: ''
    };
    this.renderInputs = this.renderInputs.bind(this);
  }

  renderInputs () {
    const { state, props } = this;
    const { step, type, labelClass, totalMeasurements, handleChange, measureOrder, locations, values } = props;

    return locations.map((val, i) => {
      const displayName = (val.length > 0) ? val.charAt(0).toUpperCase() + val.slice(1) : '';
      const fieldValue = `${measureOrder}-${val}`;
      return (
        <div key={i}>
          <label className={labelClass} htmlFor={fieldValue}>{displayName} (in mm)</label>
          <Input
              onBlur={() => {
                return (Object.keys(state).length - 1 === i) ? 5 : null;
              }}
              handleChange={handleChange}
              value={values[val]}
              fieldName={fieldValue}
              type={type}
              step={step} />
        </div>
      );
    });
  }

  render() {
    const { renderInputs, props } = this;
    const { total } = props;

    return (
      <div className="measure-input">
        {renderInputs()}
      </div>
    );
  }
}

export default MeasurementInput;
