import React from 'react';
import classNames from 'classnames';

const RoundedBox = ({ children }) => {
  return <div className={classNames('text-xl')}>{children}</div>;
};

export default RoundedBox;
