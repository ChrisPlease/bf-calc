import React from 'react';

import Input from '../input/Input';
import MeasurementInput from '../measurement-input/MeasurementInput';

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
  total,
  calculateTotal
}) => {
  const fieldLabel = fieldName.toLowerCase();

  const renderInputs = () => {
    return measurement ?
      /* Measurement Input */
      <div className="form-field measurement-field">
        {/*  */}
        <label className="visuallyHidden" htmlFor={fieldLabel}>{fieldName} Measurement</label>
        <MeasurementInput
            total={total}
            measureOrder={measureOrder}
            locations={locations}
            calculateTotal={calculateTotal}
            values={values}
            handleChange={handleChange}
            labelClass={labelClass}
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
