import React from 'react';

import './index.css';

const Button = ({clickHandler, children, style}) => {
  return (
    <button className={style} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
