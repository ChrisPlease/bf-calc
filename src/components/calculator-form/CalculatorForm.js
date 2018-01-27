import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectGender } from '../../actions/calculatorActions';

import {
  calculateMaleBodyDensity,
  siriEquation,
  calculateLeanBodyMass,
  calculateWeightInFat,
  calculateAverage,
  roundTwoDecimals
} from '../../utils/math-helpers';

import FormField from '../shared/form-field/FormField';
import MeasurementsFieldGroup from '../shared/measurements-field-group/MeasurementsFieldGroup';
import Button from '../shared/button/Button';

// import { initialState } from '../../constants/states';

import './index.css';

class CalculatorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      age: '',
      measurements: {
        first: 0,
        second: 0,
        third: 0
      },
      bodyDensity: 0,
      bodyFat: 0,
      leanBodyMass: 0,
      weightInFat: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const { selectGender } = this.props;

    if (field !== 'gender') {
      this.setState({[field]: value});
    } else {
      selectGender(value);
    }

  }

  handleTotal(order, total) {
    const { state } = this;
    const { measurements } = state;
    measurements[order] = total;

    const stateObject = {
      ...state,
      measurements: {
        ...measurements,
        [order]: total
      }
    };

    this.setState(stateObject);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weight, age, measurements } = this.state;
    const average = calculateAverage(...Object.values(measurements));
    const bodyDensity = calculateMaleBodyDensity(average, age);
    const bodyFat = siriEquation(bodyDensity);
    const bfPercent = bodyFat / 100;
    const lbm = calculateLeanBodyMass(weight, bfPercent);
    const weightInFat = calculateWeightInFat(weight, lbm);

    this.setState({bodyDensity, bodyFat, leanBodyMass: lbm, weightInFat});
  }

  render() {
    const { state, props, handleChange, handleSubmit, handleTotal } = this;
    const {
      age,
      weight,
      measurements,
      bodyDensity,
      bodyFat,
      leanBodyMass,
      weightInFat
    } = state;
    const { gender } = props;

    return (
      <form className="calculator-panel">
        <FormField
            handleChange={handleChange}
            value={age}
            fieldName="Age"
            step="1" />
        <FormField
            handleChange={handleChange}
            value={weight}
            fieldName="Weight"
            step="0.1" />
        <div className="gender-select">
          <ul>
            <li>
              <input
                id="male"
                name="gender"
                value="male"
                type="radio"
                onChange={handleChange}
                checked={gender === 'male'} />
              <label htmlFor="male">
                Male
              </label>
            </li>
            <li>
              <input
                id="female"
                name="gender"
                value="female"
                type="radio"
                onChange={handleChange}
                checked={gender === 'female'} />
              <label htmlFor="female">Female</label>
            </li>
          </ul>
        </div>
        <span>Measurements</span>
        <div className="measurement-fields">
          <MeasurementsFieldGroup gender={gender} handleTotal={handleTotal} measurements={measurements} />
        </div>
        <div>
          <Button
              clickHandler={handleSubmit}>
            Submit
          </Button>
        </div>
        <div>
          {bodyDensity > 0 &&
            <div>
              Body Density: {roundTwoDecimals(bodyDensity)} <br />
              Body Fat: {roundTwoDecimals(bodyFat)} <br />
              Lean Body Mass: {roundTwoDecimals(leanBodyMass)} <br />
              Weight in Fat: {roundTwoDecimals(weightInFat)}
            </div>
          }
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { gender } = state.calculator;

  return {
    gender,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectGender: bindActionCreators(selectGender, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorForm);
