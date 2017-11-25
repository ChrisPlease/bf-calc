import React from 'react';

import './index.css';

const Button = ({clickHandler, children}) => {
  return (
    <button onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
