import React from 'react';
import classNames from 'classnames';

const Title = ({ children }) => {
  return <h2 className={classNames('text-2xl', 'font-bold')}>{children}</h2>;
};

export default Title;
