import React from 'react';
import './index.css';

import Input from '../input/Input';

const MeasurementInput = ({
  step,
  type,
  labelClass,
  totalMeasurements,
  handleChange,
  measureOrder,
  locations,
  values,
  total,
  calculateTotal
}) => {



  // if (findNonZeros) {
  //   console.log()
  //   console.log('calculate now!');
  // }
  // if (findNonZeros) calculateTotal(measureOrder, ...Object.values(values));
  // console.log(...Object.values(values));
  // console.log(calculateTotal(...Object.values(values)));

  return (
    <div className="measure-input">
      {locations.map((val, i) => {
        const displayName = (val.length > 0) ? val.charAt(0).toUpperCase() + val.slice(1) : '';
        const fieldValue = `${measureOrder}-${val}`;
        return (
          <div key={i}>
            <label className={labelClass} htmlFor={fieldValue}>{displayName} (in mm)</label>
            <Input
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
