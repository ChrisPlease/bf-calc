import React, { Component } from 'react';
import classNames from 'classnames';

import FormField from '../form-field/FormField';

import { calculateSum, findNonZeros } from '../../../utils/math-helpers';

const maleSites = {
  chest: '',
  abdomen: '',
  thigh: ''
};

class MeasurementsFieldGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.renderMeasurementFields = this.renderMeasurementFields.bind(this);
  }

  componentWillMount() {
    const { state, props } = this;
    const { measurements } = props;

    const measureState = Object.keys(measurements).reduce((acc, measure) => {
      acc[measure] = sites;
      return acc;
    }, {});

    const newState = {
      ...state,
      ...measureState
    };

    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    const { state, props } = this;
    const { measurements, handleTotal } = props;
    const ordersWithValue = Object.keys(state).filter(val => {
      return findNonZeros(Object.values(state[val]));
    });

    if (ordersWithValue.length) {
      ordersWithValue.map(order => {
        const stateSum = calculateSum(...Object.values(state[order]));

        if (stateSum !== measurements[order]) {
          return handleTotal(order, stateSum)
        }
      });
    }
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

  calculateTotal(order, a,b,c) {
    const { handleTotal } = this.props;
    handleTotal(order, calculateSum(a,b,c));
  }

  renderMeasurementFields() {
    const { props, state, calculateTotal, handleChange } = this;
    const { measurements } = props;
    const locations = Object.keys(state.first);

    return Object.keys(measurements).map((measure, i) => {
      const displayName = measure.charAt(0).toUpperCase() + measure.slice(1);
      const labelClass = classNames({
        'visuallyHidden': i > 0
      });

      return (
        <FormField
            total={measurements[measure]}
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

    return (
      <div>
        {this.state.first && renderMeasurementFields()}
      </div>
    );
  }
}

export default MeasurementsFieldGroup;
