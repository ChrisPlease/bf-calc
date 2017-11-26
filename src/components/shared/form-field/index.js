import React from 'react';

import Input from '../input';
import MeasurementInput from '../measurement-input';

import './index.css';

const FormField = ({
  fieldName,
  step,
  value,
  measurement,
  handleChange,
  labelClass,
  measureOrder,
  locations,
  values,
  calculateTotal
}) => {
  const fieldLabel = fieldName.toLowerCase();

  const renderInputs = () => {
    return measurement ?
      /* Measurement Input */
      <div className="form-field measurement-field">
        <label className="visuallyHidden" htmlFor={fieldLabel}>{fieldName} Measurement</label>
        <MeasurementInput
            measureOrder={measureOrder}
            locations={locations}
            calculateTotal={calculateTotal}
            values={values}
            handleChange={handleChange}
            labelClass={labelClass}
            name={fieldName}
            type="number"
            step={step} />
      </div> :
      /* Default input */
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
