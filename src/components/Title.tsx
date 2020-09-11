import React from 'react';
import classNames from 'classnames';

const Title: React.FC = ({ children }) => {
  return <h2 className={classNames('text-3xl', 'font-bold')}>{children}</h2>;
};

export default Title;
