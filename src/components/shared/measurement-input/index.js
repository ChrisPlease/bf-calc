import React from 'react';
import './index.css';

import Input from '../input';

const MeasurementInput = ({
  step,
  type,
  labelClass,
  totalMeasurements,
  handleChange,
  measureOrder,
  locations,
  values,
  calculateTotal
}) => {

  return (
    <div className="measure-input">
      {locations.map((val, i) => {
        const displayName = (val.length > 0) ? val.charAt(0).toUpperCase() + val.slice(1) : '';
        const fieldValue = `${measureOrder}-${val}`;
        console.log(Object.values(values).reduce((acc, val) => acc + val));

        return (
          <div key={i}>
            <label className={labelClass} htmlFor={fieldValue}>{displayName} (in mm)</label>
            <Input
                onBlur={() => {
                  return (locations.length - 1 === i) ? calculateTotal(measureOrder, ...Object.values(values)) : null;
                }}
                handleChange={handleChange}
                value={values[val]}
                fieldName={fieldValue}
                type={type}
                step={step} />
          </div>
        );
      })}
    </div>
  );
};

export default MeasurementInput;
