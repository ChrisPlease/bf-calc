import React, { Component } from 'react';
import classNames from 'classnames';

import FormField from '../form-field';

import { calculateSum } from '../../../utils/math-helpers';

class MeasurementsFieldGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first: {
        chest: 0,
        abdomen: 0,
        thigh: 0
      },
      second: {
        chest: 0,
        abdomen: 0,
        thigh: 0
      },
      third: {
        chest: 0,
        abdomen: 0,
        thigh: 0
      }
    }

    this.totalMeasurements = this.totalMeasurements.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderMeasurementFields = this.renderMeasurementFields.bind(this);
  }

  totalMeasurements(chest, abdomen, thigh) {
    console.log(this.state);
    // this.setState({...this.state, measurements: {first: calculateSum(chest, abdomen, thigh)}});
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const slicedName = name.split('-');
    const field = this.state[slicedName[0]];

    field[slicedName[1]] = value;

    this.forceUpdate();
  }

  renderMeasurementFields() {
    const { props, state, totalMeasurements, handleChange } = this;
    const { measurements } = props;
    const locations = Object.keys(state.first);

    return Object.keys(measurements).map((measure, i) => {
      const displayName = measure.charAt(0).toUpperCase() + measure.slice(1);
      const labelClass = classNames({
        'visuallyHidden': i > 0
      });

      return (
        <FormField
            measureOrder={measure}
            locations={locations}
            values={state[measure]}
            handleChange={handleChange}
            total={measurements[measure]['total']}
            totalMeasurements={totalMeasurements}
            key={i}
            labelClass={labelClass}
            fieldName={displayName}
            step="1"
            measurement />
      );
    });
  }

  render() {
    const { renderMeasurementFields } = this;
    return <div>{renderMeasurementFields()}</div>;
  }
}

export default MeasurementsFieldGroup;
