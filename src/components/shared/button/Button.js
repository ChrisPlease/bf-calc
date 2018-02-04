import React from 'react';

import './index.css';

const Button = ({clickHandler, children, styleName}) => {
  return (
    <button className={styleName} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
