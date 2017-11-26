import React, { Component } from 'react';
import classNames from 'classnames';

import FormField from '../form-field';

import { calculateSum } from '../../../utils/math-helpers';

class MeasurementsFieldGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first: {
        chest: '',
        abdomen: '',
        thigh: ''
      },
      second: {
        chest: '',
        abdomen: '',
        thigh: ''
      },
      third: {
        chest: '',
        abdomen: '',
        thigh: ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.renderMeasurementFields = this.renderMeasurementFields.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const slicedName = name.split('-');
    const order = slicedName[0];
    const location = slicedName[1];

    const stateObject = {
      ...this.state,
        [order]: {
          ...this.state[order],
          [location]: value
        }
    };

    this.setState(stateObject);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props);

  //   return true;
  // }

  componentDidUpdate(prevProps, prevState) {
  }

  renderMeasurementFields() {
    const { props, state, handleChange } = this;
    const { measurements, calculateTotal } = props;
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
            calculateTotal={calculateTotal}
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
