import React from 'react';

import Input from '../input';
import MeasurementInput from '../measurement-input';

import './index.css';

const FormField = ({fieldName, step, value, measurement, handleChange, labelClass}) => {
  const fieldLabel = fieldName.toLowerCase();

  const renderInputs = () => {
    return measurement ?
      <MeasurementInput
          labelClass={labelClass}
          name={fieldName}
          type="number"
          step={step} /> :
      <Input
          handleChange={handleChange}
          value={value}
          fieldName={fieldLabel}
          type="number"
          step={step} />;
  };

  return (
    <div className="form-field">
      <label htmlFor={fieldLabel}>{fieldName}:</label>
      {renderInputs()}
    </div>
  );
}

export default FormField;
