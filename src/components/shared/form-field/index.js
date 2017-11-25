import React from 'react';

import Input from '../input';
import MeasurementInput from '../measurement-input';

import './index.css';

const FormField = ({fieldName, step, value, measurement, handleChange, labelClass, calculateSum}) => {
  const fieldLabel = fieldName.toLowerCase();

  const renderInputs = () => {
    return measurement ?
      <div className="form-field measurement-field">
        <label className="visuallyHidden" htmlFor={fieldLabel}>{fieldName} Measurement</label>
        <MeasurementInput
            calculateSum={calculateSum}
            labelClass={labelClass}
            name={fieldName}
            type="number"
            step={step} />
      </div> :
      <div className="form-field">
        <label htmlFor={fieldLabel}>{fieldName}</label>
        <Input
            handleChange={handleChange}
            value={value}
            fieldName={fieldLabel}
            type="number"
            step={step} />
      </div>
  };

  return renderInputs();
}

export default FormField;
