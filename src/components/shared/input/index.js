import React, { Component } from 'react';
import './index.css';

class Input extends Component {

  render() {
    const { props } = this;
    const { type, handleChange, value, step, fieldName } = props;

    return <input name={fieldName} type={type} step={step} value={value} onChange={handleChange} />;
  }
};

export default Input;
