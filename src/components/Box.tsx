import React from 'react';
import classNames from 'classnames';

const Box: React.FC = ({ children }) => {
  return <div className={classNames('lg:w-1/3', 'text-xl')}>{children}</div>;
};

export default Box;