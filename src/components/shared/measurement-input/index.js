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

    this.renderInputs = this.renderInputs.bind(this);
  }

  renderInputs () {
    const { state, props } = this;
    const { step, type, name, labelClass } = props;
    return Object.keys(state).map((val, i) => {
      const displayName = (val.length > 0) ? val.charAt(0).toUpperCase() + val.slice(1) : '';
      return (
        <div key={i}>
          <label className={labelClass} htmlFor={`${name}-${val}`}>{displayName}</label>
          <Input fieldName={`${name}-${val}`} type={type} step={step} />
        </div>
      );
    })
  }

  render() {
    const { renderInputs } = this;
    return (
      <div className="measure-input">
        {renderInputs()}
      </div>
    );
  }
}

export default MeasurementInput;
